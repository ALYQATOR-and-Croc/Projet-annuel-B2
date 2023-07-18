import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

import '../styles/ColorCalendar.css';

function CalendarDay(props) {
  const calendarRef = React.createRef();

  let courses = [];

  const ApiPlanning = props.courses;
  if (ApiPlanning !== undefined) {
    courses = ApiPlanning.map((course)=>{
      let heure_debut = new Date(course.heure_debut_cours);
      heure_debut.setHours(heure_debut.getHours() - 2);
      let heure_fin = new Date(course.heure_fin_cours);
      heure_fin.setHours(heure_fin.getHours() - 2);
      return {
        id: course.id_cours,
        title: course.libelle_matiere.toUpperCase(),
        prof: course.prenom_intervenant[0].toUpperCase() + ". " + course.nom_intervenant.toUpperCase(),
        classe: course.libelle_classe.toUpperCase(),
        salle: course.libelle_salle,
        start: heure_debut,
        end: heure_fin,
      }
    })
  }

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
    events: courses,
    eventColor: '#239489',
    nowIndicator: true,
    allDaySlot: false,
    eventClick: handleEventClick,
    eventContent: function (arg) {
      return (
        <div>
          <b style={{fontSize: 'xx-small'}}>{arg.timeText}</b>
          <br></br>
          <b style={{fontSize: 'x-small', whiteSpace: 'noWrap', overflow: 'hidden'}}>{arg.event.title}</b>
          <br></br>
          <b style={{fontSize: 'x-small', whiteSpace: 'noWrap', overflow: 'hidden'}}>{arg.event.extendedProps.classe}</b>
          <br></br>
          <b style={{fontSize: 'x-small'}}>Salle {arg.event.extendedProps.salle}</b> 
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


