import { API } from "../constants";
import axios from "axios";

const blogServices = {
    getBlogs: async () => {
        const response = await axios.get(API.MANAGE_BLOG + "/get");
        console.log("get-blogs", response);
        return response.data;
    },
    getBlogById: async (blog) => {
        console.log("get-blog-by-id", blog);
        const response = await axios.post(API.MANAGE_BLOG + "/get/by-id", blog);
        console.log("get-blog-by-id-response", response);
        return response.data;
    },
    insertBlog: async (blog) => {
        console.log("insert-blog", blog);
        const response = await axios.post(API.MANAGE_BLOG + "/insert", blog);
        return response.data;
    },
    updateBlog: async (blog) => {
        console.log("update-blog", blog);
        const response = await axios.post(API.MANAGE_BLOG + "/update", blog);
        return response.data;
    },
    deleteBlog: async (blog) => {
        console.log("delete-blog", blog);
        const response = await axios.post(API.MANAGE_BLOG + "/delete", blog);
        return response.data;
    },
};

export default blogServices;
