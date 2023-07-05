import React, { useState } from 'react';
//import CalendarDay from './CalendarDay';
import CalendarMonth from '../CalendarMonth';
import CalendarWeek from '../CalendarWeek'

import '../../styles/PlanningPage.css'

export default function TeacherPlanning() {

  const [SelectedDate, setSelectedDate] = useState(null);

  const showSelectedDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className='planning-container'>
      <div className='planning-month-size'>
        <CalendarMonth onDateClick={showSelectedDate}/>
        <p className='planning-month-info'>↑ Cliquez sur un jour du mois pour afficher sa semaine ↑</p>
      </div>
      <div className='planning-week-size'>
        <CalendarWeek SelectedDate={SelectedDate} variant='teacher'/>
      </div>
    </div>
  );
}