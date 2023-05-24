import React from "react";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import {
  Box, CardContent, Card, Tabs, Tab, Typography,
} from '@mui/material';
import BlogList from "../../components/Blog/BlogList";
import BlogTable from "../../components/Blog/BlogTable";


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




const AdminBlog = ({ blogData }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  return <div className="ml-72 mt-[20px] mr-[20px] mb-[20px]">
    <Card sx={{ ml: "15px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" }}>
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
              <BlogTable blogs={blogData.filter((blog) => blog.blog_category.toLowerCase() == "Kinh nghiệm học tiếng nhật".toLowerCase())} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <BlogTable blogs={blogData.filter((blog) => blog.blog_category.toLowerCase() == "Văn Hóa Nhật Bản".toLowerCase())} />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <BlogTable blogs={blogData.filter((blog) => blog.blog_category.toLowerCase() == "Tin Tức Sự Kiện".toLowerCase())} />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </CardContent>
    </Card>

  </div>;
}

export default AdminBlog;