import axios from 'axios';
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
import { Tooltip, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';

import '../../../full-calendar.css';
import EventAddDialog from '../add-event-dialog';
import EventEditDialog from '../edit-event-dialog';

export default function SchedulePage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addDate, setAddDate] = useState(new Date());

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editDate, setEditDate] = useState(new Date());
  const [editScheduleType, setEditScheduleType] = useState('');

  const [events, setEvents] = useState([]);

  const [cookies] = useCookies();

  const handleEventClick = (e) => {
    console.log(e);
    setEditDate(e.event.start);
    setEditScheduleType(e.event.extendedProps.scheduleType);
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
        setEditScheduleType(i.extendedProps.scheduleType);
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
    const { session, userId } = cookies;

    axios
      .get('http://localhost:8000/api/v1/schedule/', {
        params: {
          userId: userId.replace('_', ''),
          token: session,
        },
      })
      .then((response) => {
        const newEvents = [];
        response.data.schedules.forEach((child) => {
          const item = {
            start: new Date(child.date),
            allDay: true,
            extendedProps: {
              scheduleType: child.scheduleType,
            },
          };
          switch (child.scheduleType) {
            case 'WEEKDAY':
              item.title = '平日練習';
              item.color = '#C2EEF6';
              item.textColor = '#005868';
              break;
            case 'MORNING':
              item.title = '午前練習';
              item.color = '#C2EADD';
              item.textColor = '#005035';
              break;
            case 'AFTERNOON':
              item.title = '午後練習';
              item.color = '#FFEBC2';
              item.textColor = '#7A5200';
              break;
            case 'ALLDAY':
              item.title = '一日練習';
              item.color = '#FFD7CE';
              item.textColor = '#7A2917';
              break;
            default:
              item.title = child.scheduleType;
              item.color = '#C2CFDB';
              item.textColor = '#001A32';
              break;
          }

          newEvents.push(item);
        });
        setEvents(newEvents);
      });
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
            left: 'dayGridMonth',
            center: 'prev,title,next',
            right: 'today',
          }}
          height="79vh"
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          events={events}
          dayCellContent={(arg) => arg.date.getDate()}
        />
      </Card>
      <EventAddDialog
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        setEvents={setEvents}
        date={addDate}
      />
      <EventEditDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        scheduleType={editScheduleType}
        updateSchedules={updateSchedules}
        date={editDate}
      />
    </Container>
  );
}
