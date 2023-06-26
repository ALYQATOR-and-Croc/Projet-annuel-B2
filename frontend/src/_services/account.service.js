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

export const accountService = {
    login, saveToken, logout, isLogged
}