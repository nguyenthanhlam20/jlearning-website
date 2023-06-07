import { Dialog, DialogTitle, DialogContent, Container, Button, Stack, SvgIcon } from "@mui/material";
import AppInput from "../AppInput/AppInput";
import React from "react";
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';

import { useDispatch } from "react-redux";
import { insertChapter, updateChapter } from "../../redux/chapterSlice";
import { toast } from "react-toastify";
import courseSlice from "../../redux/courseSlice";
import { ACTION_TYPE } from "../../constants/constants";
import AppTextArea from "../AppInput/AppTextArea";

const CourseChapterModal = ({
    isOpenModal,
    courseId,
    currentChapter,
    setCurrentChapter,
    actionTypeChapter,
    handleCloseModal
}) => {
    const { setIsRefreshSpecific } = courseSlice.actions;
    const dispatch = useDispatch();
    const [values, setValues] = React.useState({
        chapter_name: '',
        description: '',
        course_id: courseId,
    });


    React.useEffect(() => {
        setValues(prevValues => ({
            ...prevValues,
            course_id: courseId
        }));
    }, [courseId])

    // console.log("chapter: ", currentChapter);
    // window.alert(values.course_id);

    const handleChangeValue = (key, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    };
    React.useEffect(() => {
        if (currentChapter !== null && currentChapter !== undefined) {
            setValues(currentChapter);
        }
    }, [currentChapter])



    React.useEffect(() => {
        if (isOpenModal === false) {
            setValues({
                chapter_name: '',
                description: '',
                course_id: courseId,
            });
            setCurrentChapter(null);
        }
    }, [isOpenModal])

    const onSubmit = () => {
        if (values.chapter_name === '' || values.description === '') {
            toast.warning("Hãy nhập tên và mô tả chương");
        } else {
            handleCloseModal();

            if (actionTypeChapter === ACTION_TYPE.INSERT) {

                dispatch(insertChapter(values));
            } else {
                dispatch(updateChapter(values));

            }

            dispatch(setIsRefreshSpecific(true));
        }
    }

    return <>
        <Dialog open={isOpenModal} >
            <DialogTitle sx={{ p: 2 }} >THÊM MỚI CHƯƠNG</DialogTitle>
            <DialogContent sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;', p: 0, pb: 2, width: 600 }} dividers>
                <Container sx={{ p: 0 }} className='mt-5' maxWidth="lg">
                    <Stack direction={"column"} spacing={2}>
                        <AppInput
                            value={values.chapter_name}
                            title={'chapter_name'}
                            handleChangeValue={handleChangeValue}
                            placeholder={"Nhập tên chương"} />
                        <AppTextArea
                            height={"h-[200px]"}
                            value={values.description}
                            title={'description'}
                            handleChangeValue={handleChangeValue}
                            placeholder={"Nhập mô tả"} />
                    </Stack>
                    <div className='flex justify-end mt-5'>
                        <div className="flex justify-between w-[215px]">
                            <Button className="w-[100px]" variant="contained" color="error" onClick={handleCloseModal}>
                                <SvgIcon className="mr-2">
                                    <XMarkIcon />
                                </SvgIcon>  Hủy
                            </Button>
                            <Button onClick={onSubmit} variant="contained" color="primary" className=' w-[100px]'>
                                <SvgIcon className="mr-2">
                                    <HandThumbUpIcon />
                                </SvgIcon>  Lưu
                            </Button>
                        </div>
                    </div>
                </Container>
            </DialogContent>

        </Dialog>
    </>
}

export default CourseChapterModal;