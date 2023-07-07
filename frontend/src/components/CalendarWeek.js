import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import '../styles/ColorCalendar.css';

function CalendarWeek(props) {
  const calendarRef = React.createRef();
  let courses = [];

  const ApiPlanning = props.courses;
  if (ApiPlanning !== undefined) {
    courses = ApiPlanning.map((course)=>{
      return {
        id: course.id_cours,
        title: course.libelle_matiere,
        prof: course.nom_intervenant,
        classe: course.libelle_classe,
        salle: course.libelle_salle,
        start: course.heure_debut_cours,
        end: course.heure_fin_cours,
      }
    })
  }

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
    events: courses,
    eventColor: '#239489',
    nowIndicator: true,
    allDaySlot: false,
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
          <b style={{fontSize: 'x-small'}}>Salle {arg.event.extendedProps.salle}</b>
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
