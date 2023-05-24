import React from "react";
import AdminBlog from "../../../components/Blog/AdminBlog";
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from "../../../redux/blogSlice";
import userSlice from "../../../redux/userSlice";
const AdminBlogPage = () => {

  const dispatch = useDispatch();
  const isRefresh = useSelector((state) => state.blog.isRefresh);
  const blogs = useSelector((state) => state.blog.data);


  const { setCurrentPage } = userSlice.actions;
  React.useEffect(() => {
    dispatch(setCurrentPage("Quản lý tin tức"));
  }, [])
  React.useEffect(() => {
    dispatch(getBlogs());
  }, [isRefresh]);

  return <>
    <AdminBlog blogData={blogs} />
  </>
}

export default AdminBlogPage;