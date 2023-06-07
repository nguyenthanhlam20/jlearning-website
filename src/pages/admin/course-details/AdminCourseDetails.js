import AppCheckBox from "../../../components/AppInput/AppCheckBox";
import AppInput from "../../../components/AppInput/AppInput";
import CourseChapter from "../../../components/Course/CourseChapter";
import CourseChapterModal from "../../../components/Course/CourseChapterModal";
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';

import { Button, Card, CardContent, Container, Divider, Stack, SvgIcon } from "@mui/material";
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../constants/route.constants";
import { useDispatch } from "react-redux";
import { updateCourse } from "../../../redux/courseSlice";
import { ACTION_TYPE } from "../../../constants/constants";
import { Box } from "@mui/system";
import AppTextArea from "../../../components/AppInput/AppTextArea";
import AppInputNumber from "../../../components/AppInput/AppInputNumber";
import AppInputCurrency from "../../../components/AppInput/AppInputCurrency";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { toast } from "react-toastify";
import FileUploader from "../../../components/FileUploader";

const AdminCourseDetails = ({ course }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentFile, setCurrentFile] = React.useState(null);
    const [previewUrl, setPreviewUrl] = React.useState('');


    const [disableSubmit, setDisableSubmit] = React.useState(false);

    const [values, setValues] = React.useState({
        course_id: course?.course_id,
        course_avatar_url: course?.course_avatar_url,
        course_name: course?.course_name,
        description: course?.description,
        duration: String(course?.duration),
        price: String(course?.price),
        status: course?.status,
    });



    React.useEffect(() => {
        setValues({
            course_id: course?.course_id,
            course_avatar_url: course?.course_avatar_url,
            course_name: course?.course_name,
            description: course?.description,
            duration: String(course?.duration),
            price: String(course?.price),
            status: course?.status,
        });
    }, [course])

    React.useEffect(() => {
        if (currentFile !== null) {
            setValues(prevValues => ({
                ...prevValues,
                course_avatar_url: currentFile.url
            }));
            setDisableSubmit(false);
        }
    }, [currentFile])

    const [isAddChapter, setIsAddChapter] = React.useState(false);
    const [actionTypeChapter, setActionTypeChapter] = React.useState(ACTION_TYPE.INSERT);
    const [currentChapter, setCurrentChapter] = React.useState();
    const [isViewImage, setIsViewImage] = React.useState(true);

    const handleChangeValue = (key, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    };

    const handleUpdateCourse = () => {
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
        if (values.course_avatar_url.trim() === '') {
            toast.warning("Chưa chọn ảnh khóa học");
            return;
        }


        dispatch(updateCourse(values));
    }

    const handleReturnToList = () => {
        navigate(ROUTE_CONSTANTS.ADMIN_COURSE_PAGE);
    }

    const handleCloseAddModal = () => {
        setIsAddChapter(false);
    }
    return <Box className='ml-72 mt-4'
        component="main"
        sx={{
            flexGrow: 1,
            py: 0
        }}>
        <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "row", height: 620 }}>
            <Card className="w-full mr-4 h-full" sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}>
                <CardContent>
                    <Stack direction={"column"} spacing={2}>
                        <div >
                            <Button variant="contained" className='bg-primary' onClick={() => {
                                setActionTypeChapter(ACTION_TYPE.INSERT);
                                setIsAddChapter(true)
                            }}
                            >
                                <SvgIcon sx={{ mr: 1 }}>
                                    <PlusIcon />
                                </SvgIcon> Thêm mới chương
                            </Button>
                        </div>
                        <Stack direction={"column"} sx={{ overflow: "auto", height: 520 }} spacing={0}>
                            {course?.chapters.map((chapter, key) => {
                                return (
                                    <div key={key}>
                                        <CourseChapter  setCurrentChapter={setCurrentChapter} setActionTypeChapter={setActionTypeChapter} setIsAddChapter={setIsAddChapter} chapter={chapter} />
                                    </div>
                                )
                            })}
                        </Stack>

                        <CourseChapterModal currentChapter={currentChapter} setCurrentChapter={setCurrentChapter} actionTypeChapter={actionTypeChapter} courseId={course?.course_id} isOpenModal={isAddChapter} handleCloseModal={handleCloseAddModal} />
                    </Stack>
                </CardContent>
            </Card>
            <Card sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }} className=" w-[500px] h-full flex flex-col rounded bg-white bg-clip-border text-gray-700 shadow-md">
                <div
                    onMouseLeave={() => setIsViewImage(true)}
                    onMouseEnter={() => setIsViewImage(false)}
                    className="h-full overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                    <img
                        className={`${isViewImage === false ? 'hidden' : 'block'}`}
                        src={previewUrl !== '' && previewUrl !== undefined ? previewUrl : values.course_avatar_url}
                        alt="img-blur-shadow"

                    />
                    <div className={`${isViewImage === true ? 'hidden' : 'block'}  pt-4`}>
                        <FileUploader
                            id={"update-course-image"}
                            setDisableSubmit={setDisableSubmit}
                            setCurrentFile={setCurrentFile}
                            firebaseFolderName={"course/images"} setPreviewUrl={setPreviewUrl} />
                    </div>
                </div>
                <div className="p-4 h-full">
                    <Stack spacing={2} direction={"column"}>

                        <AppInput value={values.course_name} title={"course_name"} handleChangeValue={handleChangeValue} placeholder={"Tên khóa học"} />
                        <AppInputNumber value={values.duration} title={"duration"} handleChangeValue={handleChangeValue} placeholder={"Thời gian học (tháng)"} />
                        <AppInputCurrency value={values.price} title={"price"} handleChangeValue={handleChangeValue} placeholder={"Giá (vnd)"} />
                        <AppTextArea height={"h-[100px]"} value={values.description} title={"description"} handleChangeValue={handleChangeValue} placeholder={"Mô tả"} />
                        <AppCheckBox placeholder={"Trạng thái"} title={"status"} value={values.status} handleChangeValue={handleChangeValue} />
                    </Stack>
                </div>
                <Stack className="m-4" direction={"row"} spacing={2} >
                    <Button disabled={disableSubmit} onClick={handleReturnToList} color='success' variant="contained" className='w-[150px]'>
                        <SvgIcon className='mr-2' >
                            <ArrowLeftIcon />
                        </SvgIcon> Trở lại
                    </Button>
                    <Button disabled={disableSubmit} variant="contained" onClick={handleUpdateCourse} className='bg-primary w-[150px]'>
                        <SvgIcon className="mr-2">
                            <HandThumbUpIcon />
                        </SvgIcon> Lưu
                    </Button>
                </Stack>
            </Card>
        </Container>
    </Box>
}

export default AdminCourseDetails;