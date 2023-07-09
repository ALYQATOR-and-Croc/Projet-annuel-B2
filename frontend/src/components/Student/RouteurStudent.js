import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserApp from '../UserApp'
import StudentDashboard from './StudentDashboard'
import StudentPlanning from './StudentPlanning'
import AbsenceDelayStudent from './AbsenceDelayStudent'
import Notfound from '../Notfound'
import ChangePassword from '../ChangePassword'
import { accountService } from '../../_services/account.service';

export default function RouteurStudent() {

  const idUser = accountService.getUserId();

  return (
    <Routes>
        <Route element={<UserApp userType = 'student'/>}>
            <Route index element={<StudentDashboard idUser = {idUser}/>} />
            <Route path="dashboard" element={<StudentDashboard idUser = {idUser}/>} />
            <Route path="planning" element={<StudentPlanning idUser = {idUser}/>} />
            <Route path="absence-delay" element={<AbsenceDelayStudent idUser = {idUser}/>} />
            <Route path="change-password" element={<ChangePassword idUser = {idUser}/>} />
            <Route path="*" element={<Notfound/>} />
        </Route>
    </Routes>
  )
}
