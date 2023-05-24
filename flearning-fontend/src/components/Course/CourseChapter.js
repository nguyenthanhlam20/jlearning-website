import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@heroicons/react/24/solid/ArrowSmallDownIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

import {
    Button, Stack, SvgIcon,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import CourseLessonModal from "./CourseLessonModal";
import ConfirmDialog from "../Confirm";
import { useDispatch } from "react-redux";
import { deleteChapter } from "../../redux/chapterSlice";
import courseSlice from "../../redux/courseSlice";
import { ACTION_TYPE } from "../../constants/constants";
import { deleteLesson } from "../../redux/lessonSlice";


const CourseChapter = ({ chapter, setIsAddChapter, setCurrentChapter, setActionTypeChapter }) => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const [isAddLesson, setIsAddLesson] = React.useState(false);
    const [isDeleteChapter, setIsDeleteChapter] = React.useState(false);
    const [isDeleteLesson, setIsDeleteLesson] = React.useState(false);
    const [isActionTypeLesson, setActionTypeLesson] = React.useState(ACTION_TYPE.INSERT);
    const { setIsRefreshSpecific } = courseSlice.actions;

    const [currentLesson, setCurrentLesson] = React.useState();
    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    const getDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

    }

    const handleConfirmDeleteChapter = (value) => {
        if (value == true) {

            dispatch(deleteChapter({ chapter_id: chapter.chapter_id }));
            dispatch(setIsRefreshSpecific(true));
        }
        setIsDeleteChapter(false);
    }

    const handleConfirmDeleteLesson = (value) => {
        if (value == true) {
            
            dispatch(deleteLesson({lesson_id: currentLesson.lesson_id}));
            dispatch(setIsRefreshSpecific(true));
        } 
        setIsDeleteLesson(false);
    }

    return (
        <div className="p-1">
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<SvgIcon>
                        <ExpandMoreIcon />
                    </SvgIcon>}
                    sx={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" }}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {chapter.chapter_name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}> {chapter.description}</Typography>

                </AccordionSummary>
                <AccordionDetails sx={{ p: 3 }}>
                    <Stack direction={"row"} spacing={1}>
                        <Button sx={{ fontSize: 12 }} variant="contained" className='bg-primary' onClick={() => setIsAddLesson(true)}>

                            <SvgIcon sx={{ fontSize: 18, mr: 1 }} >
                                <PlusIcon />
                            </SvgIcon>Thêm mới bài học
                        </Button>
                        <Button sx={{ fontSize: 12 }} variant="contained" className='bg-pink-500' onClick={() => setIsDeleteChapter(true)}>
                            <SvgIcon sx={{ fontSize: 18, mr: 1 }} >
                                <TrashIcon />
                            </SvgIcon> Xóa chương
                        </Button>
                        <Button sx={{ fontSize: 12 }} variant="contained" className='bg-primary' onClick={() => 
                        
                        {
                            setActionTypeChapter(ACTION_TYPE.UPDATE);
                            setCurrentChapter(chapter);
                            setIsAddChapter(true);
                        }
                        }>
                            <SvgIcon sx={{ fontSize: 18, mr: 1 }} >
                                <PencilIcon />
                            </SvgIcon> Chỉnh sửa chương
                        </Button>
                    </Stack>

                    {chapter.lessons.length > 0 ? <TableContainer sx={{ maxHeight: 210, mt: 2 }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: 200 }}>Tên bài học</TableCell>
                                    <TableCell >Mô tả</TableCell>
                                    {/* <TableCell sx={{ width: 110 }}>Thời lượng</TableCell> */}
                                    <TableCell align="center" sx={{ width: 100 }} >Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {chapter.lessons.map((row) => (
                                    <TableRow
                                        key={row.lessonId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.lesson_name}
                                        </TableCell>
                                        <TableCell >{row.description}</TableCell>
                                        {/* <TableCell >{getDuration(row.lesson_duration)}</TableCell> */}
                                        <TableCell>
                                            <Stack direction={"row"} spacing={1}>
                                                <Button
                                                    variant="contained" size="small" className='bg-pink-500' onClick={() => {
                                                        setActionTypeLesson(ACTION_TYPE.UPDATE);
                                                        setCurrentLesson(row);
                                                        setIsDeleteLesson(true);
                                                    }
                                                    }
                                                >
                                                    <SvgIcon sx={{ fontSize: 18 }} >
                                                        <TrashIcon />
                                                    </SvgIcon>
                                                </Button>
                                                <Button variant="contained" size="small" className='bg-primary' onClick={() => {

                                                    setCurrentLesson(row);
                                                    setIsAddLesson(true);
                                                }
                                                }
                                                >
                                                    <SvgIcon sx={{ fontSize: 18 }} >
                                                        <PencilIcon />
                                                    </SvgIcon>
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> : <></>}


                </AccordionDetails>
            </Accordion>
            <CourseLessonModal currentLesson={currentLesson} actionType={isActionTypeLesson} chapterId={chapter.chapter_id} isOpenModal={isAddLesson} handleCloseModal={() => setIsAddLesson(false)} />
            <ConfirmDialog title={"Xác nhận xóa chương"} description={"Chương và tất cả khóa học trong chương sẽ bị xóa! Bạn có muốn tiếp tục?"} isOpen={isDeleteChapter} handleAction={handleConfirmDeleteChapter} />
            <ConfirmDialog title={"Xác nhận xóa bài học"} description={"Tất cả thông tin liên quan tới bài học sẽ bị xóa! Bạn có muốn tiếp tục?"} isOpen={isDeleteLesson} handleAction={handleConfirmDeleteLesson} />
        </div>

    );
}

export default CourseChapter;