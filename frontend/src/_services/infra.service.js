import { accountService } from "./account.service";
import Axios from "./caller.service";

let campusList = () => {
    return Axios.get(`/campus/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let roomsList = () => {
    return Axios.get(`/rooms/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let schoolsList = () => {
    return Axios.get(`/schools/`,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let saveCampus = (campusData) => {
    return Axios.post(`/campus/new`, campusData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let saveRoom = (roomData) => {
    return Axios.post(`/room/new/`, roomData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let saveSchool = (schoolData) => {
    return Axios.post(`/school/new`, schoolData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let changeCampus = (idCampus, campusData) => {
    return Axios.patch(`/campus/${idCampus}/`, campusData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let changeRoom = (idRoom, roomData) => {
    return Axios.patch(`/room/${idRoom}/`, roomData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let changeSchool = (idSchool, schoolData) => {
    return Axios.patch(`/school/${idSchool}/`, schoolData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let removeCampus = (idCampus) => {
    return Axios.delete(`/campus/${idCampus}/`,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let removeRoom = (idRoom) => {
    return Axios.delete(`/room/${idRoom}/`,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let removeSchool = (idSchool) => {
    return Axios.delete(`/school/${idSchool}/`,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

export const infraService = {
    campusList, roomsList, schoolsList, saveSchool, saveRoom, saveCampus,
    changeCampus, changeRoom, changeSchool, removeCampus, removeRoom, removeSchool
}