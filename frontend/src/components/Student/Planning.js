import React from 'react';
import CalendarDay from './CalendarDay';
import CalendarMonth from './CalendarMonth';
import CalendarWeek from './CalendarWeek'

const week = {
  height: "90%",
  width: "90%"
};
const day = {
  height: "45%",
  width: "45%"
};

export default function Planning() {
  return (
    <div className='planning'>
      <div style={day}><CalendarDay/><CalendarMonth/></div>
      {/* <div style={day}><CalendarMonth/></div> */}
      <div style={week}><CalendarWeek/></div>
    </div>
  )
}

