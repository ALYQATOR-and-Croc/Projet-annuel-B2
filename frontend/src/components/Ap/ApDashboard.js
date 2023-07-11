import React, { useState } from 'react';
import { calendarService } from '../../_services/calendar.service';

export default function Dashboard(props) {
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
<div className="ApDashboard"> 
<div className='dashboard'>
Dashboad Ap </div></div>
    )
}