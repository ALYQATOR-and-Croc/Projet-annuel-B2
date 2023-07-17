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

let schoolsUser = () => {
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

export const infraService = {
    campusList, roomsList, schoolsUser, saveSchool, saveRoom, saveCampus
}