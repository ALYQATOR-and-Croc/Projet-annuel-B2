import React, { useState } from 'react';
import CalendarDay from './CalendarDay';
import CalendarMonth from './CalendarMonth';
import CalendarWeek from './CalendarWeek'

import '../../styles/PlanningStudent.css'

export default function Planning() {

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className='planning-container'>
      <div className='planning-month'>
        <CalendarMonth onDateClick={handleDateClick}/>
      </div>
      <div className='planning-day'>
        <CalendarDay selectedDate={selectedDate}/>
      </div>
      <div className='planning-week'>
        <CalendarWeek />
      </div>
    </div>
  );
}



