import { accountService } from "./account.service";
import Axios from "./caller.service";

let studentList = (idCours) => {
    return Axios.get(`/courses/course/${idCours}/page/students/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

export const courseService = {
    studentList
}