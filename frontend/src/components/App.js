import '../styles/App.css';
import Notfound from './Notfound';
// import { useState, useEffect, Component } from 'react';
import emargisTheme from '../emargisTheme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import RouteurIndex from './RouteurIndex';import RouteurStudent from './Student/RouteurStudent';


function App() {

  return (
    <ThemeProvider theme={emargisTheme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<RouteurIndex/>}/>
            <Route path="/student/*" element={<RouteurStudent/>}/>
            
            <Route path="*" element={<Notfound/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App;
