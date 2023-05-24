
import SingleBlog from "../../components/Blog/SingleBlog";
import Pagination from "../Pagination";
import {
    Button, Stack, SvgIcon
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppInput from "../AppInput/AppInput";
import Carousel from 'react-material-ui-carousel'
import { ROUTE_CONSTANTS } from "../../constants/route.constants";

const BlogList = ({ blogData, enableActionAdd }) => {
    const [data, setBlogData] = React.useState(blogData);
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [searchTerm, setSearchTearm] = React.useState("");
    const handleAction = (id) => {
        navigate(ROUTE_CONSTANTS.BLOG_DETAILS_PAGE);
    }

    const handleChangeValue = (value) => {
        setSearchTearm(value);
    }

    const [currentPage, onPageChange] = React.useState(1);

    const totalBlog = data.length;
    const [totalPage, setTotalPage] = React.useState(0);
    const [pageList, setPagetList] = React.useState([]);

    React.useEffect(() => {
        let totalPage = Math.floor(data.length / 3);
        if (data.length % 3 != 0) totalPage += 1;
        setTotalPage(totalPage);

        let pageList = [];

        for (let i = 0; i < totalPage; i++) {
            pageList.push(i);

        }
        setPagetList(pageList);

    }, [data])

    React.useEffect(() => {
        setBlogData(blogData?.filter((blog) => blog?.title.includes(searchTerm)));
    }, [searchTerm]);


    return <>
        <div className="p-2 pt-3 pb-0">
            <Stack direction="row" className="mt-2 ml-2" justifyContent="space-between">
                <div className="w-96 ">
                    <AppInput placeholder={"Tìm kiếm tin tức"} title={""} handleChangeValue={handleChangeValue} value={searchTerm} />
                </div>
                <div className={`${enableActionAdd == true ? "block" : "hidden"}`} >
                    <Button
                        onClick={() => setIsOpenModal(true)}
                        className='bg-primary'
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <PlusIcon />
                            </SvgIcon>
                        )}
                        variant="contained"
                    >
                        Thêm mới tin tức
                    </Button>
                </div>
            </Stack>
        </div>
        <section className="pt-[10px] pb-[10px]">
            <div className="container mt-3">
                <Carousel
                    indicators={totalPage > 1 ? true : false}
                    autoPlay={false}
                    animation="slide"
                    navButtonsAlwaysInvisible
                    interval={7000}
                    index={currentPage - 1}
                    className="h-[700px]"
                >
                    {pageList.map((pageNumber) => {

                        let startIndex = pageNumber * 3;
                        let endIndex = startIndex + 3;
                        if (endIndex > totalBlog) endIndex = totalBlog;
                        return <div

                            key={"item-" + pageNumber}  className={`  w-full h-full duration-700 ease-in-out grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3 `}>
                            {data.slice(startIndex, endIndex).map((blog) => (
                                <div key={"blog-" + blog.id} id={pageNumber} className="w-full h-full p-2" >
                                    <SingleBlog actionTitle={"Xem chi tiết"} icon={<EyeIcon />} handleAction={handleAction} blog={blog} />
                                </div>
                            ))}
                        </div>

                    })}
                </Carousel>

                <div
                    className="wow fadeInUp flex flex-wrap"
                    data-wow-delay=".15s"
                >
                    <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={onPageChange} />
                </div>
            </div>
        </section></>
}

export default BlogList;