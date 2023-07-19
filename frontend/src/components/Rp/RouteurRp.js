import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserApp from '../UserApp'
import RpDashboard from './RpDashboard'
import Notfound from '../Notfound'
import ChangePassword from '../ChangePassword'
import { accountService } from '../../_services/account.service';
import AdminUser from '../AdminUser'
import AdminAbsence from '../AdminAbsence'
import AdminEduc from '../AdminEduc'

export default function RouteurAp() {

  const idUser = accountService.getUserId();

  return (
    <Routes>
        <Route element={<UserApp userType = 'rp'/>}>
            <Route index element={<RpDashboard idUser = {idUser}/>} />
            <Route path="dashboard" element={<RpDashboard idUser = {idUser}/>} />
            <Route path="user" element={<AdminUser idUser = {idUser}/>} />
            <Route path="educ" element={<AdminEduc idUser = {idUser}/>} />
            <Route path="absence" element={<AdminAbsence idUser = {idUser}/>} />
            <Route path="change-password" element={<ChangePassword idUser = {idUser}/>} />
            <Route path="*" element={<Notfound/>} />
        </Route>
    </Routes>
    )
}