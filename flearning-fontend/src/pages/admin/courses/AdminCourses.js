import { useState } from 'react';
import {
  Box, Button, Container, Stack, Dialog, DialogTitle, Grid
  , DialogContent, Card, CardContent, Divider, SvgIcon
} from '@mui/material';
import { CoursesTable } from '../../../sections/course/courses-table';
import { CourseTopBar } from '../../../sections/course/course-topbar';
import { CourseProfileDetails } from "../../../components/Course/CourseProfileDetails";
import Pagination from "../../../components/Pagination";
import React from "react";
import FileUploader from '../../../components/FileUploader';
import CourseImageDefault from "../../../assets/images/course/course-default.png";
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../../../redux/userSlice';
import { getCourses, insertCourse } from '../../../redux/courseSlice';

const now = new Date();

const AdminCourses = ({courses}) => {
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentPage, onPageChange] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(startIndex + rowsPerPage);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentFile, setCurrentFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const { setCurrentPage } = userSlice.actions;
  const [values, setValues] = useState({
    course_name: '',
    description: '',
    duration: 0,
    price: 0,
    status: false,
    avatar_url: '',
    created_at: '',
  });
  

  const handleCloseModal = () => {
    setIsOpenModal(false);
  }

  React.useEffect(() => {
    dispatch(setCurrentPage("Quản lý khóa học"));
  }, [])


  React.useEffect(() => {
    let startIndex = (currentPage - 1) * rowsPerPage;
    let endIndex = startIndex + rowsPerPage;
    if (endIndex >= courses?.length) endIndex = courses?.length;
    setStartIndex(startIndex);
    setEndIndex(endIndex);
  }, [currentPage]);


  React.useEffect(() => {
    let totalPage = Math.floor(courses?.length / rowsPerPage);
    if (courses?.length % rowsPerPage !== 0) totalPage += 1;
    setTotalPage(totalPage);
    onPageChange(1);
  }, [courses])

  React.useEffect(() => {
    // setCourses(data?.filter((course) => course?.course_name.includes(searchTerm)));
  }, [searchTerm]);

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


  const handleChangeSearchTerm = (title, value) => {
    setSearchTerm(value)
  }

  const [disableSubmit, setDisableSubmit] = React.useState(false);


  const handleChangeValue = (key, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [key]: value
    }));
  };

  const handleSubmitCourse = () => {
    const currentDate = new Date().toLocaleDateString();
    setValues(prevValues => ({
      ...prevValues,
      created_at: currentDate
    }));
    dispatch(insertCourse(values));
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

    console.log(values);
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
          <Stack spacing={3}>
            <Stack
              className='w-full'
              direction="row"
              justifyContent="space-between"
              spacing={1}
            >



            </Stack>
            <CourseTopBar values={{ searchTerm: searchTerm }} handleChangeValue={handleChangeSearchTerm} setIsOpenModal={setIsOpenModal} />

            {courses?.length > 0 ? <>
              <CoursesTable
                count={courses?.length}
                items={courses?.slice(startIndex, endIndex)}
              /></> :

              <Card className='bg-white'>
                <CardContent>
                  Không tìm thấy khóa học
                </CardContent>
              </Card>
            }
          </Stack>
          <Card className={`${courses?.length > 0 ? "block" : "hidden"}`} sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;", mt: 2 }}>
            <CardContent className='p-0' >
              <Stack direction={"row"} className='flex items-center justify-between' spacing={2}>
                <div className='h-[25px]'>
                  Hiện thị từ <strong>{startIndex + 1}</strong> đến <strong>{endIndex > courses?.length ? courses?.length : endIndex}</strong> trong tổng số <strong>{courses?.length}</strong> khóa học
                </div>
                <div className='w-[300px] h-[25px]'>
                  <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={onPageChange} />
                </div>
              </Stack>
            </CardContent>
          </Card>
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


export default AdminCourses;
