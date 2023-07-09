import Axios from "./caller.service";

let login = (credentials) => {
    return Axios.post('/login/', credentials);
}

let logout = () => {
    localStorage.removeItem('AuthToken')
}

let isLogged = () => {
    let token = localStorage.getItem('AuthToken');
    return !!token
} 

let saveToken = (token) => { 
    localStorage.setItem('AuthToken', token)
}

let saveUserId = (id) => {
    localStorage.setItem('UserId', id)
}

let getToken = () => {
    let token = localStorage.getItem('AuthToken');
    return token;
}

let getUserId = () => {
    let UserId = localStorage.getItem('UserId');
    return UserId;
}

export const accountService = {
    login, saveToken, logout, isLogged, getToken, saveUserId, getUserId
}