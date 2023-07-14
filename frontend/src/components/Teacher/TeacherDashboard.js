import React , { useState } from 'react';
import RegisterStudentsGrid from './RegisterStudentsGrid';
import { Button, Divider } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarWeek from '../CalendarWeek';
import { calendarService } from '../../_services/calendar.service';
import '../../styles/TeacherDashboard.css';

export default function Dashboard(props) {
  const [getPlanning, setGetPlanning] = useState(true);
  const [getAbsenceDelays, setGetAbsenceDelays] = useState(true);
  const [monthPlanning, setMonthPlanning] = useState([]);
  const [absenceDelays, setAbsenceDelays] = useState([]);

  const requestCalendar = (idUser) => {
    calendarService.month(props.idUser)
        .then(res => {
            console.log(res);  
            setMonthPlanning(res.data);
        })
        .catch(error => {
            console.log(error);
        })
  }

  if (getPlanning) {
    requestCalendar(props.idUser);
    setGetPlanning(false);
  }

  if (monthPlanning.length !== 0 && getAbsenceDelays) {
    let todayCourses = monthPlanning.filter((cours)=>{
      let actualDay = new Date();
      actualDay.setHours(actualDay.getHours() + 2);
      actualDay = actualDay.toISOString();
      let courseDay = cours.date_cours;
      if (actualDay.substring(0,10) === courseDay.substring(0,10)) {
        return true
      } else {
        return false
      }
    })
    let absenceDelayRaw = todayCourses.map(cours => {
      let heureCours = cours.heure_debut_cours.substring(11, 16).replace(':', 'h');
      heureCours += '-' + cours.heure_fin_cours.substring(11, 16).replace(':', 'h');
      let dateCours = new Date();
      dateCours = dateCours.toLocaleDateString("fr");
      return {
        id: cours.id_cours, 
        date: dateCours, 
        heure: heureCours,
        matiere: cours.libelle_matiere.toUpperCase(),
        classe: cours.libelle_classe.toUpperCase(),
        Emarger: false
      }
    });
    absenceDelayRaw.sort((a, b) =>{
      return parseInt(a.heure.substring(0, 2)) - parseInt(b.heure.substring(0, 2));
    })
    setAbsenceDelays(absenceDelayRaw.slice(0,3));
    setGetAbsenceDelays(false);
  }

  return (
    <div className="TeacherDashboard">
      <div className='dashboard'>
          <div className='registerStudentsDash'>
            <div className='DashTitleLine'>
              <h1 className='registerStudentsDashTitle'>
                <ListAltIcon className='DashTitleLogo' fontSize='large'/>
                Émargement 
              </h1>
              <div className='SeeMoreButton'><Button href='/teacher/register-students' variant="contained" startIcon={<VisibilityIcon/>}>VOIR TOUT</Button></div>
            </div>
            <h2 className='registerStudentsDashSubTitle'>Cours à émarger aujourd'hui</h2>
            {/* prendre les dernières absences/retards si le tri est par date la plus ancienne d'abord. */}
            <RegisterStudentsGrid data={absenceDelays} mailap="mail.ap@esgi.fr" type="émargment"/>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
          <div className='planningDash'>
            <div className='DashTitleLine'>
            <h1 className='planningDashTitle'>
              <CalendarMonthIcon className='DashTitleLogo' fontSize='large'/>
              Planning
            </h1>
            <div className='SeeMoreButton'><Button href='/teacher/planning' variant="contained" startIcon={<VisibilityIcon/>}>VOIR TOUT</Button></div>
          </div>
            <div className='planning-weekDash'>
              <CalendarWeek SelectedDate={null} variant='teacher' courses={monthPlanning}/>
            </div>
          </div>
        </div>
    </div>
  )
}