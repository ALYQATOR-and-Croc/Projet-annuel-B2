import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

import '../styles/ColorCalendar.css';

const events = [
  {
    id: 1,
    title: 'Mathématique',
    classe:'B2 ESGI',
    salle: 'SALLE 515',
    start: '2023-07-05T09:45:00',
    end: '2023-07-05T11:15:00',
  },
  {
    id: 2,
    title: 'Mathématique',
    classe:'B2 ESGI',
    salle: 'SALLE 515',
    start: '2023-07-05T11:30:00',
    end: '2023-07-05T13:00:00',
  },
  {
    id: 3,
    title: 'Python',
    classe:'M1 ESGI',
    salle: 'SALLE 205',
    start: '2023-07-05T14:00:00',
    end: '2023-07-05T15:30:00',
  },
  {
    id: 4,
    title: 'Algorithmie',
    classe:'M1 ESGI',
    salle: 'SALLE 145',
    start: '2023-07-05T15:45:00',
    end: '2023-07-05T17:15:00',
  },
];

function CalendarDay({selectedDate}) {
  const calendarRef = React.createRef();

  const handleDateClick = (info) => {
    console.log('Date clicked: ', info.dateStr);
    console.log(selectedDate);
  };

  const calendarOptions = {
    headerToolbar: {
      left:   'title',
      center: '',
      right:  ''
    },
    plugins: [timeGridPlugin, interactionPlugin],
    initialView: 'timeGridDay',
    slotDuration: '00:30:00',
    slotMinTime: '08:00:00',
    slotMaxTime: '19:00:00',
    height: 'auto',
    locales: [frLocale],
    locale: 'fr',
    events: events,
    eventColor: '#239489',
    nowIndicator: true,
    allDaySlot: false,
    dateClick: handleDateClick,
    eventClick: (info) => console.log(info.event.id),
    eventContent: function (arg) {
      return (
        <div>
          <b style={{fontSize: 'xx-small'}}>{arg.timeText}</b>
          <br></br>
          <b style={{fontSize: 'x-small'}}>{arg.event.title}</b>
          <br></br>
          <b style={{fontSize: 'x-small'}}>{arg.event.extendedProps.classe}</b>
          <br></br>
          <b style={{fontSize: 'x-small'}}>{arg.event.extendedProps.salle}</b> 
        </div>
      );
    },
  };

  return (
    <div className="calendarJour">
      <FullCalendar ref={calendarRef} {...calendarOptions} />
    </div>
  );
}

export default CalendarDay;


