import React, { useState } from 'react';
import '../../styles/AbsenceDelayStudent.css';
import AbsenceDelayGrid from './AbsenceDelayGrid';
import { Divider } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { courseService } from '../../_services/course.service';
import { accountService } from '../../_services/account.service';



export default function RegisterStudents() {
  const [absences, setAbsences] = useState([]);
  const [delays, setDelays] = useState([]);
  const [getAbsenceDelays, setGetAbsenceDelays] = useState(true);
  
  const formatAbsenceDelay = (inputArray) => {
    let outputArray = [];
    inputArray.forEach((presence)=>{
      let dateAbsenceDelay = presence.date_cours.substr(8,2) + '/' 
      + presence.date_cours.substr(5,2) + '/' 
      + presence.date_cours.substr(0,4);
      let heureAbsenceDelay = presence.heure_debut_cours.substr(11,5).replace(':', 'h') 
      + '-' + presence.heure_fin_cours.substr(11,5).replace(':', 'h');
      let typeAbsenceDelay = "absence";
      if (presence.en_retard === true) {
        typeAbsenceDelay = "retard";
      }
      outputArray.push(
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
    return outputArray;
  };

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
            let resListAbsences = resList.filter((presence) => presence.est_absent === true);
            let resListDelays = resList.filter((presence) => presence.en_retard === true);
            let absencesList = formatAbsenceDelay(resListAbsences);
            let delaysList = formatAbsenceDelay(resListDelays);
            setAbsences(absencesList);
            setDelays(delaysList);
        })
        .catch(error => {
            console.log(error);
        })
  }

  if (getAbsenceDelays) {
    requestAbsenceDelays(accountService.getUserFunctionId())
    setGetAbsenceDelays(false);
  }

  return (
    <div className="AbsenceDelayStudent">
        <div className='absenceDelayGrids'>
          <div className='absences'>
            <h1 className='absencesTitle'>
              <PersonOffIcon className='delaysTitleLogo' fontSize='large'/>
              Absences
            </h1>
            <AbsenceDelayGrid data={absences} type="absence"/>
          </div>
          <Divider orientation="vertical" flexItem></Divider>
          <div className='delays'>
          <h1 className='delaysTitle'>
            <AccessAlarmIcon className='delaysTitleLogo' fontSize='large'/>
            Retards
          </h1>
            <AbsenceDelayGrid data={delays} type="retard"/>
          </div>
        </div>
    </div>
  )
}
