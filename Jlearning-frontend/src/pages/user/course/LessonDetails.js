
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { Stack, Box, Card, CardContent, CardHeader, List, SvgIcon, Typography, AppBar, Tabs, Tab, ListItemButton, ListItemIcon, ListItemText, Divider, Button } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';

import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';

import ReactPlayer from 'react-player'
import { useNavigate } from "react-router-dom";
import TestDialog from "../../../components/Test";
import ConfirmDialog from "../../../components/Confirm";
import { insertLessonDone } from "../../../redux/lessonSlice";
import courseSlice from "../../../redux/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import TestResultDialog from "../../../components/Test/TestResultDialog";
import { insertTestDone } from "../../../redux/testSlice";
import RelatedCourse from "../../../components/Course/RelatedCourse";
import AppTextArea from "../../../components/AppInput/AppTextArea";
import RatingStar from "../../../components/Star";
import { insertFeedback, updateFeedback } from "../../../redux/feedbackSlice";
import { toast } from "react-toastify";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


const LessonDetails = ({ course, lessonsDone, testsDone, user, feedback }) => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState('panel1');
    const [currentLesson, setCurrentLesson] = React.useState(course?.chapters[0]?.lessons[0]);
    const [currentChapter, setCurrentChapter] = React.useState(course?.chapters[0]);
    const [currentTest, setCurrentTest] = React.useState(null);
    const [openTestModal, setOpenTestModal] = React.useState(false);
    const [isOpenTest, setIsOpenTest] = React.useState(false);
    const [openTestResult, setOpenTestResult] = React.useState(false);
    const [isShowTest, setIsShowTest] = React.useState(false);
    const [testAnswers, setTestAnswers] = React.useState([]);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const [feedbackValues, setFeedbackValues] = React.useState({
        feedback_id: feedback?.feedback_id,
        name: user?.name,
        email: user?.email,
        course_name: course?.course_name,
        course_id: course?.course_id,
        message: feedback === '' ? '' : feedback?.message,
        star: feedback === '' ? 0 : feedback?.star,
    });

    React.useEffect(() => {
        setFeedbackValues({
            feedback_id: feedback?.feedback_id,
            name: user?.name,
            email: user?.email,
            user_avatar_url: user?.avatar_url,
            course_name: course?.course_name,
            course_id: course?.course_id,
            message: feedback === '' ? '' : feedback?.message,
            star: feedback === '' ? 0 : feedback?.star,
        })
    }, [feedback, course])



    const handleChangeFeedbackValues = (key, value) => {
        setFeedbackValues(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    }


    const courses = useSelector((state) => state.course.data);

    React.useEffect(() => {
        setCurrentLesson(course?.chapters[0]?.lessons[0]);
        setCurrentChapter(course?.chapters[0]);
    }, [course]);

    const { setIsRefreshSpecific } = courseSlice.actions;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleChangeAccordion =
        (panel) => (event, newExpanded) => {
            // window.alert("ok");
            setExpanded(newExpanded ? panel : false);
        };

    const handleChangeLesson = (lesson) => {
        setCurrentTest(null);
        setIsShowTest(false);
        const chapters = course?.chapters;
        const chapterIndex = chapters?.findIndex(function (chapter) {
            return chapter.lessons.includes(lesson);
        });

        setCurrentChapter(chapters[chapterIndex]);

        setCurrentLesson(lesson);
    }

    const handleLessonDone = () => {
        if (!lessonsDone.includes(currentLesson.lesson_id)) {
            if (user) {
                dispatch(insertLessonDone({ course_id: course?.course_id, email: user?.email, lesson_id: currentLesson.lesson_id }));
                dispatch(setIsRefreshSpecific(true));
            }
        }
        const chapters = course?.chapters;
        const chapterIndex = chapters?.findIndex(function (chapter) {
            return chapter.chapter_id === currentChapter.chapter_id;
        });

        const lessons = course?.chapters[chapterIndex]?.lessons;
        const lessonIndex = lessons.findIndex(function (lesson) {
            return lesson.lesson_id === currentLesson.lesson_id;
        });
        if (lessonIndex === lessons.length - 1) {
            if (chapterIndex !== chapters.length - 1) {
                const chapter = chapters[chapterIndex + 1];

                setExpanded('panel' + chapter.chapter_id);

                setCurrentChapter(chapter);
                if (chapter.lessons.length > 0) {
                    setCurrentLesson(chapter.lessons[0]);
                }
            }

        } else {
            setCurrentLesson(lessons[lessonIndex + 1]);
        }

    }

    const handleConfirmTest = () => {
        setOpenTestModal(false);
        setIsOpenTest(true);
    }



    const handleConfirmAction = (status) => {
        if (status == true) {
            setOpenTestModal(false);
            setIsOpenTest(true);
        } else {
            setOpenTestModal(false);

        }
    }

    const handleShowTest = (test) => {
        setIsShowTest(true);
        setCurrentTest(test);
        setCurrentLesson(null);
    }

    const goToLink = (url) => {
        window.open(url, '_blank');
    }

    console.log("feedback: ", feedbackValues);

    const handleTestDone = () => {
        if (user && !testsDone.includes(currentTest?.test_id)) {
            dispatch(insertTestDone({ test_id: currentTest.test_id, course_id: course.course_id, email: user.email }));
            dispatch(setIsRefreshSpecific(true));
        }
    }

    const handleSubmitFeedback = () => {

        if (feedbackValues.message.trim() === '') {
            toast.warning("Chưa ghi nội dung phản hồi");
            return;
        }

        if (feedback === '') {
            dispatch(insertFeedback(feedbackValues));
        } else {
            dispatch(updateFeedback(feedbackValues));
        }
    }

    return <>
        <Breadcrumb pageName={"Bài học"} description={"Xem thông tin bài học"} />
        <Stack direction={"row"} spacing={3} className="m-11 mt-10 mb-20">

            <Card className="w-full" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                <CardContent>
                    {isShowTest === true ? <>

                        <Card sx={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;", p: 5, height: 550, mb: 5 }} >
                            <CardContent className="h-full">
                                <div className="flex flex-col justify-center h-full">
                                    <Stack direction={"column"} spacing={3} sx={{ textAlign: "center", margin: "auto" }} >
                                        <Typography variant="h5">{currentTest?.test_name}</Typography>
                                        <Typography>{"Thời gian làm bài: " + currentTest?.duration + " phút"}</Typography>
                                        <Typography>{"Số câu hỏi: " + currentTest?.questions.length}</Typography>
                                        <div className="flex flex-row justify-center w-full">
                                            <Button sx={{ width: 300 }} variant="contained" color="warning" onClick={() => setOpenTestModal(true)}>
                                                <SvgIcon sx={{ mr: 1 }}>
                                                    <ThumbUpAlt />
                                                </SvgIcon>  Làm bài
                                            </Button>
                                        </div>
                                    </Stack>
                                </div>
                            </CardContent>
                        </Card>

                    </> :
                        <>
                            <div className="mb-5 expanded">
                                <ReactPlayer

                                    url={currentLesson?.video_url}
                                    controls
                                    width='100%'
                                    height={550}
                                    onEnded={handleLessonDone}
                                />

                            </div>
                            <Divider />


                        </>

                    }
                    <div className="relative" sx={{ height: "500px" }}>
                        <AppBar position="static">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Mô tả bài học" {...a11yProps(0)} />
                                <Tab label="Tài liệu" {...a11yProps(1)} />
                                <Tab label="Khóa học liên quan" {...a11yProps(2)} />
                                <Tab label="Phản hồi của bạn" {...a11yProps(3)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            className="h-full"
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <Stack direction={"column"} spacing={2} sx={{ height: 400, overflow: "auto" }}>

                                    {currentLesson?.description}
                                </Stack>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <Stack direction={"column"} spacing={1} sx={{ height: 400, overflow: "auto" }}>
                                    <span>Các bạn tải tài liệu theo đường link: </span>
                                    <span onClick={() => goToLink(currentLesson?.material_url)} style={{ color: "#7c3aed", cursor: "pointer" }}  >{currentLesson?.material_url} </span>
                                </Stack>
                            </TabPanel>
                            <TabPanel value={value} index={2} dir={theme.direction} >
                                <div style={{ height: 360, overflow: "auto", padding: 15 }}>
                                    <Stack direction={"column"} spacing={2} sx={{ width: "100%" }}>
                                        {courses.map((c, key) => {
                                            return <RelatedCourse
                                                key={key}
                                                image={c.course_avatar_url}
                                                title={c.course_name}
                                                price={c.price}
                                                description={c.description}
                                                courseId={c.course_id}
                                            />
                                        })}
                                    </Stack>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={3} dir={theme.direction}>
                                <Stack direction={"column"} spacing={0} sx={{ height: 400, overflow: "auto", p: 2, }}>
                                    <Card sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;", p: 2, cursor: "pointer", height: 400 }} >
                                        <CardHeader title="Phản hồi của bạn" className="uppercase font-bold" />
                                        <CardContent sx={{ pt: 0 }}>
                                            <Stack direction={"column"} spacing={1}>
                                                <RatingStar value={feedbackValues?.star} handleChangeValue={handleChangeFeedbackValues} />
                                                <AppTextArea height={"h-[150px]"} value={feedbackValues?.message} title={"message"} handleChangeValue={handleChangeFeedbackValues} placeholder={"Nội dung"} />
                                            </Stack>
                                            <div className="flex justify-end mt-3">
                                                <Button onClick={handleSubmitFeedback} variant="contained" color="primary" className="w-[180px]" >
                                                    <SvgIcon sx={{ mr: 1 }}>
                                                        <HandThumbUpIcon />
                                                    </SvgIcon>
                                                    {feedback !== null && feedback !== undefined && feedback !== '' ? "Cập nhật" : "Gửi"}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </TabPanel>
                        </SwipeableViews>
                    </div>
                </CardContent>
            </Card>
            <Card sx={{ pt: 2, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className="w-[700px]">
                <CardHeader title="Danh sách chương" />
                <CardContent>
                    <div className=" overflow-auto max-h-[950px]">
                        {course?.chapters.map((chapter) => {
                            return <Accordion expanded={expanded === 'panel' + chapter.chapter_id} onChange={handleChangeAccordion('panel' + chapter.chapter_id)}>
                                <AccordionSummary aria-controls={"panel1d-" + chapter.chapter_id + "content"} id={"panel" + chapter.chapter_id + "d-header"}>
                                    <Typography>{chapter.chapter_name}: {chapter.description}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <List sx={{ width: '100%', p: 0, m: 0, bgcolor: 'background.paper' }}>
                                            {chapter.lessons.map((lesson, key) => {
                                                return <ListItemButton key={"lesson" + key} sx={{ backgroundColor: lesson.lesson_id === currentLesson?.lesson_id ? "ButtonFace" : "" }} onClick={() => handleChangeLesson(lesson)} >
                                                    <ListItemIcon >
                                                        <SvgIcon sx={{ fontSize: 30 }} color={lessonsDone?.includes(lesson.lesson_id) && currentLesson?.lesson_id !== lesson.lesson_id ? "success" : "primary"}>
                                                            {lesson.lesson_id === currentLesson?.lesson_id ? <PauseCircleFilledIcon /> : lessonsDone?.includes(lesson.lesson_id) ? <CheckCircleIcon /> : <PlayCircleIcon />}

                                                        </SvgIcon>
                                                    </ListItemIcon>

                                                    <ListItemText primary={lesson.lesson_name} />
                                                </ListItemButton>
                                            })}
                                            {chapter.tests.map((test, key) => {
                                                return (
                                                    <ListItemButton key={"test" + key} sx={{ backgroundColor: test.test_id === currentTest?.test_id ? "ButtonFace" : "" }} onClick={() => handleShowTest(test)} >
                                                        <ListItemIcon >
                                                            <SvgIcon sx={{ fontSize: 30 }} color={testsDone?.includes(test?.test_id) ? "success" : "secondary"}>
                                                                {testsDone?.includes(test?.test_id) ? <CheckCircleIcon /> : <QuizIcon />}

                                                            </SvgIcon>
                                                        </ListItemIcon>

                                                        <ListItemText primary={test?.test_name} />
                                                    </ListItemButton>
                                                );
                                            })}
                                        </List>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        })}



                    </div>
                </CardContent>
            </Card>
        </Stack>

        <ConfirmDialog
            isOpen={openTestModal}
            title={"Xác nhận làm bài kiểm tra"}
            description={"Bạn có chắc mình đã sẵn sàng để bắt đầu bài kiểm tra không? Khi bạn đạt đến giới hạn thời gian, bài kiểm tra sẽ tự động nộp."} handleAction={handleConfirmAction} />

        {currentTest !== null ? <>
            <TestDialog
                isOpen={isOpenTest}
                test={currentTest}
                setIsOpen={setIsOpenTest}
                setOpenTestResult={setOpenTestResult}
                setTestAnswers={setTestAnswers}
                handleTestDone={handleTestDone} />
            <TestResultDialog
                isOpen={openTestResult}
                test={currentTest}
                setIsOpenTest={setIsOpenTest}
                setIsOpen={setOpenTestResult}
                answers={testAnswers} />
        </> : <></>}
    </>
}

export default LessonDetails;