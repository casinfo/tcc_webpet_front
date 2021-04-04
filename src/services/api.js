import axios from "axios";

import { getToken } from "./auth";

const token = getToken();

const api = axios.create({
    baseURL: "ec2-54-235-108-217.compute-1.amazonaws.com:5432",
    headers: { Authorization: `Bearer ${token}` },
});

export default api;
