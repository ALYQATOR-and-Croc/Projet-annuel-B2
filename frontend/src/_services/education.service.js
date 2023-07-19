import { accountService } from "./account.service";
import Axios from "./caller.service";

let teachersList = () => {
    return Axios.get(`/roles/intervenant/page/1/rows/1000/order/NOM/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let apList = () => {
    return Axios.get(`/roles/attache_promo/page/1/rows/1000/order/NOM/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let rpList = () => {
    return Axios.get(`/roles/responsable_pedago/page/1/rows/1000/order/NOM/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let reproList = () => {
    return Axios.get(`/roles/reprographes/page/1/rows/1000/order/PRENOM/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let promotionsList = () => {
    return Axios.get(`/promotions/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let classesList = () => {
    return Axios.get(`/classes/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let studentsFromClassList = (idClasse) => {
    return Axios.get(`/class/${idClasse}/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let matieresList = () => {
    return Axios.get(`/matieres/page/1/rows/1000/order/LIBELLE/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

// let saveRoom = (roomData) => {
//     return Axios.post(`/room/new/`, roomData,
//     { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
//     );
// }

// let changeCampus = (idCampus, campusData) => {
//     return Axios.patch(`/campus/${idCampus}/`, campusData,
//     { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
//     );
// }

// let changeRoom = (idRoom, roomData) => {
//     return Axios.patch(`/room/${idRoom}/`, roomData,
//     { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
//     );
// }

export const educationService = {
    teachersList, matieresList, promotionsList, reproList, apList, rpList, classesList, studentsFromClassList
}