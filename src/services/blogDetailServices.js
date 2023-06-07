import { API } from "../constants";
import axios from "axios";

const blogDetailServices = {
    insertBlogDetail: async (blogDetail) => {
        console.log("insert-blog-details", blogDetail);
        const response = await axios.post(API.MANAGE_BLOG_DETAILS + "/insert", blogDetail);
        return response.data;
    },
    updateBlogDetail: async (blogDetail) => {
        console.log("update-blog-details", blogDetail);
        const response = await axios.post(API.MANAGE_BLOG_DETAILS + "/update", blogDetail);
        return response.data;
    },
    deleteBlogDetail: async (blogDetail) => {
        console.log("delete-blog-details", blogDetail);
        const response = await axios.post(API.MANAGE_BLOG_DETAILS + "/delete", blogDetail);
        return response.data;
    },
};

export default blogDetailServices;
