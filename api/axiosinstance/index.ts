import axios from "axios";
import { baseUrl } from "../endpoints";

export const axiosInstance=axios.create({
    baseURL: process.env.NEXT_APP_BASE_URL
})