import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StudentApp from './StudentApp'
import Dashboard from './Dashboard'
import Planning from './Planning'
import Notfound from '../Notfound'

export default function RouteurStudent() {
  return (
    <Routes>
        <Route element={<StudentApp/>}>
            <Route index element={<Dashboard/>} />
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="planning" element={<Planning/>} />
            <Route path="*" element={<Notfound/>} />
        </Route>
    </Routes>
  )
}
