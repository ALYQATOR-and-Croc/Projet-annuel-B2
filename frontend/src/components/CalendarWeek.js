import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

//import '../../styles/PlanningJour.css';

const events = [
  {
    id: 1,
    title: 'Mathématique',
    prof:'Mr DUMONT',
    salle: 'SALLE 515',
    start: '2023-06-28T09:45:00',
    end: '2023-06-28T11:15:00',
  },
  {
    id: 2,
    title: 'Mathématique',
    prof:'Mr DUMONT',
    salle: 'SALLE 515',
    start: '2023-06-28T11:30:00',
    end: '2023-06-28T13:00:00',
  },
  {
    id: 3,
    title: 'Mathématique',
    prof:'Mr DUMONT',
    salle: 'SALLE 515',
    start: '2023-06-28T14:00:00',
    end: '2023-06-28T15:30:00',
  },
  {
    id: 4,
    title: 'Mathématique',
    prof:'Mr DUMONT',
    salle: 'SALLE 515',
    start: '2023-06-28T15:45:00',
    end: '2023-06-28T17:15:00',
  },
];

function CalendarWeek() {
  const calendarRef = React.createRef();

  const handleDateClick = (info) => {
    console.log('Date clicked: ', info.dateStr);
  };

  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    slotDuration: '00:30:00',
    slotMinTime: '08:00:00',
    slotMaxTime: '19:00:00',
    height: 'auto',
    locales: [frLocale],
    locale: 'fr',
    events: events,
    eventColor: '#4BBDB7',
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
    <div className="PlanningSemaine">
      <FullCalendar ref={calendarRef} {...calendarOptions} />
    </div>
  );
}

export default CalendarWeek;
