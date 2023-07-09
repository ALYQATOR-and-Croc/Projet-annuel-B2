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
  {
    id: 2,
    start: '2023-07-10',
  },
  {
    id: 3,
    start: '2023-07-18',
  },
  {
    id: 4,
    start: '2023-07-18',
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
  
  
  //création du tableau avec les datess uniques
  const uniqueDates = Array.from(new Set(events.map((event) => event.start)))
  .map((date) => ({ start: date }));
  
//console.log(uniqueDates);
  
  const handleEventClick = (info) => {
    const event = info.event;
    var Eventdate = event.start 
    Eventdate = Eventdate.setDate(event.start.getDate() + 1)
    onEventClick(Eventdate);
  }

  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    height: 'auto',
    locales: [frLocale],
    locale: 'fr',
    events: uniqueDates,
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