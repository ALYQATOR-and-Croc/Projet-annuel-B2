import React, { useState } from 'react';
import '../../styles/StudentDashboard.css';
import AbsenceDelayGrid from './AbsenceDelayGrid';
import { Button, Divider } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarWeek from '../CalendarWeek';
import { calendarService } from '../../_services/calendar.service';
import { courseService } from '../../_services/course.service';


export default function Dashboard(props) {
  const [getPlanningAndAbsenceDelays, setGetPlanningAndAbsenceDelays] = useState(true);
  const [monthPlanning, setMonthPlanning] = useState([]);

  const requestCalendar = (idUser) => {
    calendarService.month(idUser)
        .then(res => {
            console.log(res);  
            setMonthPlanning(res.data);
        })
        .catch(error => {
            console.log(error);
        })
  }
  const requestCourse = (idCourse) => {
    calendarService.specificCourse(idCourse)
        .then(res => {
            console.log(res);  
            return(res.data);
        })
        .catch(error => {
            console.log(error);
        })
  }
  const requestAbsenceDelays = (idUser) => {
    courseService.getPresence(idUser)
        .then(res => {
            console.log(res); 
            let resList = undefined;  
            if (!Array.isArray(res.data)) {
              resList = [res.data];
            } else {
              resList = res.data;
            }
            resList = resList.filter((presence) => presence.a_signe !== null);
            let absenceDelaysList = [];
            resList.forEach((presence)=>{
              let courseInfo = requestCourse(presence.id_cours);
              console.log(courseInfo);
            })
            // get cours by id
            // resList = resList.map((presence) => {
            //   return { ...eleve, id: eleve.id_etudiant, nom: eleve.nom.toUpperCase()};
            
        })
        .catch(error => {
            console.log(error);
        })
  }

  if (getPlanningAndAbsenceDelays) {
    requestCalendar(props.idUser);
    requestAbsenceDelays(6)
    setGetPlanningAndAbsenceDelays(false);
  }

  const absenceDelays = [
  {id:1, date: "06/07/2023", heure: "8h-9h30", matiere: "Algorithmie", prof:"M. BONNETON"},
  {id:2, date: "02/06/2023", heure: "14h-15h30", matiere: "Langage C", prof:"M. BONCHE"},
  {id:3, date: "18/02/2023", heure: "8h-9h30", matiere: "Linux", prof:"M. LOPEZ"},
  {id:4, date: "18/02/2023", heure: "8h-9h30", matiere: "Linux", prof:"M. LOPEZ"}
  ];

  return (
    <div className="StudentDashboard">
      <div className='dashboard'>
          <div className='absenceDelayDash'>
            <div className='DashTitleLine'>
              <h1 className='absenceDelayDashTitle'>
                <PersonOffIcon className='DashTitleLogo' fontSize='large'/>
                Absences et retards 
              </h1>
              <div className='SeeMoreButton'><Button href='/student/absence-delay' variant="contained" startIcon={<VisibilityIcon/>}>VOIR TOUT</Button></div>
            </div>
            <h2 className='absenceDelayDashSubTitle'>Dernières absences et retards</h2>
            {/* prendre les dernières absences/retards si le tri est par date la plus ancienne d'abord. */}
            <AbsenceDelayGrid data={absenceDelays.slice(0,3)} mailap="mail.ap@esgi.fr" type="absence"/>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
          <div className='planningDash'>
            <div className='DashTitleLine'>
            <h1 className='planningDashTitle'>
              <CalendarMonthIcon className='DashTitleLogo' fontSize='large'/>
              Planning
            </h1>
            <div className='SeeMoreButton'><Button href='/student/planning' variant="contained" startIcon={<VisibilityIcon/>}>VOIR TOUT</Button></div>
          </div>
            <div className='planning-weekDash'>
              <CalendarWeek SelectedDate={null} variant='student' courses={monthPlanning}/>
            </div>
          </div>
        </div>
    </div>
  )
}