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
    return Axios.get(`/promotions/page/1/rows/1000/order/ANNEE/`, 
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

let savePromo = (promoData) => {
    return Axios.post(`/promotion/new/`, promoData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let saveClasse = (classeData) => {
    return Axios.post(`/class/new/`, classeData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let saveCourse = (newCourseData) => {
    return Axios.post(`/courses/new/`, newCourseData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let saveMatiere = (matiereData) => {
    return Axios.post(`/matiere/new/`, matiereData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let changePromo = (idPromo, promoData) => {
    return Axios.patch(`/promotion/${idPromo}/`, promoData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let removePromo = (idPromo) => {
    return Axios.delete(`/promotion/${idPromo}/`,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let removeMatiere = (idMatiere) => {
    return Axios.delete(`/matiere/${idMatiere}/`,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let changeMatiere = (idMatiere, matiereData) => {
    return Axios.patch(`/matiere/${idMatiere}/`, matiereData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let removeClasse = (idClasse) => {
    return Axios.delete(`/class/${idClasse}/`,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let changeClasse = (idClasse, classeData) => {
    return Axios.patch(`/class/update/${idClasse}/`, classeData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let removeCourse = (idCourse) => {
    return Axios.delete(`/courses/course/${idCourse}/`,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let changeCourse = (idCourse, courseData) => {
    return Axios.patch(`/courses/course/${idCourse}/`, courseData,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

export const educationService = {
    teachersList, matieresList, promotionsList, reproList, apList, rpList, 
    classesList, studentsFromClassList, savePromo, saveClasse, saveCourse, 
    saveMatiere, changePromo, removePromo, changeMatiere, removeMatiere,
    changeClasse, removeClasse, changeCourse, removeCourse, 
}