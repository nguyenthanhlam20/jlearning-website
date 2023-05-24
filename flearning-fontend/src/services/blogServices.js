import { API } from "../constants";
import axios from "axios";

const blogServices = {
    getBlogs: async () => {
        const response = await axios.get(API.MANAGE_BLOG + "/get");
        return response.data;
    },
    insertBlog: async (blog) => {
        const response = await axios.post(API.MANAGE_BLOG + "/insert", blog);
        return response.data;
    },
    updateBlog: async (blog) => {
        const response = await axios.post(API.MANAGE_BLOG + "/insert", blog);
        return response.data;
    },
    deleteBlog: async (blog) => {
        const response = await axios.post(API.MANAGE_BLOG + "/delete", blog);
        return response.data;
    },
};

export default blogServices;
