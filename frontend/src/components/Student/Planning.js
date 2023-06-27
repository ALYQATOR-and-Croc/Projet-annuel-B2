import React from 'react';
import CalendarDay from './CalendarDay';
import CalendarMonth from './CalendarMonth';
import CalendarWeek from './CalendarWeek'

const week = {
  height: "95%",
  width: "95%",
  float: 'left',
  margin: "40px"
};
const day = {
  height: "45%",
  width: "45%",
  float: 'right',
  margin: "40px"
};
const month = {
  height: "45%",
  width: "45%",
  float: 'left',
  margin: "40px"
};
export default function Planning() {
  return (
    <div className='planning'>
      <div style={month}><CalendarMonth/></div>
      <div style={day}><CalendarDay/></div>
      <div style={week}><CalendarWeek/></div>
    </div>
  )
}

