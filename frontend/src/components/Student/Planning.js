import React from 'react';
import CalendarDay from './CalendarDay';
import CalendarMonth from './CalendarMonth';
import CalendarWeek from './CalendarWeek'

import '../../styles/PlanningStudent.css'

export default function Planning() {
  return (
    <div className='planning-container'>
      <div className='planning-month'>
        <CalendarMonth />
      </div>
      <div className='planning-day'>
        <CalendarDay />
      </div>
      <div className='planning-week'>
        <CalendarWeek />
      </div>
    </div>
  );
}



