import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserApp from '../UserApp'
import StudentDashboard from './StudentDashboard'
import StudentPlanning from './StudentPlanning'
import AbsenceDelayStudent from './AbsenceDelayStudent'
import Notfound from '../Notfound'

export default function RouteurStudent() {
  return (
    <Routes>
        <Route element={<UserApp userType = 'student'/>}>
            <Route index element={<StudentDashboard/>} />
            <Route path="dashboard" element={<StudentDashboard/>} />
            <Route path="planning" element={<StudentPlanning/>} />
            <Route path="absence-delay" element={<AbsenceDelayStudent/>} />
            <Route path="*" element={<Notfound/>} />
        </Route>
    </Routes>
  )
}
