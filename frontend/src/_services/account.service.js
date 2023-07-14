import Axios from "./caller.service";
import jwt from 'jwt-decode';

let login = (credentials) => {
    return Axios.post('/login/', credentials);
}

let logout = () => {
    localStorage.removeItem('AuthToken')
    localStorage.removeItem('UserId')
    localStorage.removeItem('UserRole')
}

let isLogged = () => {
    const token = localStorage.getItem('AuthToken');
    return !!token
} 

let saveToken = (token) => { 
    localStorage.setItem('AuthToken', token)
}

let getToken = () => {
    const token = localStorage.getItem('AuthToken');
    return token;
}

let getUserId = () => {
    const tokenData = jwt(getToken());
    return tokenData.id;
}

let getUserRole = () => {
    const tokenData = jwt(getToken());
    return tokenData.aud;
}

let getUserFirstname = () => {
    const tokenData = jwt(getToken());
    return tokenData.prenom;
}

let getUserLastname = () => {
    const tokenData = jwt(getToken());
    return tokenData.nom;
}

export const accountService = {
    login, saveToken, logout, isLogged, getToken, getUserId, getUserRole, getUserLastname, getUserFirstname
}