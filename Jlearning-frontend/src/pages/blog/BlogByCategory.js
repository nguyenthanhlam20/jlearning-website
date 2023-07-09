import Carousel from "react-material-ui-carousel";
import React, { useRef } from "react";
import SectionTitle from "../../components/Common/SectionTitle";
import SingleBlog from "../../components/Blog/SingleBlog";
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';

import { ROUTE_CONSTANTS } from "../../constants/route.constants";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import AppSelect from "../../components/AppInput/AppSelect";
import { useDispatch } from "react-redux";
import ScrollUp from "../../components/Common/ScrollUp";
const BlogByCategory = ({ data, categories }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const params = new URLSearchParams(location.search);
    const blog_category_id = params.get('blog_category_id');
    const [currentCategory, setCurrentCategory] = React.useState(0);
    const [blogs, setBlogs] = React.useState(data);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageList, setPageList] = React.useState([]);
    const [totalPage, setTotalPage] = React.useState(0);
    const [totalBlog, setTotalBlog] = React.useState(0);


    React.useEffect(() => {
        setCurrentPage(3);
        if (currentCategory === 0) {
            setBlogs(data);
        } else {
            setBlogs(data.filter((b) => b.blog_category_id === currentCategory));
            // window.alert("go hee", currentCategory);
        }


    }, [currentCategory])


    React.useEffect(() => {
        if (blog_category_id !== null && blog_category_id !== undefined && blog_category_id.trim() != '') {
            setCurrentCategory(parseInt(blog_category_id));
        }
    }, [blog_category_id]);


    React.useEffect(() => {
        const totalBlog = blogs.length;
        let totalPage = Math.floor(totalBlog / 3);
        let pageList = [];
        if (Math.floor(totalBlog % 3) != 0) totalPage += 1;

        for (let i = 0; i < totalPage; i++) {
            pageList.push(i);
        }

        setTotalPage(totalPage);
        setTotalBlog(totalBlog);
        setPageList(pageList);
        setCurrentPage(1);
    }, [blogs]);


    const handleAction = (id) => {
        navigate(ROUTE_CONSTANTS.BLOG_DETAILS_PAGE + "?blog_id=" + id);
    }


    const handleChangeValue = (value) => {
        setCurrentCategory(value);
    }
    // window.alert(currentPage);

    return (
        <>
            <ScrollUp />
            <section id="blog" className="bg-primary/5 py-16 md:py-20 lg:py-28 h-full">
                <div className="container">
                    <SectionTitle
                        title="Tin Tức"
                        paragraph="Chia sẻ kinh nghiệm học tập, văn hóa Nhật Bản"
                        center
                        mb="50px"
                    />
                    <Stack direction={"column"} spacing={4}>
                        <div className="ml-[80px] mb-[25px] w-[380px]">
                            {categories?.length > 0 ? <FormControl fullWidth>
                                <InputLabel sx={{ p: 0, m: 0 }} id="demo-simple-select-label">{"Chọn loại tin tức"}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label={"Chọn loại tin tức"}
                                    value={currentCategory}
                                    onChange={(e) => handleChangeValue(e.target.value)}
                                >
                                    {categories?.map((item, key) => {
                                        return <MenuItem key={key} value={item?.blog_category_id}>{item?.name}</MenuItem>
                                    })}
                                    ?
                                </Select>
                            </FormControl> : <></>}
                        </div>
                        <div className="relative  w-full pl-20 pr-20" >
                            <Carousel
                                indicators={totalPage > 1 ? true : false}
                                autoPlay={true}
                                animation="slide"
                                navButtonsAlwaysInvisible
                                interval={7000}
                                index={currentPage - 1}
                                className="h-[700px]"
                            >
                                {pageList.map((pageNumber, key) => {

                                    let startIndex = pageNumber * 3;
                                    let endIndex = startIndex + 3;
                                    if (endIndex > totalBlog) endIndex = totalBlog;

                                    return <div

                                        key={"item-" + key} className={` w-full h-full duration-700 ease-in-out grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3 `}>
                                        {blogs.slice(startIndex, endIndex).map((blog) => (
                                            <div id={pageNumber} className="w-full h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}>
                                                <SingleBlog categories={categories} actionTitle={"Xem chi tiết"} icon={<EyeIcon />} handleAction={handleAction} blog={blog} />
                                            </div>
                                        ))}
                                    </div>

                                })}
                            </Carousel>
                            <div className={`${totalPage > 1 ? "block" : "hidden"}`} >
                                <button onClick={() => {
                                    if (currentPage > 1) {
                                        setCurrentPage(currentPage - 1);
                                    } else {
                                        setCurrentPage(totalPage);
                                    }
                                }} type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">

                                    <span className="animate-bounce inline-flex bg-primary items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                                        <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                        <span className="sr-only">Previous</span>
                                    </span>
                                </button>
                                <button type="button" onClick={() => {
                                    if (currentPage < totalPage) {
                                        setCurrentPage(currentPage + 1);
                                    } else {
                                        setCurrentPage(1);
                                    }
                                }} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" >
                                    <span className="animate-bounce inline-flex bg-primary items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                                        <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                        <span className="sr-only">Next</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </Stack>
                </div>
            </section>
        </>

    );
};

export default BlogByCategory;
