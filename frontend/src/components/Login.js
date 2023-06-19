import '../styles/Login.css';
import logo from '../assets/logo_emargis.png';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';


function Login() {

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();

    };

    return(<div className="loginContainer">
                <div className="emargisTitle">
                    <img className="logoEmargis" src={logo} alt="Logo Emargis"/>
                    <h1 className="textEmargis">Emargis</h1>
                </div>
                <form className='formContainer'>
                    <h3>Connexion</h3>
                    {/* email */}
                    <div className='loginInput'>
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Adresse Email</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type='mail'
                                sx={{
                                    ':before': { borderBottomColor: 'text.secondary' }
                                  }}
                                endAdornment={
                                    <InputAdornment position="end" sx={{pr:1, color: 'text.secondary'}}>
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                        />
                        </FormControl>
                    </div>
                    {/* mdp */}
                    <div className='loginInput'>
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Mot de passe</InputLabel>
                            <Input
                                id="standard-adornment-password"
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
                            />
                        </FormControl>
                    </div>
                    {/* bouton */}
                    <div className='loginButton'>
                        <Button variant="contained">Se connecter</Button>
                    </div>
                </form>
            </div>);
}

export default Login;