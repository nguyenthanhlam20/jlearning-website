import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from "../../../redux/blogSlice";
import userSlice from "../../../redux/userSlice";
import BlogList from "../../../components/Blog/BlogList";
import { getBlogCategories } from "../../../redux/blogCategorySlice";
const AdminBlogPage = () => {

  const dispatch = useDispatch();
  const isRefresh = useSelector((state) => state.blog.isRefresh);
  const blogs = useSelector((state) => state.blog.data);
  const categories = useSelector((state) => state.blogCategory.data);

  const { setCurrentPage } = userSlice.actions;
  React.useEffect(() => {
    dispatch(setCurrentPage("Quản lý tin tức"));
  }, [])

  React.useEffect(() => {
    dispatch(getBlogCategories());
  }, []);


  React.useEffect(() => {
    dispatch(getBlogs());
  }, [isRefresh]);

  return <>
    <BlogList data={blogs} categories={categories} />
  </>
}

export default AdminBlogPage;