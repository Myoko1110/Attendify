import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin from '@fullcalendar/interaction';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import '../../../full-calendar.css';
import EventAddDialog from '../add-event-dialog';
import Iconify from '../../../components/iconify';

export default function SchedulePage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      title: 'event 1',
      date: '2024-04-01',
      backgroundColor: '#000000',
      borderColor: '#000000',
    },
    { title: 'event 2', date: '2024-04-02' },
  ]);
  const [addDate, setAddDate] = useState(new Date());

  const handleEventClick = (e) => {
    console.log(e);
  };

  const handleDateClick = (e) => {
    console.log(e);
    setAddDate(e.date);
    setIsAddOpen(true);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3">予定</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          追加
        </Button>
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
          editable
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          events={events}
        />
      </Card>
      <EventAddDialog isOpen={isAddOpen} setIsOpen={setIsAddOpen} events={events} date={addDate} />
    </Container>
  );
}
