import axios from "axios";

import { getToken } from "./auth";

const token = getToken();

const api = axios.create({
    baseURL: "https://tcc-webpet-back.herokuapp.com",
    //baseURL: "http://localhost:3333",
    headers: { Authorization: `Bearer ${token}` },
});

export default api;
