import '../styles/App.css';
import Notfound from './Notfound';
// import { useState, useEffect, Component } from 'react';
import emargisTheme from '../emargisTheme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import RouteurAuth from './Auth/RouteurAuth';
import AuthGuard from './Auth/AuthGuard';
import RouteurStudent from './Student/RouteurStudent';
import RouteurTeacher from './Teacher/RouteurTeacher';
import RouteurAp from './Ap/RouteurAp';
import RouteurRepro from './Repro/RouteurRepro'


function App() {

  return (
    <ThemeProvider theme={emargisTheme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<RouteurAuth/>}/>
            <Route path="/student/*" element={
              <AuthGuard guardType='student'>
                <RouteurStudent/>
              </AuthGuard>
            }/>
            <Route path="/teacher/*" element={
              <AuthGuard guardType='teacher'>
                <RouteurTeacher/>
              </AuthGuard>
            }/>
            <Route path="/ap/*" element={
              <AuthGuard guardType='ap'>
                <RouteurAp/>
              </AuthGuard>
            }/>
            <Route path="/repro/*" element={
              <AuthGuard guardType='repro'>
                <RouteurRepro/>
              </AuthGuard>
            }/>
            <Route path="*" element={<Notfound/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App;
