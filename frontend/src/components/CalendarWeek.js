import React, { useEffect } from 'react';
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

function CalendarWeek(props) {
  const calendarRef = React.createRef();

  // Si date selectionnée dans le mois, affichage de la date choisie
  useEffect(() => {
    let calendarApi = calendarRef.current.getApi();
    if (props.SelectedDate !== null) {
      calendarApi.gotoDate(props.SelectedDate);
    }
  });

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
    eventColor: '#239489',
    nowIndicator: true,
    allDaySlot: false,
    eventClick: (info) => console.log(info.event.id),
    eventContent: function (arg) {
      return (
        <div>
          <b style={{fontSize: 'xx-small'}}>{arg.timeText}</b>
          <br></br>
          <b style={{fontSize: 'x-small'}}>{arg.event.title}</b>
          <br></br>
          {
            (props.variant === 'teacher') ? <b style={{fontSize: 'x-small'}}>{arg.event.extendedProps.classe}</b> :
            <b style={{fontSize: 'x-small'}}>{arg.event.extendedProps.prof}</b>
          }
          <br></br>
          <b style={{fontSize: 'x-small'}}>{arg.event.extendedProps.salle}</b>
        </div>
      );
    },
  };

  return (
    <div className="calendarSemaine">
      <FullCalendar id='calendarSemaine' ref={calendarRef} {...calendarOptions} />
    </div>
  );
}

export default CalendarWeek;
