import React, { useCallback, useState } from 'react';
import {
    Box, Button, CardContent, Card, Container, Stack, Dialog, DialogTitle
    , DialogContent, SvgIcon
} from '@mui/material';
import { TestTable } from '../../sections/table/test-table';
import AppInput from '../../components/AppInput/AppInput';
import AppTextArea from '../AppInput/AppTextArea';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';
import AppSelect from '../AppInput/AppSelect';
import { useDispatch } from "react-redux";
import { insertTest } from '../../redux/testSlice';
import { toast } from 'react-toastify';
import AppInputNumber from '../AppInput/AppInputNumber';

const ListTest = ({ data, courses }) => {
    const dispatch = useDispatch();
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [tests, setTests] = useState(data);
    const [testsPagination, setTestsPagination] = useState(tests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState();
    const [searchTerm, setSearchTerm] = React.useState({ value: '' });

    React.useEffect(() => {
        setTests(data);
        setTestsPagination(data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    }, [data])

    const [values, setValues] = React.useState({
        test_name: '',
        description: '',
        chapter_id: 0,
        duration: 0,
        course_id: 0,
    })


    React.useEffect(() => {
        if (isOpenModal === false) {
            setValues({
                test_name: '',
                description: '',
                chapter_id: 0,
                duration: 0,
                course_id: 0,
            })
        }
    }, [isOpenModal])

    const handleChangeValue = (key, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    };

    React.useEffect(() => {

        const course = courses.find((c) => c.course_id === values.course_id);
        setSelectedCourse(course);
    }, [values.course_id]);


    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    const handlePageChange = (value) => {
        setPage(value);
        setTestsPagination(tests.slice(value * rowsPerPage, value * rowsPerPage + rowsPerPage));
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
        if (tests.length < endIndex) endIndex = tests.length;
        // console.log(tests.length);

        setTestsPagination(tests.slice(0, endIndex));
    }

    React.useEffect(() => {
        const result = data.filter((test) => test.test_name.toLowerCase().includes(searchTerm.value.toLowerCase()));
        setTests(result);
        setPage(0);
        setRowsPerPage(5);

        let endIndex = 5;
        if (result.length < endIndex) endIndex = result.length;

        setTestsPagination(result.slice(0, endIndex))
    }, [searchTerm.value])

    const handleAddNewTest = () => {
        setIsOpenModal(true);
    }


    const handleClearSearch = () => {
        setSearchTerm({
            value: ''
        });
    }

    const handleSubmit = () => {

        if (values.test_name.trim() === '') {
            toast.warning("Chưa nhập tên bài kiểm tra");
            return;
        }

        if (values.duration === 0) {
            toast.warning("Chưa nhập thời gian");
            return;
        }

        if (values.course_id === 0) {
            toast.warning("Chưa chọn khóa học");
            return;
        }

        if (values.chapter_id === 0) {
            toast.warning("Chưa chọn chương");
            return;
        }

        if (values.description.trim() === '') {
            toast.warning("Chưa nhập mô tả");
            return;
        }

        dispatch(insertTest(values));
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
                                        <AppInput value={searchTerm.value} handleChangeValue={handleChangeSearchTerm} placeholder={"Tìm kiếm bài kiểm tra"} title={"value"} />
                                    </div>
                                    {searchTerm.value != '' ? <Button
                                        onClick={handleClearSearch}
                                        variant='contained' size='medium' color='error' >
                                        Xóa
                                    </Button> : <></>}
                                </Stack>
                                <Button onClick={handleAddNewTest} variant='contained' color='primary'>
                                    <SvgIcon sx={{ mr: 1 }}>
                                        <PlusIcon />
                                    </SvgIcon>
                                    Thêm bài kiểm tra
                                </Button>
                            </div>
                        </Card>
                        {tests.length > 0 ? <TestTable
                            count={tests.length}
                            items={testsPagination}
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


            <Dialog maxWidth="lg" fullWidth open={isOpenModal} onClose={handleCloseModal}>
                <DialogTitle >Thêm mới bài kiểm tra</DialogTitle>
                <DialogContent sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;', p: 0, pb: 2, height: 480, width: "100%" }} dividers>
                    <Stack spacing={3} sx={{ p: 3 }} direction={"row"}>

                        <Card sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;', p: 0, width: "100%", height: 350 }} >

                            <CardContent  >

                                <Stack direction={"column"} spacing={2}>
                                    <Stack direction={"row"} spacing={2}>
                                        <AppInput value={values.test_name} title={"test_name"} placeholder={"Tên bài kiểm tra"} handleChangeValue={handleChangeValue} />
                                        <AppInputNumber value={values.duration} title={"duration"} placeholder={"Thời gian (phút)"} handleChangeValue={handleChangeValue} />
                                    </Stack>
                                    <Stack direction={"row"} spacing={2}>
                                        <AppSelect value={values.course_id} data={courses} title={"course_id"} display={"course_name"} placeholder={"Chọn khóa học"} handleChangeValue={handleChangeValue} />
                                        <AppSelect value={values.chapter_id} data={selectedCourse?.chapters} title={"chapter_id"} display={"chapter_name"} placeholder={"Chọn chương"} handleChangeValue={handleChangeValue} />
                                    </Stack>
                                    <AppTextArea height={"h-[180px]"} title={"description"} value={values.description} handleChangeValue={handleChangeValue} placeholder={"Mô tả bài kiểm tra"} />
                                </Stack>
                            </CardContent>
                        </Card>

                    </Stack>
                    <div className='w-full  flex justify-end pr-6'>
                        <Button variant="contained" sx={{ mr: 2, width: 150 }} title='Hủy' color='error' onClick={handleCloseModal}>
                            <SvgIcon className='mr-1' >
                                <XMarkIcon />
                            </SvgIcon> Hủy
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" sx={{ width: 150 }} className='bg-primary'>
                            <SvgIcon className='mr-1' >
                                <HandThumbUpIcon />
                            </SvgIcon> Gửi
                        </Button>
                    </div>
                </DialogContent>

            </Dialog>
        </>
    );
};


export default ListTest;
