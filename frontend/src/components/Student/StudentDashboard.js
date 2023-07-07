import React from 'react';
import '../../styles/StudentDashboard.css';
import AbsenceDelayGrid from './AbsenceDelayGrid';
import { Button, Divider } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarWeek from '../CalendarWeek';

export default function Dashboard() {

  const absenceDelays = [
  {id:1, date: "06/07/2023", heure: "8h-9h30", matiere: "Algorithmie", prof:"M. BONNETON", justified:false},
  {id:2, date: "02/06/2023", heure: "14h-15h30", matiere: "Langage C", prof:"M. BONCHE", justified:true},
  {id:3, date: "18/02/2023", heure: "8h-9h30", matiere: "Linux", prof:"M. LOPEZ", justified:true},
  {id:4, date: "18/02/2023", heure: "8h-9h30", matiere: "Linux", prof:"M. LOPEZ", justified:true}
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
              <CalendarWeek SelectedDate={null} variant='student'/>
            </div>
          </div>
        </div>
    </div>
  )
}