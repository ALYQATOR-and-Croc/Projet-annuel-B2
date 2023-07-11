import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserApp from '../UserApp'
import ApDashboard from './ApDashboard'
import Notfound from '../Notfound'
import ChangePassword from '../ChangePassword'
import { accountService } from '../../_services/account.service';

export default function RouteurAp() {

  const idUser = accountService.getUserId();

  return (
    <Routes>
        <Route element={<UserApp userType = 'ap'/>}>
            <Route index element={<ApDashboard idUser = {idUser}/>} />
            <Route path="dashboard" element={<ApDashboard idUser = {idUser}/>} />
            <Route path="change-password" element={<ChangePassword idUser = {idUser}/>} />
            <Route path="*" element={<Notfound/>} />
        </Route>
    </Routes>
    )
}