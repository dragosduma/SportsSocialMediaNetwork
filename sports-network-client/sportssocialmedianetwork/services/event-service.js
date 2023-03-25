import axios from "axios"
import authHeader from "./auth-header"

const API_URL = "/events";

const getAllEvents = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const eventService = {
    getAllEvents,
}

export default eventService;