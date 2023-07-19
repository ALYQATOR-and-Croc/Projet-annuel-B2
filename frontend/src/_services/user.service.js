import { accountService } from "./account.service";
import Axios from "./caller.service";

let rolesList = () => {
    return Axios.get(`/roles/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let studentsList = () => {
    return Axios.get(`/roles/etudiants/page/1/rows/10000/order/NOM/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let allUsersList = () => {
    return Axios.get(`/users/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let adminsList = () => {
    return Axios.get(`/roles/admin/page/1/rows/1000/order/NOM/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let classesList = () => {
    return Axios.get(`/classes/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let saveUser = (userData) => {
    return Axios.post(`/signup/`, userData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let changeUser = (idUser, userData) => {
    return Axios.patch(`/user/${idUser}/`, userData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let removeUser = (idUser) => {
    return Axios.delete(`/user/${idUser}/`,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

export const userService = {
    rolesList, classesList, saveUser, studentsList, adminsList, changeUser, removeUser, allUsersList
}