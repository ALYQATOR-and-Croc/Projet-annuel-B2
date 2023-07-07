import axios from "axios";
import * as config from '../config.json';

const {API} = config;

const Axios = axios.create({
    baseURL: API
})

export default Axios;