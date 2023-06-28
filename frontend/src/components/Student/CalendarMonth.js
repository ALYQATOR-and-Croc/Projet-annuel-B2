import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';


function PlanningMois() {
  const calendarRef = React.createRef();

  const handleDateClick = (info) => {
    console.log('Date clicked: ', info.dateStr);
  };

  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    height: 'auto',
    locales: [frLocale],
    locale: 'fr',
    eventColor: '#4BBDB7',
    nowIndicator: true,
    dateClick: handleDateClick,
    eventClick: (info) => console.log(info.event.id),
  };

  return (
    <div className="planningMois">
      <FullCalendar ref={calendarRef} {...calendarOptions} />
    </div>
  );
}

export default PlanningMois;