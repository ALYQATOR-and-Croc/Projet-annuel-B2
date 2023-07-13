import React, { useState } from 'react';
import { calendarService } from '../../_services/calendar.service';
import '../../styles/ReproDashboard.css';

export default function ReproDashboard(props) {
    const [monthPlanning, setMonthPlanning] = useState([]);
  
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
  
    if (monthPlanning.length === 0) {
      requestCalendar(props.idUser);
    }

  
    return (
<div className="ReproDashboard"> 
    <div className='ReproDashboardAppel'>
        <t>Hello ! je suis l'endroit ou vont se trouvé les fiches d'appels !</t>
    </div>
    <div className='ReproDashboardChiffre'>
        <div className='ReproDashboardChiffreConsu'>
            <t>Fiche d'appels à consulter</t>
        </div>
        <div className='ReproDashboardChiffreAVenir'>
            <t>Fiche d'appels non envoyé</t>
        </div>
    </div> 
</div>
    )
}