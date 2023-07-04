import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

import '../styles/ColorCalendar.css';

const events = [
  {
    id: 1,
    title: 'Mathématique',
    prof:'Mr DUMONT',
    classe:'B2 ESGI',
    salle: 'SALLE 515',
    start: '2023-07-03T09:45:00',
    end: '2023-07-03T11:15:00',
  },
  {
    id: 2,
    title: 'Mathématique',
    prof:'Mr DUMONT',
    classe:'B2 ESGI',
    salle: 'SALLE 515',
    start: '2023-07-03T11:30:00',
    end: '2023-07-03T13:00:00',
  },
  {
    id: 3,
    title: 'Mathématique',
    prof:'Mr DUMONT',
    classe:'B1 ESGI',
    salle: 'SALLE 515',
    start: '2023-07-04T14:00:00',
    end: '2023-07-04T15:30:00',
  },
  {
    id: 4,
    title: 'Mathématique',
    prof:'Mr DUMONT',
    classe:'B1 ESGI',
    salle: 'SALLE 515',
    start: '2023-07-03T15:45:00',
    end: '2023-07-03T17:15:00',
  },
];

function CalendarWeek({selectedDate}) {
  const calendarRef = React.createRef(null);

  const handleDateClick = (info) => {
    console.log('Date clicked: ', info.dateStr);
    if (calendarRef.current) {
        calendarRef.current.getApi().changeView('timeGridWeek', {
          validRange: {
            start: selectedDate
          },
        })
      };
  };
  // if (calendarRef.current) {
  //   calendarRef.current.getApi().gotoDate(selectedDate);
  // }
  // if (calendarRef.current) {
  //   calendarRef.current.getApi().changeView('timeGridWeek', {
  //     date: selectedDate,
  //   })
  // };

  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    slotDuration: '00:30:00',
    slotMinTime: '08:00:00',
    slotMaxTime: '19:00:00',
    // validRange: {
    //   start: '2023-07-10'
    // },
    //gotodate: '2023-07-10',
    height: 'auto',
    locales: [frLocale],
    locale: 'fr',
    events: events,
    date: selectedDate,
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
          <b style={{fontSize: 'x-small'}}>{arg.event.extendedProps.prof}</b>
          <br></br>
          <b style={{fontSize: 'x-small'}}>{arg.event.extendedProps.salle}</b>
        </div>
      );
    },
  };

  return (
    <div className="planningSemaine">
      <FullCalendar ref={calendarRef} {...calendarOptions} />
    </div>
  );
}

export default CalendarWeek;
