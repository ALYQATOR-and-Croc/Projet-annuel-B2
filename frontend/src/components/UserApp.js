import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';

export default function UserApp(props) {
  
  return (
    <div className="UserApp">
        <Navbar userType = {props.userType}/>
        <Outlet />
    </div>
  )
}
