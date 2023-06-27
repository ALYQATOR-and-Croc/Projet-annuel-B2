import React from 'react'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

const events = [
    {
      id: 1,
      title: 'Réu hebdo',
      start: '2023-06-27T11:00:00',
      end: '2023-06-27T12:00:00',
    },
    {
      id: 2,
      title: 'Réu du lendemain',
      start: '2023-06-28T13:00:00',
      end: '2023-06-28T18:00:00',
    },
    { id: 3, title: 'journé de cours', start: '2023-06-29', end: '2023-06-29' },
  ];


function PlanningMois() {
    return (
      <div className="planningMois">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
         
        //   headerToolbar={{
        //     center: 'dayGridMonth,timeGridWeek,timeGridDay new',
        //   }}
          
          events={events}
          eventColor="blue"
          nowIndicator
          locales={frLocale}
          locale='fr'
          dateClick={(e) => console.log(e.dateStr)}
          eventClick={(e) => console.log(e.event.id)}
        />
      </div>
    );
  }
  
  export default PlanningMois;