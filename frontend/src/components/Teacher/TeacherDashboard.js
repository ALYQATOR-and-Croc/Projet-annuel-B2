import React , { useState } from 'react';
import RegisterStudentsGrid from './RegisterStudentsGrid';
import { Button, Divider } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarWeek from '../CalendarWeek';

import '../../styles/TeacherDashboard.css';

export default function Dashboard() {

  const absenceDelays = [
  {id:1, date: "06/07/2023", heure: "8h-9h30", matiere: "Algorithmie", classe:"B2 ESGI", Emarger:false},
  {id:2, date: "02/06/2023", heure: "14h-15h30", matiere: "Algorithmie", classe:"B2 ESGI", Emarger:true},
  {id:3, date: "18/02/2023", heure: "8h-9h30", matiere: "Mathématiques", classe:"M1 ESGI",Emarger:true},
  {id:4, date: "18/02/2023", heure: "8h-9h30", matiere: "Big data", classe:"M2 ESGI", Emarger:true}
  ];

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
            <h2 className='registerStudentsDashSubTitle'>Prochain cours à émarger</h2>
            {/* prendre les dernières absences/retards si le tri est par date la plus ancienne d'abord. */}
            <RegisterStudentsGrid data={absenceDelays.slice(0,3)} mailap="mail.ap@esgi.fr" type="émargment"/>
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
              <CalendarWeek SelectedDate={null}/>
            </div>
          </div>
        </div>
    </div>
  )
}