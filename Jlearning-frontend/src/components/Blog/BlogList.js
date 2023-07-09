import React, { useState } from 'react';
import {
    Box, Button, CardContent, Card, Container, Stack, Dialog, DialogTitle
    , DialogContent, SvgIcon, Grid, Divider, CardHeader
} from '@mui/material';
import { BlogTable } from '../../sections/table/blog-table';
import AppInput from '../../components/AppInput/AppInput';
import AppTextArea from '../AppInput/AppTextArea';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';
import AppSelect from '../AppInput/AppSelect';
import { useDispatch } from "react-redux";
import { insertBlog } from '../../redux/blogSlice';
import { toast } from 'react-toastify';
import FileUploader from '../FileUploader';
import AppCheckBox from '../AppInput/AppCheckBox';
import BlogImageDefault from "../../assets/images/blog/blog-default.png";

const BlogList = ({ data, categories }) => {
    const dispatch = useDispatch();
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [blogs, setBlogs] = useState(data);
    const [blogsPagination, setBlogsPagination] = useState(blogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [searchTerm, setSearchTerm] = React.useState({ value: '' });


    const [currentFile, setCurrentFile] = React.useState(null);
    const [previewUrl, setPreviewUrl] = React.useState(null);


    const [disableSubmit, setDisableSubmit] = React.useState(false);

    React.useEffect(() => {
        if (currentFile?.url != undefined) {
            // alert(currentFile?.url);
            setValues(prevValues => ({
                ...prevValues,
                blog_avatar_url: currentFile?.url
            }));
            setDisableSubmit(false);
        }
    }, [currentFile]);


    React.useEffect(() => {
        setBlogs(data);
        setBlogsPagination(data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    }, [data])

    const [values, setValues] = React.useState({
        blog_avatar_url: '',
        blog_category_id: 0,
        created_date: '',
        blog_name: '',
        blog_description: '',
        created_date: new Date(),
        status: false,
    })


    React.useEffect(() => {
        if (isOpenModal === false) {
            setValues({
                blog_avatar_url: '',
                blog_category_id: 0,
                created_date: '',
                blog_name: '',
                blog_description: '',
                created_date: new Date(),
                status: false,
            })
            setPreviewUrl(null);
        }
    }, [isOpenModal])


    const handleChangeValue = (key, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    };


    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    const handlePageChange = (value) => {
        setPage(value);
        setBlogsPagination(blogs.slice(value * rowsPerPage, value * rowsPerPage + rowsPerPage));
    }


    const handleChangeSearchTerm = (key, value) => {

        setSearchTerm({
            [key]: value
        });
    }

    const handleRowsPerPageChange = (event) => {
        setPage(0);
        const rows = event.target.value;
        setRowsPerPage(rows);

        let endIndex = rows;
        if (blogs.length < endIndex) endIndex = blogs.length;
        // console.log(blogs.length);

        setBlogsPagination(blogs.slice(0, endIndex));
    }

    React.useEffect(() => {
        const result = data.filter((blog) => blog.blog_name.toLowerCase().includes(searchTerm.value.toLowerCase()));
        setBlogs(result);
        setPage(0);
        setRowsPerPage(5);

        let endIndex = 5;
        if (result.length < endIndex) endIndex = result.length;

        setBlogsPagination(result.slice(0, endIndex))
    }, [searchTerm.value])

    const handleAddNewBlog = () => {
        setIsOpenModal(true);
    }


    const handleClearSearch = () => {
        setSearchTerm({
            value: ''
        });
    }

    const handleSubmit = () => {

        if (values.blog_name.trim() === '') {
            toast.warning("Chưa nhập tiêu đề tin tức");
            return;
        }

        if (values.blog_category_id === 0) {
            toast.warning("Chưa chọn loại tin tức");
            return;
        }


        if (values.blog_description.trim() === '') {
            toast.warning("Chưa nhập mô tả");
            return;
        }

        if (values.blog_avatar_url === '') {
            toast.warning("Chưa chọn ảnh tin tức");
            return;
        }



        dispatch(insertBlog(values));
        setIsOpenModal(false);
    }
    return (
        <>

            <Box
                className='ml-72'
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 0
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Card sx={{ p: 2, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}>
                            <div className='flex flex-row justify-between' >
                                <Stack direction={"row"} spacing={2}>
                                    <div className="w-96 ">
                                        <AppInput value={searchTerm.value} handleChangeValue={handleChangeSearchTerm} placeholder={"Tìm kiếm tin tức"} title={"value"} />
                                    </div>
                                    {searchTerm.value != '' ? <Button
                                        onClick={handleClearSearch}
                                        variant='contained' size='medium' color='error' >
                                        Xóa
                                    </Button> : <></>}
                                </Stack>
                                <Button onClick={handleAddNewBlog} variant='contained' color='primary'>
                                    <SvgIcon sx={{ mr: 1 }}>
                                        <PlusIcon />
                                    </SvgIcon>
                                    Thêm tin tức
                                </Button>
                            </div>
                        </Card>
                        {blogs?.length > 0 ? <BlogTable
                            count={blogs?.length}
                            items={blogsPagination}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            categories={categories}
                        /> : <>

                            <Card sx={{ p: 2, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;", height: 525 }}>
                                <CardContent  >
                                    <div className='mt-[200px] text-center w-full h-full font-bold text-xl' >
                                        Không tìm thấy kết quả
                                    </div>
                                </CardContent>

                            </Card>
                        </>}

                    </Stack>
                </Container>
            </Box>


            <Dialog maxWidth="lg" fullWidth open={isOpenModal} onClose={handleCloseModal}>
                <DialogTitle >THÊM MỚI TIN TỨC</DialogTitle>
                <DialogContent sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }} dividers>
                    <Container className='mt-10' maxWidth="lg" sx={{ height: 450 }}>
                        <Stack direction={"column"} spacing={3}>

                            <div>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        xs={12}
                                        md={6}
                                        lg={4}
                                    >
                                        <div style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }} className="relative  flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                            <div className="relative mx-4  -mt-6 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                                                <img
                                                    src={previewUrl == null ? BlogImageDefault : previewUrl}
                                                    alt="img-blur-shadow"

                                                />
                                            </div>
                                            <Divider className='h-4' />
                                            <FileUploader
                                                id={"upload-blog-image"}
                                                setDisableSubmit={setDisableSubmit}
                                                setCurrentFile={setCurrentFile}
                                                firebaseFolderName={"blog/images"} setPreviewUrl={setPreviewUrl} />
                                        </div>

                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                        lg={8}
                                    >
                                        <Card sx={{ ml: 3, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }} >

                                            <CardHeader title="Tin tức" />
                                            <CardContent className='h-[330px]' sx={{ pb: 5 }} >
                                                <Stack direction={"column"} spacing={2}>
                                                    <Stack direction={"row"} spacing={2}>
                                                        <AppInput height={""} value={values?.blog_name} title={"blog_name"} handleChangeValue={handleChangeValue} placeholder={"Tiêu đề tin tức"} />
                                                        <AppCheckBox value={values?.status} title={"status"} handleChangeValue={handleChangeValue} placeholder={"Công khai"} />

                                                    </Stack>
                                                    <Stack direction={"row"} spacing={2}>
                                                        <AppSelect value={values.blog_category_id} data={categories} title={"blog_category_id"} display={"name"} placeholder={"Chọn loại tin tức"} handleChangeValue={handleChangeValue} />

                                                    </Stack>
                                                    <Stack direction={"row"} spacing={2}>
                                                        <AppTextArea height={"h-[150px]"} value={values?.blog_description} title={"blog_description"} handleChangeValue={handleChangeValue} placeholder={"Mô tả tin tức"} />

                                                    </Stack>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className='w-full flex justify-end'>
                                <div className='w-[320px] flex justify-between'>
                                    <Button disabled={disableSubmit} color='error' variant="contained" className=' w-[150px]' onClick={handleCloseModal}>

                                        <SvgIcon className='mr-2'>
                                            <XMarkIcon />
                                        </SvgIcon> Hủy
                                    </Button>
                                    <Button disabled={disableSubmit} onClick={handleSubmit} color='primary' variant="contained" className='w-[150px] ml-3'>
                                        <SvgIcon className='mr-2'>
                                            <HandThumbUpIcon />
                                        </SvgIcon> Lưu
                                    </Button>
                                </div>
                            </div>
                        </Stack>
                    </Container>
                </DialogContent>

            </Dialog>
        </>
    );
};


export default BlogList;
