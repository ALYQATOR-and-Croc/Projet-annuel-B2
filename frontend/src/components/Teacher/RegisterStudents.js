import React, { useState } from 'react';
import RegisterTable from '../RegisterTable';
import '../../styles/RegisterStudents.css';
import { Button, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CalendarDay from '../CalendarDay';
import { calendarService } from '../../_services/calendar.service';

export default function RegisterStudents(props) {

  const [dayPlanning, setDayPlanning] = useState([]);
  const [isCoursSelected, setIsCoursSelected] = useState(false);
  const [idCoursSelected, setIdCoursSelected] = useState(null);

  // const cours = [
  //   {
  //     id: 1,
  //     title: 'Mathématique',
  //     classe:'B2 ESGI',
  //     salle: 'SALLE 515',
  //     start: '2023-07-05T09:45:00',
  //     end: '2023-07-05T11:15:00',
  //   },
  //   {
  //     id: 2,
  //     title: 'Mathématique',
  //     classe:'B2 ESGI',
  //     salle: 'SALLE 515',
  //     start: '2023-07-05T11:30:00',
  //     end: '2023-07-05T13:00:00',
  //   },
  //   {
  //     id: 3,
  //     title: 'Python',
  //     classe:'M1 ESGI',
  //     salle: 'SALLE 205',
  //     start: '2023-07-05T14:00:00',
  //     end: '2023-07-05T15:30:00',
  //   },
  //   {
  //     id: 4,
  //     title: 'Algorithmie',
  //     classe:'M1 ESGI',
  //     salle: 'SALLE 145',
  //     start: '2023-07-05T15:45:00',
  //     end: '2023-07-05T17:15:00',
  //   },
  // ];

  const requestCalendar = (idUser) => {
    calendarService.day(props.idUser)
        .then(res => {
            console.log(res);  
            setDayPlanning(res.data);
        })
        .catch(error => {
            console.log(error);
        })
  }

  if (dayPlanning.length === 0) {
    requestCalendar(props.idUser);
  }

  let date = '';
  let heureDebut = '';
  let heureFin = '';
  let matiere = '';

  if (isCoursSelected) {
    let selectedCourse = dayPlanning.find(cours => cours.id_cours === parseInt(idCoursSelected));
    date = selectedCourse.date_cours.substr(8,2) + '/' 
    + selectedCourse.date_cours.substr(5,2) + '/' 
    + selectedCourse.date_cours.substr(0,4);
    heureDebut = selectedCourse.heure_debut_cours.substr(11,5).replace(':', 'h');
    heureFin = selectedCourse.heure_fin_cours.substr(11,5).replace(':', 'h');
    matiere = selectedCourse.libelle_matiere.toUpperCase();
  }

  const showSelectedCours = (idCours) => {
    setIdCoursSelected(idCours);
    setIsCoursSelected(true);
  };

  return (
    <div className="RegisterStudents">
      <div className="RegisterStudentsDay">
        <h3 className="soustitreEmargementDay">↓ Cliquez sur un cours pour en faire l'émargement ↓</h3>
        <div className ="RegisterCalendar">
          <CalendarDay courses={dayPlanning} onCoursClick={showSelectedCours}/>
        </div>
      </div>
      <Divider orientation="vertical" flexItem></Divider>
      { isCoursSelected ? 
      <div className="RegisterStudentsTable">
        <div className="titreEmargement">
          <h1>Appel du {date}</h1>
          <h2>{heureDebut}-{heureFin} : {matiere}</h2>
        </div>
        <div className='btnEmargement'><Button variant="contained" endIcon={<CheckIcon/>} onClick={() => setIsCoursSelected(false)}>Confirmer l'appel</Button></div>
        {/* Avec l'idCours récupéré, requete api pour récupérer elèves du cours */}
        <div className="RegisterTable"><RegisterTable eleves={[]}/></div>
      </div> :
      <div className="titreNotEmargement">
        <EventBusyIcon className='notEmargementIcon' fontSize='large'/>
        <h1>Aucun cours selectionné</h1>
        <h3>← Choisissez un cours</h3>
      </div>
      }
    </div>
  )
}
