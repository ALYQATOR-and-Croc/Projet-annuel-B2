import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

import '../styles/ColorCalendar.css';

const events = [
  {
    id: 1,
    start: '2023-07-03',
  },
]

// const eventsDate = [events.start];

// for (let i = 0; i < events.length; i++) {
//   const eventsDay = [i];
//   if (events.start === eventsDate){
//     eventsDay.push(i);
//   }
// }


function CalendarMonth({onDateClick, onEventClick}) {
  const calendarRef = React.createRef();

  const handleDateClick = (info) => {
    const dateStr = info.dateStr;
    onDateClick(dateStr);
  };
  
  const handleEventClick = (info) => {
    // const event = info.event;
    // const day = event.start.getDate();
    // console.log(day);
    //  console.log(event);
    const event = info.event;
    const Eventdate = event.start.toISOString().split('T')[0];
    // Appeler la fonction de rappel avec la date complète
    onEventClick(Eventdate);
  }

  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    height: 'auto',
    locales: [frLocale],
    locale: 'fr',
    events: events,
    eventColor: '#4BBDB7',
    nowIndicator: true,
    dateClick: handleDateClick, 
    eventClick: handleEventClick 
  };

  return (
    <div className="calendarMois">
      <FullCalendar ref={calendarRef} {...calendarOptions} />
    </div>
  );
}

export default CalendarMonth;