import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin from '@fullcalendar/interaction';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Alert, Tooltip, Snackbar, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';

import '../../../full-calendar.css';
import Schedule from '../../../utils/schedule';
import AddScheduleDialog from '../add-schedule-dialog';
import EditScheduleDialog from '../edit-schedule-dialog';

export default function SchedulePage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addDate, setAddDate] = useState(new Date());

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editDate, setEditDate] = useState(new Date());
  const [editScheduleType, setEditScheduleType] = useState('');

  const [isConnectionError, setIsConnectionError] = useState(false);

  const [events, setEvents] = useState([]);

  const [cookies] = useCookies();

  const handleEventClick = (e) => {
    setEditDate(e.event.start);
    setEditScheduleType(e.event.extendedProps.type);
    setIsEditOpen(true);
  };

  const handleDateClick = (e) => {
    const fullYear = e.date.getFullYear();
    const month = e.date.getMonth();
    const date = e.date.getDate();

    let isExists = false;
    events.forEach((i) => {
      if (
        i.start.getFullYear() === fullYear &&
        i.start.getMonth() === month &&
        i.start.getDate() === date
      ) {
        setEditDate(e.date);
        setEditScheduleType(i.extendedProps.type);
        setIsEditOpen(true);
        isExists = true;
      }
    });
    if (!isExists) {
      setAddDate(e.date);
      setIsAddOpen(true);
    }
  };

  const updateSchedules = () => {
    Schedule.all(cookies)
      .then((e) => {
        setEvents(e.map(c => ({
          start: c.date,
          title: c.type.jp,
          color: c.type.color,
          textColor: c.type.textColor,
          allDay: true,
          extendedProps: {
            type: c.type,
          },
        })));
      })
      .catch(() => setIsConnectionError(true));
  };

  useEffect(() => {
    updateSchedules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3">予定</Typography>
        {/*
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          追加
  </Button> */}
        <Tooltip title="ヒント: 日にちをクリックして、予定を追加します。">
          <IconButton>
            <Iconify icon="eva:bulb-outline" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Card>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locales={[jaLocale]}
          locale="ja"
          headerToolbar={{
            left: 'prev,title,next',
            center: '',
            right: 'today',
          }}
          height="calc(100vh - 200px)"
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          events={events}
          dayCellContent={(arg) => arg.date.getDate()}
        />
      </Card>
      <AddScheduleDialog
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        setEvents={setEvents}
        date={addDate}
      />
      <EditScheduleDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        scheduleType={editScheduleType}
        updateSchedules={updateSchedules}
        date={editDate}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isConnectionError}
        autoHideDuration={5000}
        onClose={() => setIsConnectionError(false)}
      >
        <Alert
          severity="error"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={() => setIsConnectionError(false)}
        >
          予定の取得に失敗しました。
        </Alert>
      </Snackbar>
    </Container>
  );
}
