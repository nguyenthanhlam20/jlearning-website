
import CourseImage from "../../../assets/images/course/course-1.png";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { Stack, Box, Card, CardContent, CardHeader, List, SvgIcon, Typography, AppBar, Tabs, Tab, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
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

import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';

import ReactPlayer from 'react-player'
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../constants/route.constants";
import TestDialog from "../../../components/Test";
import ConfirmDialog from "../../../components/Confirm";

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


const course = {
    id: 1,
    title: "Khóa học N2",
    desctiption: "Khóa học N2 là khóa học giúp bạn nâng cao trình độ tiếng Nhật",
    img_url: CourseImage,
    chapters: [
        {
            id: 1,
            title: "Chương 1",
            description: "Mô tả chương 1",
            lessons: [
                {
                    id: 1,
                    title: "Bài 1",
                    video_url: "https://media.w3.org/2010/05/sintel/trailer.mp4",
                    description: "Mô tả bài 1"
                }, {
                    id: 2,
                    title: "Bài 2",
                    video_url: "https://media.w3.org/2010/05/bunny/trailer.mp4",
                    description: "Mô tả bài 2"
                }, {
                    id: 3,
                    title: "Bài 3",
                    video_url: "https://media.w3.org/2010/05/video/movie_300.mp4",
                    description: "Mô tả bài 3"
                }
            ],
            test: {
                id: 1,
                title: "Bài kiểm tra 1",
            }
        },
        {
            id: 2,
            title: "Chương 2",
            description: "Mô tả chương 2",
            lessons: [
                {
                    id: 1,
                    title: "Bài 1",
                    video_url: "https://media.w3.org/2010/05/sintel/trailer.mp4",
                    description: "Mô tả bài 1"
                }, {
                    id: 2,
                    title: "Bài 2",
                    video_url: "https://media.w3.org/2010/05/bunny/trailer.mp4",
                    description: "Mô tả bài 2"
                }, {
                    id: 3,
                    title: "Bài 3",
                    video_url: "https://media.w3.org/2010/05/video/movie_300.mp4",
                    description: "Mô tả bài 3"
                },
                {
                    id: 4,
                    title: "Bài 4",
                    video_url: "https://media.w3.org/2010/05/video/movie_480p.mp4",
                    description: "Mô tả bài 4"
                },
                {
                    id: 5,
                    title: "Bài 5",
                    video_url: "https://media.w3.org/2010/05/video/movie_640.mp4",
                    description: "Mô tả bài 5"
                }
            ],
            test: {
                id: 2,
                title: "Bài kiểm tra 2",
            }
        }
    ]
}

const LessonViewPage = () => {
    const [expanded, setExpanded] = React.useState('panel1');
    const [currentLesson, setCurrentLesson] = React.useState(course.chapters[0].lessons[0]);
    const [openTestModal, setOpenTestModal] = React.useState(false);
    const [isOpenTest, setIsOpenTest] = React.useState(false);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    const handleChangeAccordion =
        (panel) => (event, newExpanded) => {
            setExpanded(newExpanded ? panel : false);
        };

    const handleChangeLesson = (lesson) => {
        setCurrentLesson(lesson);
    }

    const handleLessonDone = () => {
        window.alert("done");
    }

    const handleConfirmTest = () => {
        setOpenTestModal(false);
        setIsOpenTest(true);
    }



    const lessonDone = [
        1, 3, 4
    ]

    const testDone = [1]


    const handleConfirmAction = (status) => {
        if (status == true) {
            setOpenTestModal(false);
            setIsOpenTest(true);
        } else {
            setOpenTestModal(false);

        }
    }

    return <>
        <Breadcrumb pageName={"Bài học"} description={"Xem thông tin bài học"} />
        <Stack direction={"row"} spacing={3} className="m-11 mt-10 mb-20">
            <Card className="w-full" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                <CardContent>
                    <div className="mb-5 expanded">
                        <ReactPlayer

                            url={currentLesson.video_url}
                            controls
                            width='100%'
                            height={550}
                            onEnded={handleLessonDone}
                        />

                    </div>
                    <Divider />
                    <div className="relative" sx={{ height: "300px" }}>
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
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                Mô tả
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                Link tài liệu
                            </TabPanel>
                            <TabPanel value={value} index={2} dir={theme.direction}>
                                Các khóa học khác
                            </TabPanel>
                        </SwipeableViews>
                    </div>
                </CardContent>
            </Card>
            <Card sx={{ pt: 2, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className="w-[700px]">
                <CardHeader title="Danh sách chương" />
                <CardContent>
                    <div className=" overflow-auto max-h-[500px]">
                        {course?.chapters.map((chapter) => {
                            return <Accordion expanded={expanded === 'panel' + chapter.id} onChange={handleChangeAccordion('panel' + chapter.id)}>
                                <AccordionSummary aria-controls={"panel1d-" + chapter.id + "content"} id={"panel" + chapter.id + "d-header"}>
                                    <Typography>{chapter.title}: {chapter.description}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <List sx={{ width: '100%', p: 0, m: 0, bgcolor: 'background.paper' }}>
                                            {chapter.lessons.map((lesson) => {
                                                return <ListItemButton sx={{ backgroundColor: lesson.id === currentLesson.id ? "ButtonFace" : "" }} onClick={() => handleChangeLesson(lesson)} >
                                                    <ListItemIcon >
                                                        <SvgIcon sx={{ fontSize: 30 }} color={lessonDone.includes(lesson.id) && currentLesson.id !== lesson.id ? "success" : "primary"}>
                                                            {lesson.id === currentLesson.id ? <PauseCircleFilledIcon /> : lessonDone.includes(lesson.id) ? <CheckCircleIcon /> : <PlayCircleIcon />}

                                                        </SvgIcon>
                                                    </ListItemIcon>

                                                    <ListItemText primary={lesson.title} />
                                                </ListItemButton>
                                            })}
                                            <ListItemButton onClick={() => setOpenTestModal(true)} >
                                                <ListItemIcon >
                                                    <SvgIcon sx={{ fontSize: 30 }} color={testDone.includes(chapter?.test?.id) ? "success" : "primary"}>
                                                        {lessonDone.includes(chapter?.test?.id) ? <CheckCircleIcon /> : <QuizIcon />}

                                                    </SvgIcon>
                                                </ListItemIcon>

                                                <ListItemText primary={chapter?.test?.title} />
                                            </ListItemButton>
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
        title={"Làm bài kiểm tra"} 
        description={"Bạn có chắc mình đã sẵn sàng để bắt đầu bài kiểm tra không? Bạn sẽ có 30 phút để hoàn thành nó. Khi bạn đạt đến giới hạn thời gian, bài kiểm tra sẽ tự động nộp."} handleAction={handleConfirmAction} />

        <TestDialog isOpen={isOpenTest} setIsOpen={setIsOpenTest} />
    </>
}

export default LessonViewPage;