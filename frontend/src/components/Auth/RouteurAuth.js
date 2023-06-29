import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../Login'
import Notfound from '../Notfound'

export default function RouteurAuth() {
  return (
    <Routes>
        <Route index element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<Notfound/>} />
    </Routes>
  )
}
