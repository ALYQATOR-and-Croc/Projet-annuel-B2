import React, { useState } from 'react';
//import CalendarDay from './CalendarDay';
import CalendarMonth from '../CalendarMonth';
import CalendarWeek from '../CalendarWeek'

import '../../styles/ColorCalendar.css'

export default function TeacherPlanning() {

  const [SelectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className='planning-container'>
      <div className='planning-month'>
        <CalendarMonth onDateClick={handleDateClick}/>
      </div>
      <div className='planning-week'>
        <CalendarWeek SelectedDate={SelectedDate}/>
      </div>
    </div>
  );
}