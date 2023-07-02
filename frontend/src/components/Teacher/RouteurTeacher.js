import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserApp from '../UserApp'
import Notfound from '../Notfound'
import RegisterStudents from './RegisterStudents'
import TeacherDashboard from './TeacherDashboard'
import ChangePassword from '../ChangePassword'

export default function RouteurTeacher() {
  return (
    <Routes>
        <Route element={<UserApp userType = 'teacher'/>}>
            <Route index element={<TeacherDashboard/>} />
            <Route path="dashboard" element={<TeacherDashboard/>} />
            <Route path="register-students" element={<RegisterStudents/>} />
            <Route path="change-password" element={<ChangePassword/>} />
            {/* <Route path="planning" element={<TeacherPlanning/>} /> */}
            <Route path="*" element={<Notfound/>} />
        </Route>
    </Routes>
  )
}
