import Breadcrumb from "../../components/Common/Breadcrumb";
import { Button, Card, CardContent, CardHeader, Dialog, DialogContent, DialogContentText, DialogTitle, List, ListItem, Stack } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import CourseImage from "../../assets/images/course/course-1.png";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants/route.constants";
import PayPal from "../../components/PayPal";

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
const CourseDetailPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        // setIsOpen(true);
        navigate(ROUTE_CONSTANTS.LESSON_VIEW_PAGE);
    }



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
                        description: "Mô tả bài 1"
                    }, {
                        id: 2,
                        title: "Bài 2",
                        description: "Mô tả bài 2"
                    }, {
                        id: 3,
                        title: "Bài 3",
                        description: "Mô tả bài 3"
                    }
                ]
            },
            {
                id: 2,
                title: "Chương 2",
                description: "Mô tả chương 2",
                lessons: [
                    {
                        id: 1,
                        title: "Bài 1",
                        description: "Mô tả bài 1"
                    }, {
                        id: 2,
                        title: "Bài 2",
                        description: "Mô tả bài 2"
                    }, {
                        id: 3,
                        title: "Bài 3",
                        description: "Mô tả bài 3"
                    },
                    {
                        id: 4,
                        title: "Bài 4",
                        description: "Mô tả bài 4"
                    },
                    {
                        id: 5,
                        title: "Bài 5",
                        description: "Mô tả bài 5"
                    }
                ]
            }
        ]
    }

    const [isOpen, setIsOpen] = React.useState(false);

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange =
        (panel) => (event, newExpanded) => {
            setExpanded(newExpanded ? panel : false);
        };
    return <>
        <Breadcrumb pageName={"Thông tin khóa học"} description={"Xem thông tin về khóa học"} />
        <Stack sx={{ width: "100%", padding: "100px", paddingTop: "0px", display: "flex", flexDirection: "column", justifyContent: "center" }} direction={"column"} spacing={3}>
            <Stack direction={"column"} spacing={3}>
                <h2 className="font-bold text-4xl text-center">{course?.title}</h2>
                <p className="text-center">{course?.desctiption}</p>

            </Stack>
            <Stack direction={"row"} spacing={3}>

                <Card className="w-full" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                    <CardHeader title="Danh sách chương và bài học" />
                    <CardContent>
                        <div>
                            {course?.chapters.map((chapter) => {
                                return <Accordion expanded={expanded === 'panel' + chapter.id} onChange={handleChange('panel' + chapter.id)}>
                                    <AccordionSummary aria-controls={"panel1d-" + chapter.id + "content"} id={"panel" + chapter.id + "d-header"}>
                                        <Typography>{chapter.title}: {chapter.description}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <List sx={{ width: '100%', p: 0, m: 0, bgcolor: 'background.paper' }}>
                                                {chapter.lessons.map((lesson) => {
                                                    return <ListItem>
                                                        {lesson.title}: {lesson.description}
                                                    </ListItem>
                                                })}

                                            </List>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            })}


                        </div>
                    </CardContent>
                </Card>

                <Card sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} >
                    <CardContent className="w-full relative ">
                        <img src={CourseImage} className="w-[700px] h-[300px] mb-7" />
                        <Button onClick={() => handleClick()} variant="contained" className="w-full absolute bottom-0" color="primary" >
                            Xem bài học
                        </Button>

                    </CardContent>
                </Card>

            </Stack>
        </Stack>



        <PayPal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
}

export default CourseDetailPage;