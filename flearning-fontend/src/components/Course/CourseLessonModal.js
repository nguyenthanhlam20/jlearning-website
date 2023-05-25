import { Dialog, DialogTitle, DialogContent, Container, Button, Stack, SvgIcon, Divider, Card, CardContent } from "@mui/material";
import AppInput from "../AppInput/AppInput";
import React from "react";
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';
import FileUploader from "../FileUploader";
import VideoDefault from "../../assets/images/video/video-default.png";
import { useDispatch } from "react-redux";

import { insertLesson, updateLesson } from "../../redux/lessonSlice";
import axios from "axios";
import courseSlice from "../../redux/courseSlice";
import { ACTION_TYPE } from "../../constants/constants";
import AppTextArea from "../AppInput/AppTextArea";
import { toast } from "react-toastify";

const CourseLessonModal = ({
    isOpenModal,
    chapterId,
    handleCloseModal,
    currentLesson,
    actionType,
}) => {

    const dispatch = useDispatch();
    const [videoUrl, setVideoUrl] = React.useState('');
    const [currentFile, setCurrentFile] = React.useState(null);
    const [disableSubmit, setDisableSubmit] = React.useState(false);
    const { setIsRefreshSpecific } = courseSlice.actions;

    const [values, setValues] = React.useState({
        lesson_name: '',
        video_url: '',
        material_url: '',
        description: '',
        duration: '',
        chapter_id: chapterId,
    });

    React.useEffect(() => {
        if (currentLesson !== null && currentLesson !== undefined) {
            setValues({
                lesson_name: currentLesson.lesson_name,
                video_url: currentLesson.video_url,
                material_url: currentLesson.material_url,
                description: currentLesson.description,
                duration: currentLesson.duration,
                chapter_id: chapterId,
                lesson_id: currentLesson.lesson_id
            })
        }
    }, [currentLesson])

    React.useEffect(() => {
        if (currentFile !== null) {
            setValues(prevValues => ({
                ...prevValues,
                video_url: currentFile.url
            }));
            setDisableSubmit(false);
        }
    }, [currentFile])

    const handleChangeValue = (key, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    };

    const handleSubmit = () => {

        if (values.lesson_name.trim() === '') {
            toast.warning("Chưa nhập tên bài học");
            return;
        }

        if (values.material_url.trim() === '') {
            toast.warning("Chưa nhập link tài liệu");
            return;
        }

        if (values.description.trim() === '') {
            toast.warning("Chưa nhập mô tả bài học");
            return;
        }

        if (values.video_url.trim() === '') {
            toast.warning("Chưa thêm video bài giảng");
            return;
        }

        console.log(values);
        if (actionType === ACTION_TYPE.INSERT) {
            dispatch(insertLesson(values));

        } else {
            dispatch(updateLesson(values));
        }

        dispatch(setIsRefreshSpecific(true));
        handleClose();
    }



    const handleClose = () => {
        setValues({
            lesson_name: '',
            video_url: '',
            material_url: '',
            description: '',
            duration: 0,
            chapter_id: chapterId,
        });
        setCurrentFile(null);
        setVideoUrl('');
        handleCloseModal();
    }

    return <>
        <Dialog open={isOpenModal} maxWidth="md" fullWidth >
            <DialogTitle sx={{ p: 2 }} >THÊM MỚI BÀI HỌC</DialogTitle>
            <DialogContent sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;', p: 3 }} dividers>
                <Stack direction={"row"} spacing={3} >
                    <div className="relative  flex w-[1000px] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative mx-4  -mt-2 h-48 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                            {values.video_url === '' ? <img
                                src={VideoDefault}
                                alt="img-blur-shadow"

                            /> : <video controls>
                                <source src={currentFile !== null ? currentFile.url : values.video_url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>}
                        </div>
                        <Divider className='h-4' />
                        <FileUploader
                            id={"insert-lesson-video"}
                            setDisableSubmit={setDisableSubmit}
                            setCurrentFile={setCurrentFile}
                            firebaseFolderName={"course/videos"} setPreviewUrl={setVideoUrl} />
                    </div>
                    <Card className="w-[1200px]" sx={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" }} >
                        <CardContent>
                            <Stack direction={"column"} spacing={2}>
                                <AppInput
                                    value={values.lesson_name}
                                    title={'lesson_name'}
                                    handleChangeValue={handleChangeValue}
                                    placeholder={"Nhập tên bài học"} />
                                <AppInput
                                    value={values.material_url}
                                    title={'material_url'}
                                    handleChangeValue={handleChangeValue}
                                    placeholder={"Nhập link tài liệu"} />
                                <AppTextArea
                                    height={"h-[220px]"}
                                    value={values.description}
                                    title={'description'}
                                    handleChangeValue={handleChangeValue}
                                    placeholder={"Nhập mô tả"} />
                            </Stack>
                        </CardContent>

                    </Card>

                </Stack>
                <div className='flex justify-end mt-5'>
                    <div className="flex justify-between w-[215px]">
                        <Button
                            disabled={disableSubmit}
                            className="w-[100px]" variant="contained" color="error" onClick={handleClose}>
                            <SvgIcon className="mr-2">
                                <XMarkIcon />
                            </SvgIcon>  Hủy
                        </Button>
                        <Button
                            disabled={disableSubmit}
                            onClick={handleSubmit}
                            variant="contained" color="primary" className=' w-[100px]'>
                            <SvgIcon className="mr-2">
                                <HandThumbUpIcon />
                            </SvgIcon>  Lưu
                        </Button>
                    </div>
                </div>
            </DialogContent>

        </Dialog>
    </>
}

export default CourseLessonModal;