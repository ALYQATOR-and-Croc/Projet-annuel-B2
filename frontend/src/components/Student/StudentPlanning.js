import React, { useState } from 'react';
import CalendarMonth from '../CalendarMonth';
import CalendarWeek from '../CalendarWeek'
import { calendarService } from '../../_services/calendar.service';
import '../../styles/PlanningPage.css';

export default function StudentPlanning(props) {
  const [getPlanning, setGetPlanning] = useState(true);
  const [monthPlanning, setMonthPlanning] = useState([]);
  const [SelectedDate, setSelectedDate] = useState(null);

  const showSelectedDate = (date) => {
    setSelectedDate(date);
  };

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

  return (
    <div className='planning-container'>
      <div className='planning-month-size'>
        <CalendarMonth onDateClick={showSelectedDate} onEventClick={showSelectedDate} courses={monthPlanning}/>
        <p className='planning-month-info'>↑ Cliquez sur un jour du mois pour afficher sa semaine ↑</p>
      </div>
      <div className='planning-week-size'>
        <CalendarWeek SelectedDate={SelectedDate} variant='student' courses={monthPlanning}/>
      </div>
    </div>
  );
}



