import React, { useState } from 'react';
//import CalendarDay from './CalendarDay';
import CalendarMonth from '../CalendarMonth';
import CalendarWeek from '../CalendarWeek'

import '../../styles/ColorCalendar.css'
import '../../styles/PlanningStudent.css'

export default function StudentPlanning() {

  const [SelectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className='planning-container'>
      <div className='planning-month-size'>
        <CalendarMonth onDateClick={handleDateClick}/>
      </div>
      <div className='planning-week-size'>
        <CalendarWeek SelectedDate={SelectedDate}/>
      </div>
    </div>
  );
}



