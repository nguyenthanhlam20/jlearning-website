import React, { useCallback, useState } from 'react';
import {
    Box, Button, CardContent, Card, Container, Stack, Dialog, DialogTitle
    , DialogContent, Divider, CardHeader, SvgIcon, Grid
} from '@mui/material';
import { CourseTable } from '../../sections/table/course-table';
import AppInput from '../../components/AppInput/AppInput';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useDispatch } from 'react-redux';
import { insertCourse, updateCourse } from '../../redux/courseSlice';
import { ACTION_TYPE } from '../../constants/constants';
import AppTextArea from '../AppInput/AppTextArea';

import { CourseProfileDetails } from "../../components/Course/CourseProfileDetails";
import FileUploader from '../../components/FileUploader';
import CourseImageDefault from "../../assets/images/course/course-default.png";
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';
import userSlice from '../../redux/userSlice';
import { toast } from 'react-toastify';

const ListCourse = ({ data }) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [courses, setCourses] = useState(data);
    const [coursesPagination, setCoursesPagination] = useState(courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [searchTerm, setSearchTerm] = React.useState({ value: '' });
    const [currentFile, setCurrentFile] = React.useState(null);
    const [previewUrl, setPreviewUrl] = React.useState(null);


    const [disableSubmit, setDisableSubmit] = React.useState(false);

    const [values, setValues] = useState({
        course_name: '',
        description: '',
        duration: '0',
        price: '0',
        status: false,
        avatar_url: '',
        created_at: '',
    });
    React.useEffect(() => {
        if (currentFile?.url != undefined) {
            // alert(currentFile?.url);
            setValues(prevValues => ({
                ...prevValues,
                avatar_url: currentFile?.url
            }));
            setDisableSubmit(false);
        }
    }, [currentFile]);


    const { setCurrentPage } = userSlice.actions;

    React.useEffect(() => {
        dispatch(setCurrentPage("Quản lý khóa học"));
    }, [])

    // console.log(data);
    React.useEffect(() => {
        setCourses(data);
        setCoursesPagination(data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    }, [data]);

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    const handlePageChange = (value) => {
        setPage(value);
        setCoursesPagination(courses.slice(value * rowsPerPage, value * rowsPerPage + rowsPerPage));
    }

    const handleChangeValue = (key, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    };

    const handleSubmitCourse = () => {

        if (values.course_name.trim() === '') {
            toast.warning("Chưa nhập tên khóa học");
            return;
        }

        if (values.duration.trim() === '' || parseInt(values.duration.trim()) === 0) {
            toast.warning("Chưa thời gian học");
            return;
        }
        if (values.price.trim() === '') {
            toast.warning("Chưa nhập giá tiền");
            return;
        }

        if (values.description.trim() === '') {
            toast.warning("Chưa nhập giá tiền");
            return;
        }
        if (values.avatar_url.trim() === '') {
            toast.warning("Chưa chọn ảnh khóa học");
            return;
        }

        const currentDate = new Date().toLocaleDateString();

        dispatch(insertCourse({
            ...values,
            created_at: currentDate
        }));
        setValues({
            course_name: '',
            description: '',
            duration: 0,
            price: 0,
            status: false,
            avatar_url: '',
            created_at: '',

        })

        setPreviewUrl(null);
        setIsOpenModal(false);
        // console.log(values);
    }



    const handleChangeSearchTerm = (key, value) => {

        setSearchTerm({
            [key]: value
        });
    }

    const handleRowsPerPageChange = (event) => {
        const rows = event.target.value;
        setPage(0);
        setRowsPerPage(rows);

        let endIndex = rowsPerPage;
        if (courses.length < endIndex) endIndex = courses.length;


        setCoursesPagination(courses.slice(0, endIndex));
    }
    React.useEffect(() => {
        const result = data.filter((course) => course?.course_name.toLowerCase().includes(searchTerm.value.toLowerCase()));
        setCourses(result);
        setPage(0);
        setRowsPerPage(5);

        let endIndex = 5;
        if (result.length < endIndex) endIndex = result.length;

        setCoursesPagination(result.slice(0, endIndex))
    }, [searchTerm.value])


    const handleClearSearch = () => {
        setSearchTerm({
            value: ''
        });
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
                            <div className='flex flex-row justify-between'>
                                <Stack direction={"row"} spacing={2}>
                                    <div className="w-96 ">
                                        <AppInput value={searchTerm.value} handleChangeValue={handleChangeSearchTerm} placeholder={"Tìm kiếm khóa học"} title={"value"} />
                                    </div>
                                    {searchTerm.value != '' ? <Button
                                        onClick={handleClearSearch}
                                        variant='contained' size='medium' color='error' >
                                        Xóa
                                    </Button> : <></>}
                                </Stack>
                                <Button onClick={() => {
                                    setIsOpenModal(true);

                                }} variant='contained' color='primary'>
                                    <SvgIcon sx={{ mr: 1 }}>
                                        <PlusIcon />
                                    </SvgIcon>
                                    Thêm mới khóa học
                                </Button>
                            </div>
                        </Card>
                        {courses.length > 0 ? <CourseTable
                            count={courses.length}
                            items={coursesPagination}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}

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


            <Dialog maxWidth open={isOpenModal} onClose={handleCloseModal}>
                <DialogTitle >THÊM MỚI KHÓA HỌC</DialogTitle>
                <DialogContent sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }} dividers>
                    <Container className='mt-10' maxWidth="lg" sx={{ height: 450 }}>
                        <Stack spacing={3}>

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
                                                    src={previewUrl == null ? CourseImageDefault : previewUrl}
                                                    alt="img-blur-shadow"

                                                />
                                            </div>
                                            <Divider className='h-4' />
                                            <FileUploader
                                                setDisableSubmit={setDisableSubmit}
                                                setCurrentFile={setCurrentFile}
                                                firebaseFolderName={"course/images"} setPreviewUrl={setPreviewUrl} />
                                        </div>

                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                        lg={8}
                                    >
                                        <CourseProfileDetails handleChangeValue={handleChangeValue} values={values} />
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
                                    <Button disabled={disableSubmit} onClick={handleSubmitCourse} color='primary' variant="contained" className='w-[150px] ml-3'>
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


export default ListCourse;
