import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserApp from '../UserApp'
import Notfound from '../Notfound'
import ChangePassword from '../ChangePassword'
import { accountService } from '../../_services/account.service';
import ReproDashboard from './ReproDashboard'
import ReproAppel from './ReproAppel'

export default function RouteurAp() {

  const idUser = accountService.getUserId(); 

  return (
    <Routes>
        <Route element={<UserApp userType = 'repro'/>}>
            <Route index element={<ReproDashboard idUser = {idUser}/>} />
            <Route path="dashboard" element={<ReproDashboard idUser = {idUser}/>} />
            <Route path="appel" element={<ReproAppel idUser = {idUser}/>} />
            <Route path="change-password" element={<ChangePassword idUser = {idUser}/>} />
            <Route path="*" element={<Notfound/>} />
        </Route>
    </Routes>
    )
}