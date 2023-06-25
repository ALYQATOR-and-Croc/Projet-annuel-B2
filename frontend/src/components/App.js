import '../styles/App.css';
import Login from './Login';
import Notfound from './Notfound';
import Dashboard from './Dashboard';
// import { useState, useEffect, Component } from 'react';
import emargisTheme from '../emargisTheme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {

  return (
    <ThemeProvider theme={emargisTheme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />

            <Route path="*" element={<Notfound/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App;
