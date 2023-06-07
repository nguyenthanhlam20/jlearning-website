import { useLocation, useNavigate } from "react-router-dom";
import AdminBlogDetails from "./AdminBlogDetails";
import { ROUTE_CONSTANTS } from "../../../constants/route.constants";
import { getBlogById } from "../../../redux/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getCourses } from "../../../redux/courseSlice";
import { getBlogCategories } from "../../../redux/blogCategorySlice";

const AdminBlogDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = new URLSearchParams(location.search);
    const blog_id = params.get('blog_id');
    React.useEffect(() => {
        if (blog_id === null || blog_id === '') {
            navigate(ROUTE_CONSTANTS.ERROR_PAGE);
        }
    }, [blog_id]);

    const blog = useSelector((state) => state.blog.specific);

    const isRefreshSpecific = useSelector((state) => state.blog.isRefreshSpecific);

    const categories = useSelector((state) => state.blogCategory.data);

    React.useEffect(() => {
        dispatch(getBlogById({blog_id: blog_id}));
    }, [isRefreshSpecific])

    React.useEffect(() => {
        dispatch(getBlogCategories());
    }, [])


   console.log(blog);

    return <>
        <AdminBlogDetails blog={blog} categories={categories} />
    </>;
}

export default AdminBlogDetailsPage;