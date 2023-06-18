import logo from '../assets/logo.svg';
import '../styles/App.css';
import Login from './Login';
import { useState, useEffect, Component } from 'react';
import emargisTheme from '../emargisTheme';
import { ThemeProvider } from '@mui/material/styles';


function App() {
  const [loginActive, setLogin] = useState(false);

  return !loginActive ? (
    <ThemeProvider theme={emargisTheme}><Login /></ThemeProvider>
    
  ) : (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App;
