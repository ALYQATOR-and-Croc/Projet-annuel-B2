import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';

export default function StudentApp() {
  return (
    <div className="StudentApp">
        <Navbar />
        <Outlet />
    </div>
  )
}
