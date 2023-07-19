import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserApp from '../UserApp'
import AdminDashboard from './AdminDashboard'
import Notfound from '../Notfound'
import ChangePassword from '../ChangePassword'
import ChangeUserPassword from './ChangeUserPassword'
import { accountService } from '../../_services/account.service';
import AdminUser from '../AdminUser'
import AdminAbsence from '../AdminAbsence'
import AdminInfra from '../AdminInfra'
import AdminEduc from '../AdminEduc'

export default function RouteurAp() {

  const idUser = accountService.getUserId();

  return (
    <Routes>
        <Route element={<UserApp userType = 'admin'/>}>
            <Route index element={<AdminDashboard idUser = {idUser}/>} />
            <Route path="dashboard" element={<AdminDashboard idUser = {idUser}/>} />
            <Route path="user" element={<AdminUser idUser = {idUser}/>} />
            <Route path="educ" element={<AdminEduc idUser = {idUser}/>} />
            <Route path="absence" element={<AdminAbsence idUser = {idUser}/>} />
            <Route path="infra" element={<AdminInfra idUser = {idUser}/>} />
            <Route path="change-user-password" element={<ChangeUserPassword idUser = {idUser}/>} />
            <Route path="change-password" element={<ChangePassword idUser = {idUser}/>} />
            <Route path="*" element={<Notfound/>} />
        </Route>
    </Routes>
    )
}