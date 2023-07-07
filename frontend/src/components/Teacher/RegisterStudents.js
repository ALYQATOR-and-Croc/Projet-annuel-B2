import React, { useState } from 'react';
import RegisterTable from '../RegisterTable';
import '../../styles/RegisterStudents.css';
import { Button, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CalendarDay from '../CalendarDay';

export default function RegisterStudents() {

  const cours = [
    {
      id: 1,
      title: 'Mathématique',
      classe:'B2 ESGI',
      salle: 'SALLE 515',
      start: '2023-07-05T09:45:00',
      end: '2023-07-05T11:15:00',
    },
    {
      id: 2,
      title: 'Mathématique',
      classe:'B2 ESGI',
      salle: 'SALLE 515',
      start: '2023-07-05T11:30:00',
      end: '2023-07-05T13:00:00',
    },
    {
      id: 3,
      title: 'Python',
      classe:'M1 ESGI',
      salle: 'SALLE 205',
      start: '2023-07-05T14:00:00',
      end: '2023-07-05T15:30:00',
    },
    {
      id: 4,
      title: 'Algorithmie',
      classe:'M1 ESGI',
      salle: 'SALLE 145',
      start: '2023-07-05T15:45:00',
      end: '2023-07-05T17:15:00',
    },
  ];

  const [isCoursSelected, setIsCoursSelected] = useState(false);
  const [idCoursSelected, setIdCoursSelected] = useState(null);

  let date = '';
  let heureDebut = '';
  let heureFin = '';
  let matiere = '';

  if (isCoursSelected) {
    date = cours[idCoursSelected-1].start.substr(0,10).replace(/-/g, '/');
    heureDebut = cours[idCoursSelected-1].start.substr(11,5).replace(':', 'h');
    heureFin = cours[idCoursSelected-1].end.substr(11,5).replace(':', 'h');
    matiere = cours[idCoursSelected-1].title;
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
          <CalendarDay cours={cours} onCoursClick={showSelectedCours}/>
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
