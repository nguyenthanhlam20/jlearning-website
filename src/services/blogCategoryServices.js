import { API } from "../constants";
import axios from "axios";

const blogCategoryServices = {
    getBlogCategories: async () => {
        const response = await axios.get(API.MANAGE_BLOG_CATEGORY + "/get");
        console.log("get-blog-categories", response);
        return response.data;
    },
    insertBlogCategory: async (category) => {
        const response = await axios.post(API.MANAGE_BLOG_CATEGORY + "/insert", category);
        return response.data;
    },
    updateBlogCategory: async (category) => {
        const response = await axios.post(API.MANAGE_BLOG_CATEGORY + "/insert", category);
        return response.data;
    },
    deleteBlogCategory: async (category) => {
        const response = await axios.post(API.MANAGE_BLOG_CATEGORY + "/delete", category);
        return response.data;
    },
};

export default blogCategoryServices;
