import axios from "axios"
import authHeader from "./auth-header"

const API_URL = "/userposts";

const getAllPosts = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const postService = {
    getAllPosts,
}

export default postService;