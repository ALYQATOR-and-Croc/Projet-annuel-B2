import Axios from "./caller.service";

let login = (credentials) => {
    return Axios.post('/login/', credentials);
}

let logout = () => {
    localStorage.removeItem('AuthToken')
    localStorage.removeItem('UserId')
    localStorage.removeItem('UserRole')
}

let isLogged = () => {
    let token = localStorage.getItem('AuthToken');
    return !!token
} 

let saveToken = (token) => { 
    localStorage.setItem('AuthToken', token)
}

let getToken = () => {
    let token = localStorage.getItem('AuthToken');
    return token;
}

let saveUserId = (id) => {
    localStorage.setItem('UserId', id)
}

let getUserId = () => {
    let UserId = localStorage.getItem('UserId');
    return UserId;
}

let saveUserRole = (role) => {
    localStorage.setItem('UserRole', role)
}

let getUserRole = () => {
    let UserRole = localStorage.getItem('UserRole');
    return UserRole;
}

export const accountService = {
    login, saveToken, logout, isLogged, getToken, saveUserId, getUserId, saveUserRole, getUserRole
}