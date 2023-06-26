import '../styles/Login.css';
import logo from '../assets/logo_emargis.png';
import * as React from 'react';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from './Auth/account.service';


function Login() {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        login : '',
        password : ''
    });
    const userFormInput = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    const userFormSubmit = (e) => {
        e.preventDefault();
        console.log(credentials);
        axios.post('http://localhost:5000/login/', credentials)
            .then(res => {
                console.log(res)
                accountService.saveToken(res.data.accessToken);
                navigate('/student')  
            })
            .catch(error => {console.log(error)})
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();

    };

    return(<div className="Login"><div className="loginContainer">
                <div className="emargisTitle">
                    <img className="logoEmargis" src={logo} alt="Logo Emargis"/>
                    <h1 className="textEmargis">Emargis</h1>
                </div>
                <form className='formContainer' onSubmit={userFormSubmit}>
                    <h3>Connexion</h3>
                    {/* email */}
                    <div className='loginInput'>
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Adresse Email</InputLabel>
                            <Input
                                type='mail'
                                sx={{
                                    ':before': { borderBottomColor: 'text.secondary' }
                                  }}
                                endAdornment={
                                    <InputAdornment position="end" sx={{pr:1, color: 'text.secondary'}}>
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                                name="login"
                                value={credentials.login}
                                onChange={userFormInput}
                        />
                        </FormControl>
                    </div>
                    {/* mdp */}
                    <div className='loginInput'>
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Mot de passe</InputLabel>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                sx={{
                                    ':before': { borderBottomColor: 'text.secondary' }
                                  }}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    sx={{ color: 'text.secondary' }}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                name="password"
                                value={credentials.password}
                                onChange={userFormInput}
                            />
                        </FormControl>
                    </div>
                    {/* bouton */}
                    <div className='loginButton'>
                        <Button variant="contained" type="submit">Se connecter</Button>
                    </div>
                </form>
            </div></div>);
}

export default Login;