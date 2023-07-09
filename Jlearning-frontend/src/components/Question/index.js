import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@heroicons/react/24/solid/ArrowSmallDownIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import { useDispatch } from "react-redux";
import { Button, Stack, SvgIcon } from "@mui/material";
import ConfirmDialog from "../Confirm";
import { deleteQuestion } from "../../redux/questionSlice";
import testSlice from "../../redux/testSlice";
import AppInput from "../AppInput/AppInput";
const Question = ({ question, title, index, setCurrentQuestion }) => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const [isDeleteQuestion, setIsDeleteQuestion] = React.useState(false);

   

    const { setIsRefreshSpecific } = testSlice.actions;
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

    const handleDeleteQuestion = (status) => {
        if (status == true) {
            dispatch(deleteQuestion({ question_id: question.question_id }));
            dispatch(setIsRefreshSpecific(true));
        }

        setIsDeleteQuestion(false);
    }



    return <>
        <div className="p-1">
            <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                <AccordionSummary
                    expandIcon={<SvgIcon>
                        <ExpandMoreIcon />
                    </SvgIcon>}
                    sx={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;"}}
                    aria-controls="panel1bh-content"
                    id={'panel-header' + index}
                >
                    <Typography sx={{ width: '15%', flexShrink: 0 }}>
                        {title}:
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}> {question.description}</Typography>

                </AccordionSummary>
                <AccordionDetails sx={{ p: 3 }}>
                    <Stack direction={"column"} spacing={3}>
                        <Stack direction={"row"} spacing={1}>

                            <Button sx={{ fontSize: 12 }} variant="contained" className='bg-primary'
                           
                           onClick={() => setCurrentQuestion(question)}
                           >
                                <SvgIcon sx={{ fontSize: 18, mr: 1 }} >
                                    <PencilIcon />
                                </SvgIcon> Chỉnh sửa câu hỏi
                            </Button>
                            <Button onClick={() => setIsDeleteQuestion(true)} sx={{ fontSize: 12 }} variant="contained" className='bg-pink-500' >
                                <SvgIcon sx={{ fontSize: 18, mr: 1 }} >
                                    <TrashIcon />
                                </SvgIcon> Xóa câu hỏi
                            </Button>
                        </Stack>
                        <Stack direction={"column"} spacing={2}>
                            <Stack direction={"row"} spacing={2}>
                                <AppInput
                                    disabled={true}
                                    value={question.answer_1}
                                    placeholder={"Câu trả lời 1"} />
                                <AppInput
                                    disabled={true}
                                    value={question.answer_2}
                                    placeholder={"Câu trả lời 2"} />
                            </Stack>
                            <Stack direction={"row"} spacing={2}>
                                <AppInput
                                    disabled={true}
                                    value={question.answer_3}
                                    placeholder={"Câu trả lời 3"} />
                                <AppInput
                                    disabled={true}
                                    value={question.answer_4}
                                    placeholder={"Câu trả lời 4"} />
                            </Stack>
                        </Stack>
                        <AppInput
                                    disabled={true}
                                    value={`Câu trả lời ${question.correct_answer}`}
                                    placeholder={"Đáp án đúng"} />
                        <AppInput
                                    disabled={true}
                                    value={`${question.explaination}`}
                                    placeholder={"Giải thích"} />
                    </Stack>

                </AccordionDetails>
            </Accordion>
            <ConfirmDialog title={"Xác nhận xóa câu hỏi"} description={"Câu hỏi sẽ bị xóa! Bạn có muốn tiếp tục?"} isOpen={isDeleteQuestion} handleAction={handleDeleteQuestion} />
        </div>
    </>
}

export default Question;