import React, { useState, useEffect } from 'react';
import RegisterTable from '../RegisterTable';
import '../../styles/RegisterStudents.css';
import { Button, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CalendarDay from '../CalendarDay';
import { calendarService } from '../../_services/calendar.service';
import { courseService } from '../../_services/course.service';

export default function RegisterStudents(props) {

  const [getPlanning, setGetPlanning] = useState(true);
  const [dayPlanning, setDayPlanning] = useState([]);
  const [courseStudentList, setCourseStudentList] = useState([]);
  const [isCoursSelected, setIsCoursSelected] = useState(false);
  const [idCoursSelected, setIdCoursSelected] = useState(null);
  const [previousIdCoursSelected, setPreviousIdCoursSelected] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [absenceSent, setAbsenceSent] = useState(false);
  const [delaySent, setDelaySent] = useState(false);

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
              return { ...eleve, id: eleve.id_etudiant, nom: eleve.nom.toUpperCase()};
            })
            setCourseStudentList(resList);
        })
        .catch(error => {
            console.log(error);
        })
  }

  if (getPlanning) {
    requestCalendar(props.idUser);
    setGetPlanning(false);
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
      setDelaySent(false);
    }
  }

  const showSelectedCours = (idCours) => {
    if (idCoursSelected !== previousIdCoursSelected) {
      setDelaySent(false);
    }
    setIdCoursSelected(idCours);
    setIsCoursSelected(true);
  };

  const uploadDelayAbsence = () => {
    let uploadData = {};
    if (delaySent) {
      setDelaySent(false);
      setAbsenceSent(true);
      setIsCoursSelected(false); 
      uploadData = {
        "idCourse":idCoursSelected, 
        "listStudents":selectedRows.map((absent) => {
          return {
            "idStudent":absent.id,
            "isAbsent":true,
            "isLate":false,
            "hasSigned":false
          }
        })
      }
    } else {
      filterStudentList();
      setDelaySent(true)
      uploadData = {
        "idCourse":idCoursSelected, 
        "listStudents":selectedRows.map((absent) => {
          return {
            "idStudent":absent.id,
            "isAbsent":false,
            "isLate":true,
            "hasSigned":true
          }
        })
      }
    }
    console.log(uploadData);
    courseService.sendPresence(uploadData)
    .then(res => {
      console.log(res);
      })
    .catch(error => {
        console.log(error);
    });
  }

  const filterStudentList = () => {
    // affichage des élèves non en retard
    let delayIds = selectedRows.map(row=>row.id);
    setCourseStudentList(courseStudentList.filter((eleve)=>{
      if (!delayIds.includes(eleve.id)) {
        return true;
      } else {
        return false;
      }
    }));
  }

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
          <h1>
            {delaySent ? "ABSENCES " : "RETARDS "}
            du {dateCours}
          </h1>
          <h2>{heureDebutCours}-{heureFinCours} : {matiereCours}</h2>
        </div>
        <div className='btnsEmargement'>
          <div className='btnConfirm'>
            <Button variant="contained" endIcon={<CheckIcon/>} onClick={uploadDelayAbsence}>
              {delaySent ? "Confirmer les absences" : "Confirmer les retards"}
            </Button>
          </div>
          <div className='btnCancel'>
            <Button variant="contained" endIcon={<CloseIcon/>} onClick={()=>setIsCoursSelected(false)}>
              Annuler
            </Button>
          </div>
        </div>
        {/* Avec l'idCours récupéré, requete api pour récupérer elèves du cours */}
        <div className="RegisterTable"><RegisterTable eleves={courseStudentList} setSelectedRows={setSelectedRows}/></div>
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
