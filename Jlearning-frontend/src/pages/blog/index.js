import { Card, CardContent, Tab, Tabs, Box, Typography } from "@mui/material";
import SingleBlog from "../../components/Blog/SingleBlog";
import blogData from "../../components/Blog/blogData";
import Breadcrumb from "../../components/Common/Breadcrumb";
import Pagination from "../../components/Pagination";
import React from "react";
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import BlogList from "../../components/Blog/BlogList";
import BlogByCategory from "./BlogByCategory";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../../redux/blogSlice";
import { getBlogCategories } from "../../redux/blogCategorySlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



const BlogPage = () => {

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.data);



  const categories = useSelector((state) => state.blogCategory.data);
  React.useEffect(() => {
    dispatch(getBlogs());
    dispatch(getBlogCategories());
  }, []);

  let newCategories = [];
  newCategories.push({ name: "Tất cả", blog_category_id: 0 })
  for (let i = 0; i < categories.length; i++) {
    newCategories.push(categories[i]);
  }


  return (
    <>
      <Breadcrumb
        pageName="Tin tức"
        description="Cập nhật tin tức khóa học, chia sẻ kinh nghiệp"
      />

      <BlogByCategory categories={newCategories} data={blogs} />
    </>
  );
};

export default BlogPage;
