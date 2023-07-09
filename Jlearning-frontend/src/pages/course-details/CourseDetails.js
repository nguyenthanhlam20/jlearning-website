import Breadcrumb from "../../components/Common/Breadcrumb";
import { Button, Card, CardContent, CardHeader, Dialog, DialogContent, DialogContentText, DialogTitle, List, ListItem, Stack, SvgIcon } from "@mui/material";
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
import { useSelector } from "react-redux";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SmoothScrollUp from "../../components/Common/SmoothScrollUp";
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
const CourseDetails = ({ course }) => {
    const userCourses = useSelector((state) => state.course.userCourses);
    const courseFound = userCourses?.find((c) => c.course_id === course?.course_id);
    const isBought = ((courseFound !== null && courseFound !== undefined) || course?.price === 0) ? true : false;

    const navigate = useNavigate();
    const handleClick = () => {
        // setIsOpen(true);
        if (isBought === true) {
            navigate(ROUTE_CONSTANTS.LESSON_VIEW_PAGE + "?course_id=" + course?.course_id);
        } else {
            navigate(ROUTE_CONSTANTS.PAYMENT + "?course_id=" + course?.course_id);
        }
    }


    const [isOpen, setIsOpen] = React.useState(false);

    const [expanded, setExpanded] = React.useState('');

    const handleChange =
        (panel) => (event, newExpanded) => {
            setExpanded(newExpanded ? panel : false);
        };
    return <>
        <SmoothScrollUp />
        <Breadcrumb pageName={"Thông tin khóa học"} description={"Xem thông tin về khóa học"} />
        <Stack sx={{ width: "100%", padding: "100px", paddingTop: "0px", display: "flex", flexDirection: "column", justifyContent: "center" }} direction={"column"} spacing={3}>
            <Stack direction={"column"} spacing={3}>
                <h2 className="font-bold text-4xl text-center">{course?.course_name}</h2>
                <p className="text-center">{course?.description}</p>

            </Stack>
            <Stack direction={"row"} spacing={3}>

                <Card className="w-full" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                    <CardHeader title="Danh sách chương và bài học" />
                    <CardContent>
                        <div className="overflow-auto max-h-[350px]">
                            {course?.chapters.map((chapter) => {
                                return <Accordion expanded={expanded === 'panel' + chapter.chapter_id} onChange={handleChange('panel' + chapter.chapter_id)}>
                                    <AccordionSummary aria-controls={"panel1d-" + chapter.chapter_id + "content"} id={"panel" + chapter.chapter_id + "d-header"}>
                                        <Typography>{chapter.chapter_name}: {chapter.description}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <List sx={{ width: '100%', p: 0, m: 0, bgcolor: 'background.paper' }}>
                                                {chapter.lessons.map((lesson, key) => {
                                                    return <ListItem>
                                                        <Typography variant="subtitle2">{"Bài " + (key + 1) + ": " + lesson.lesson_name}</Typography>

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
                    <CardContent className="w-full h-full flex flex-col justify-between ">
                        <img src={course?.course_avatar_url} className="w-[750px] h-[350px] mb-7" />
                        {isBought === true ?
                            <Button onClick={() => handleClick()} variant="contained" color="primary" >
                                <SvgIcon sx={{ mr: 1 }}>
                                    <EyeIcon />
                                </SvgIcon> Vào học
                            </Button> : <Button onClick={() => handleClick()} variant="contained" color="primary" >
                                <SvgIcon >
                                    <AttachMoneyIcon />
                                </SvgIcon>
                                Mua khóa học
                            </Button>}

                    </CardContent>
                </Card>

            </Stack>
        </Stack>



    </>
}

export default CourseDetails;