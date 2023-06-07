import AppInput from "../../../components/AppInput/AppInput";
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';

import { Button, Card, CardContent, CardHeader, Container, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, SvgIcon } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import testSlice, { updateTest } from "../../../redux/testSlice";
import { ACTION_TYPE } from "../../../constants/constants";
import { Box, spacing } from "@mui/system";
import AppTextArea from "../../../components/AppInput/AppTextArea";
import Question from "../../../components/Question";
import AppSelect from "../../../components/AppInput/AppSelect";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { insertQuestion, updateQuestion } from "../../../redux/questionSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../constants/route.constants";
import AppInputNumber from "../../../components/AppInput/AppInputNumber";

const AdminTestDetails = ({ test, courses }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = React.useState();

    const [values, setValues] = React.useState({
        test_id: test?.test_id,
        test_name: test?.test_name,
        description: test?.description,
        duration: test?.duration,
        course_id: test?.course_id,
        chapter_id: test?.chapter_id,
    });
    const [question, setQuestion] = React.useState({
        description: '',
        answer_1: '',
        answer_2: '',
        answer_3: '',
        answer_4: '',
        explaination: '',
        correct_answer: 0,
        test_id: test?.test_id
    });

    React.useEffect(() => {
        setValues({
            test_id: test?.test_id,
            test_name: test?.test_name,
            description: test?.description,
            duration: test?.duration,
            course_id: test?.course_id,
            chapter_id: test?.chapter_id,
        });
        setQuestion({
            description: '',
            answer_1: '',
            answer_2: '',
            answer_3: '',
            answer_4: '',
            explaination: '',
            correct_answer: 0,
            test_id: test?.test_id
        })
    }, [test])



    const [selectedCourse, setSelectedCourse] = React.useState();

    const { setIsRefreshSpecific } = testSlice.actions;

    React.useEffect(() => {
        const course = courses.find((c) => c.course_id === values.course_id);
        setSelectedCourse(course);
    }, [values.course_id]);


    const [openQuestionModal, setOpenQuestionModal] = React.useState(false);
    const [actionType, setActionType] = React.useState(ACTION_TYPE.INSERT);

    const handleChangeValue = (key, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    };

    const handleChangeQuestionValue = (key, value) => {
        setQuestion(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    }

    const handleUpdateTest = () => {
        dispatch(updateTest(values));
    }

    const handleSubmitQuestion = () => {

        if (question.description.trim() === '') {
            toast.warning("Chưa nhập mô tả câu hỏi");
            return;
        }

        if (question.answer_1.trim() === ''
            || question.answer_2.trim() === ''
            || question.answer_3.trim() === ''
            || question.answer_4.trim() === ''
        ) {
            toast.warning("Chưa nhập đủ câu trả lời");
            return;
        }

        if (question.correct_answer === 0) {
            toast.warning("Chưa chọn trả lời đúng");
            return;
        }


        if (actionType === ACTION_TYPE.UPDATE) {
            dispatch(updateQuestion(question));
        } else {
            dispatch(insertQuestion(question));
        }


        dispatch(setIsRefreshSpecific(true));

        setOpenQuestionModal(false);
    }

    React.useEffect(() => {

        if (openQuestionModal === false) {
            setQuestion({
                description: '',
                answer_1: '',
                answer_2: '',
                answer_3: '',
                answer_4: '',
                explaination: '',
                correct_answer: 0,
                test_id: test?.test_id
            });

            setCurrentQuestion(null);
        }
    }, [openQuestionModal])



    const handleReturnToList = () => {
        navigate(ROUTE_CONSTANTS.ADMIN_TEST_PAGE);
    }

    React.useEffect(() => {
        if (currentQuestion !== null && currentQuestion !== undefined) {
            setOpenQuestionModal(true);
            setActionType(ACTION_TYPE.UPDATE);
            setQuestion({
                description: currentQuestion?.description,
                answer_1: currentQuestion?.answer_1,
                answer_2: currentQuestion?.answer_2,
                answer_3: currentQuestion?.answer_3,
                answer_4: currentQuestion?.answer_4,
                explaination: currentQuestion?.explaination,
                correct_answer: currentQuestion?.correct_answer,
                test_id: test?.test_id,
                question_id: currentQuestion.question_id,
            })
        }
    }, [currentQuestion]);

    return (
        <>
            <Box className='ml-72 mt-4'
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 0
                }}>
                <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "row", height: 620 }}>
                    <Card className="w-full h-full mr-4" sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}>
                        <CardContent sx={{pb: 200}}>
                            <Stack direction={"column"} spacing={2}>
                                <div >
                                    <Button variant="contained" className='bg-primary' onClick={() => {
                                        setOpenQuestionModal(true);
                                        setActionType(ACTION_TYPE.INSERT);
                                    }} >
                                        <SvgIcon sx={{ mr: 1 }}>
                                            <PlusIcon />
                                        </SvgIcon> Thêm mới câu hỏi
                                    </Button>
                                </div>
                                <Stack direction={"column"} sx={{ overflow: "auto", height: 520 }} spacing={0}>
                                    {test?.questions.map((question, key) => {
                                        return <Question setCurrentQuestion={setCurrentQuestion} key={key} question={question} title={`Câu hỏi ${key + 1}`} index={key} />
                                    })}
                                </Stack>

                            </Stack>
                        </CardContent>
                    </Card>
                    <Card sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }} className=" w-[500px] h-full flex flex-col rounded bg-white bg-clip-border text-gray-700 shadow-md">
                        <CardHeader title={"Thông tin bài kiểm tra"} ></CardHeader>
                        <div className="p-4 h-full">
                            <Stack spacing={2} direction={"column"} className="h-full">
                                <AppInput value={values.test_name} title={"test_name"} handleChangeValue={handleChangeValue} placeholder={"Tên bài kiểm tra"} />
                                <AppInputNumber value={values.duration} title={"duration"} handleChangeValue={handleChangeValue} placeholder={"Thời gian làm bài (phút)"} />
                                <AppSelect value={values.course_id} data={courses} title={"course_id"} display={"course_name"} placeholder={"Chọn khóa học"} handleChangeValue={handleChangeValue} />
                                <AppSelect value={values.chapter_id} data={selectedCourse?.chapters} title={"chapter_id"} display={"chapter_name"} display2={"description"} placeholder={"Chọn chương"} handleChangeValue={handleChangeValue} />
                                <AppTextArea height={"h-[190px]"} value={values.description} title={"description"} handleChangeValue={handleChangeValue} placeholder={"Mô tả"} />
                            </Stack>
                        </div>
                        <Stack className="m-4" direction={"row"} spacing={2} >
                            <Button onClick={handleReturnToList} color='success' variant="contained" className='w-[150px]'>
                                <SvgIcon className='mr-2' >
                                    <ArrowLeftIcon />
                                </SvgIcon> Trở lại
                            </Button>
                            <Button variant="contained" onClick={handleUpdateTest} className='bg-primary w-[150px]'>
                                <SvgIcon className="mr-2">
                                    <HandThumbUpIcon />
                                </SvgIcon> Lưu
                            </Button>
                        </Stack>
                    </Card>
                </Container>
            </Box>
            <Dialog open={openQuestionModal} fullWidth maxWidth="md" >
                <DialogTitle sx={{ textTransform: "uppercase" }}>Thêm mới câu hỏi</DialogTitle>
                <DialogContent sx={{ p: 4 }}>
                    <Stack sx={{ mt: 3 }} direction={"column"} spacing={3}>

                        <Stack direction={"column"} spacing={2}>
                            <AppInput value={question.description} title={"description"} handleChangeValue={handleChangeQuestionValue} placeholder={"Nội dung câu hỏi"} />
                            <AppInput  value={question.explaination} title={"explaination"} handleChangeValue={handleChangeQuestionValue} placeholder={"Giải thích"} />
                        </Stack>

                        <Stack direction={"column"} spacing={2}>
                            <Stack direction={"row"} spacing={2}>
                                <AppInput
                                    value={question.answer_1}
                                    title={'answer_1'}
                                    handleChangeValue={handleChangeQuestionValue}
                                    placeholder={"Nhập câu trả lời 1"} />
                                <AppInput
                                    value={question.answer_2}
                                    title={'answer_2'}
                                    handleChangeValue={handleChangeQuestionValue}
                                    placeholder={"Nhập câu trả lời 2"} />
                            </Stack>
                            <Stack direction={"row"} spacing={2}>
                                <AppInput
                                    value={question.answer_3}
                                    title={'answer_3'}
                                    handleChangeValue={handleChangeQuestionValue}
                                    placeholder={"Nhập câu trả lời 3"} />
                                <AppInput
                                    value={question.answer_4}
                                    title={'answer_4'}
                                    handleChangeValue={handleChangeQuestionValue}
                                    placeholder={"Nhập câu trả lời 4"} />
                            </Stack>
                        </Stack>
                        <div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Chọn câu trả lời đúng</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={question.correct_answer}
                                    label="Chọn câu trả lời đúng"
                                    onChange={(e) => handleChangeQuestionValue("correct_answer", e.target.value)}
                                >
                                    <MenuItem value={1}>Câu trả lời 1</MenuItem>
                                    <MenuItem value={2}>Câu trả lời 2</MenuItem>
                                    <MenuItem value={3}>Câu trả lời 3</MenuItem>
                                    <MenuItem value={4}>Câu trả lời 4</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <Stack direction={"row"} spacing={2} className="flex flex-row justify-end w-full" >
                            <Button color='error' variant="contained" className=' w-[150px]' onClick={() => setOpenQuestionModal(false)}>

                                <SvgIcon className='mr-2'>
                                    <XMarkIcon />
                                </SvgIcon> Hủy
                            </Button>
                            <Button onClick={handleSubmitQuestion} color='primary' variant="contained" className='w-[150px] ml-3'>
                                <SvgIcon className='mr-2'>
                                    <HandThumbUpIcon />
                                </SvgIcon> Lưu
                            </Button>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )


}

export default AdminTestDetails;