import React from 'react';
import '../../styles/AbsenceDelayStudent.css';
import AbsenceDelayGrid from './AbsenceDelayGrid';
import { Divider } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PersonOffIcon from '@mui/icons-material/PersonOff';


export default function RegisterStudents() {

  const absences = [
  {id:1, date: "06/07/2023", heure: "8h-9h30", matiere: "Algorithmie", prof:"M. BONNETON"},
  {id:2, date: "02/06/2023", heure: "14h-15h30", matiere: "Langage C", prof:"M. BONCHE"},
  {id:3, date: "18/02/2023", heure: "8h-9h30", matiere: "Linux", prof:"M. LOPEZ"}
  ];
               
  const delays = [
  {id:1, date: "23/06/2023", heure: "11h30-13h", matiere: "Python", prof:"M. BONNETON"},
  {id:2, date: "19/02/2023", heure: "8h-9h30", matiere: "NodeJS", prof:"M. BENDAHMANE"},
  {id:3, date: "01/02/2023", heure: "17h30-19h", matiere: "Modélisation UML", prof:"M. BONCHE"}
  ];

  return (
    <div className="AbsenceDelayStudent">
        <div className='absenceDelayGrids'>
          <div className='absences'>
            <h1 className='absencesTitle'>
              <PersonOffIcon className='delaysTitleLogo' fontSize='large'/>
              Absences
            </h1>
            <AbsenceDelayGrid data={absences} mailap="mail.ap@esgi.fr" type="absence"/>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
          <div className='delays'>
          <h1 className='delaysTitle'>
            <AccessAlarmIcon className='delaysTitleLogo' fontSize='large'/>
            Retards
          </h1>
            <AbsenceDelayGrid data={delays} mailap="mail.ap@esgi.fr" type="retard"/>
          </div>
        </div>
    </div>
  )
}
