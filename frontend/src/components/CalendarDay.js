import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

import '../styles/ColorCalendar.css';

function CalendarDay(props) {
  const calendarRef = React.createRef();

  const handleEventClick = (info) => {
    const idCours = info.event.id;
    props.onCoursClick(idCours);
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
    events: props.cours,
    eventColor: '#239489',
    nowIndicator: true,
    allDaySlot: false,
    eventClick: handleEventClick,
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


