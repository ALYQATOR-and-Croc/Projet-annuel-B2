import React, { useState } from 'react';
import RegisterTable from '../RegisterTable';
import '../../styles/RegisterStudents.css';
import { Button, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CalendarDay from '../CalendarDay';
import { calendarService } from '../../_services/calendar.service';
import { courseService } from '../../_services/course.service';

export default function RegisterStudents(props) {

  const [dayPlanning, setDayPlanning] = useState([]);
  const [courseStudentList, setCourseStudentList] = useState([]);
  const [isCoursSelected, setIsCoursSelected] = useState(false);
  const [idCoursSelected, setIdCoursSelected] = useState(null);
  const [previousIdCoursSelected, setPreviousIdCoursSelected] = useState(null);

  // Header cours affiché
  const [dateCours, setDateCours] = useState('');
  const [heureDebutCours, setHeureDebutCours] = useState('');
  const [heureFinCours, setHeureFinCours] = useState('');
  const [matiereCours, setMatiereCours] = useState('');

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

  const requestCourseStudentList = (idCours) => {
    courseService.studentList(idCours)
        .then(res => {
            let resList = undefined;  
            if (!Array.isArray(res.data)) {
              resList = [res.data];
            } else {
              resList = res.data;
            }
            resList = resList.map((eleve) => {
              return { ...eleve, id: eleve.id_utilisateur, nom: eleve.nom.toUpperCase()};
            })
            setCourseStudentList(resList);
        })
        .catch(error => {
            console.log(error);
        })
  }

  if (dayPlanning.length === 0) {
    requestCalendar(props.idUser);
  }

  if (isCoursSelected) {
    if (idCoursSelected !== previousIdCoursSelected) {
      let selectedCourse = dayPlanning.find(cours => cours.id_cours === parseInt(idCoursSelected));
      setDateCours(selectedCourse.date_cours.substr(8,2) + '/' 
      + selectedCourse.date_cours.substr(5,2) + '/' 
      + selectedCourse.date_cours.substr(0,4));
      setHeureDebutCours(selectedCourse.heure_debut_cours.substr(11,5).replace(':', 'h'));
      setHeureFinCours(selectedCourse.heure_fin_cours.substr(11,5).replace(':', 'h'));
      setMatiereCours(selectedCourse.libelle_matiere.toUpperCase());
      requestCourseStudentList(idCoursSelected);
      setPreviousIdCoursSelected(idCoursSelected);
    }
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
          <h1>Appel du {dateCours}</h1>
          <h2>{heureDebutCours}-{heureFinCours} : {matiereCours}</h2>
        </div>
        <div className='btnEmargement'><Button variant="contained" endIcon={<CheckIcon/>} onClick={() => setIsCoursSelected(false)}>Confirmer l'appel</Button></div>
        {/* Avec l'idCours récupéré, requete api pour récupérer elèves du cours */}
        <div className="RegisterTable"><RegisterTable eleves={courseStudentList}/></div>
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
