import { Card, CardContent, Tab,Tabs, Box,Typography } from "@mui/material";
import SingleBlog from "../../components/Blog/SingleBlog";
import blogData from "../../components/Blog/blogData";
import Breadcrumb from "../../components/Common/Breadcrumb";
import Pagination from "../../components/Pagination";
import React from "react";
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import BlogList from "../../components/Blog/BlogList";

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
  return (
    <>
      <Breadcrumb
        pageName="Tin tức"
        description="Cập nhật tin tức khóa học, chia sẻ kinh nghiệp"
      />

      <section className="pl-12 pr-12 pt-6 w-full pb-[120px]">
        <div className="mt-[20px] w-full mr-[20px] mb-[20px]">
          <Card sx={{ ml: "15px", w: "100%", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" }}>
            <CardContent>
              <Box sx={{ width: '100%', }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  centered
                  aria-label="full width tabs example"
                >
                  <Tab label="Kinh nghiệp học tiếng nhật" {...a11yProps(0)} />
                  <Tab label="Văn hóa nhật bản" {...a11yProps(1)} />
                  <Tab label="Tin tức sự kiện" {...a11yProps(2)} />
                </Tabs>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                >
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <BlogList enableActionAdd={false} blogData={blogData.filter((blog) => blog.category.toLowerCase() == "Kinh Nghiệm Học Tiếng Nhật".toLowerCase())} />
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <BlogList enableActionAdd={false} blogData={blogData.filter((blog) => blog.category.toLowerCase() == "Văn Hóa Nhật Bản".toLowerCase())} />
                  </TabPanel>
                  <TabPanel value={value} index={2} dir={theme.direction}>
                    <BlogList enableActionAdd={false} blogData={blogData.filter((blog) => blog.category.toLowerCase() == "Tin Tức Sự Kiện".toLowerCase())} />
                  </TabPanel>
                </SwipeableViews>
              </Box>
            </CardContent>
          </Card>

        </div>
      </section>
    </>
  );
};

export default BlogPage;
