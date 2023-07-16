import React, { useState } from 'react';
import '../../styles/StudentDashboard.css';
import AbsenceDelayGrid from './AbsenceDelayGrid';
import { Button, Divider } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarWeek from '../CalendarWeek';
import { calendarService } from '../../_services/calendar.service';
import { accountService } from '../../_services/account.service';
import { courseService } from '../../_services/course.service';


export default function Dashboard(props) {
  const [absenceDelays, setAbsenceDelays] = useState([]);
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
            resList = resList.filter((presence) => presence.est_absent === true || presence.en_retard === true);
            let absenceDelaysList = [];
            resList.forEach((presence)=>{
              let dateAbsenceDelay = presence.date_cours.substr(8,2) + '/' 
              + presence.date_cours.substr(5,2) + '/' 
              + presence.date_cours.substr(0,4);
              let heureAbsenceDelay = presence.heure_debut_cours.substr(11,5).replace(':', 'h') 
              + '-' + presence.heure_fin_cours.substr(11,5).replace(':', 'h');
              let typeAbsenceDelay = "absence";
              if (presence.en_retard === true) {
                typeAbsenceDelay = "retard";
              }
              absenceDelaysList.push(
                {
                  id:presence.id_presence, 
                  date:dateAbsenceDelay,
                  heure:heureAbsenceDelay,
                  matiere: presence.libelle_matiere.toUpperCase(), 
                  prof : (presence.nom_intervenant[0] + '.' + presence.prenom_intervenant).toUpperCase(), 
                  mailap : presence.email_attache_de_promotion,
                  type : typeAbsenceDelay
                }
              );
            })
            setAbsenceDelays(absenceDelaysList);
        })
        .catch(error => {
            console.log(error);
        })
  }

  if (getPlanningAndAbsenceDelays) {
    requestCalendar(props.idUser);
    requestAbsenceDelays(accountService.getUserFunctionId())
    setGetPlanningAndAbsenceDelays(false);
  }

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
            <AbsenceDelayGrid data={absenceDelays.slice(0,3)} type="absence ou retard"/>
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