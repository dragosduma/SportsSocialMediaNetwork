import axios from "axios"
import authHeader from "./auth-header"

const API_URL = "/users";

const getAllUsers = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const createUser = (firstName, lastName, phoneNumber, email, password) => {
    return axios.post(API_URL, {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
    }
    )
}

const userService = {
    getAllUsers,
    createUser
}

export default userService;