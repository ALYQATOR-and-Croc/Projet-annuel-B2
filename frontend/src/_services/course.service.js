import { accountService } from "./account.service";
import Axios from "./caller.service";

let studentList = (idCours) => {
    return Axios.get(`/courses/course/${idCours}/page/students/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let sendPresence = (presenceList) => {
    return Axios.put(`/course/presences/`, presenceList,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

let getPresence = (idStudent) => {
    return Axios.get(`/course/presences/student/${idStudent}/`,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}
let setPresence = (idPresence, value) => {
    return Axios.patch(`/course/presence/${idPresence}/`, value,
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}
export const courseService = {
    studentList, sendPresence, getPresence, setPresence
}