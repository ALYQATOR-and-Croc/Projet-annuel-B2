import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserApp from '../UserApp'
import Notfound from '../Notfound'
import RegisterStudents from './RegisterStudents'
import TeacherDashboard from './TeacherDashboard'
import ChangePassword from '../ChangePassword'
import TeacherPlanning from './TeacherPlanning'
import { accountService } from '../../_services/account.service';

export default function RouteurTeacher() {

  const idUser = accountService.getUserId();

  return (
    <Routes>
        <Route element={<UserApp userType = 'teacher'/>}>
            <Route index element={<TeacherDashboard idUser = {idUser}/>} />
            <Route path="dashboard" element={<TeacherDashboard idUser = {idUser}/>} />
            <Route path="register-students" element={<RegisterStudents idUser = {idUser}/>} />
            <Route path="change-password" element={<ChangePassword idUser = {idUser}/>} />
            <Route path="planning" element={<TeacherPlanning idUser = {idUser}/>} />
            <Route path="*" element={<Notfound/>} />
        </Route>
    </Routes>
  )
}
