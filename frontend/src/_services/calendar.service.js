import { accountService } from "./account.service";
import Axios from "./caller.service";

let month = (idUser) => {
    let actualDate = new Date();
    let startDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), 1, 2, 0, 0).toISOString();
    let nbDays = 31;
    return Axios.get(`/courses/page/user/${idUser}/start-date/${startDate}/number-of-days/${nbDays}/`, 
    { headers: {"Authorization" : `Bearer ${accountService.getToken()}`}}
    );
}

export const calendarService = {
    month
}