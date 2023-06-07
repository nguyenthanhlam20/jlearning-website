import { Card, Stack, CardContent, Typography, Button } from "@mui/material";
import React from "react";

const QuestionCard = ({ question, index, totalQuestion, handleSetValue, answers, showExplaination }) => {
    const questionNumber = index + 1;
    const [answer, setAnswer] = React.useState(answers ? answers[index] : 0);
    const handleChooseAnswer = (value) => {
        handleSetValue(index, value);
        setAnswer(value);
    }
    return <>
        <Card sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: 2 }}>
            <CardContent>
                <Stack direction={"column"} spacing={3} >
                    <div className="flex flex-row justify-between">
                        <Typography>{"Câu " + questionNumber}</Typography>
                        {answers ? <>
                            {answers[index] !== undefined ? <>
                                {answers[index] === question.correct_answer ?
                                    <Typography color={"green"}>Đúng</Typography> :
                                    <Typography color={"red"}>Sai</Typography>}
                            </> : <Typography color={"red"}>Chưa chọn</Typography>}
                        </> : <></>}
                        <Typography>{questionNumber + "/" + totalQuestion}</Typography>
                    </div>
                    <Typography className="overflow-auto h-[40px]" >{question.description}</Typography>
                   {showExplaination === true && question.explaination.trim() !== '' ?  <Typography className="overflow-auto h-[40px] text-red-600" >{"* Giải thích: " +  question.explaination}</Typography> : <></>}
                    <Stack direction={"column"} spacing={3}>
                        <Stack direction={"row"} spacing={3}>
                            <Button sx={{textTransform: "unset"}} disabled={answers ? true : false} onClick={() => handleChooseAnswer(1)} className="w-full h-[50px]" variant={answer === 1 ? "contained" : "outlined"}>{question.answer_1}</Button>
                            <Button sx={{textTransform: "unset"}} disabled={answers ? true : false} onClick={() => handleChooseAnswer(2)} className="w-full h-[50px]" variant={answer === 2 ? "contained" : "outlined"}>{question.answer_2}</Button>

                        </Stack>
                        <Stack direction={"row"} spacing={3}>
                            <Button sx={{textTransform: "unset"}} disabled={answers ? true : false} onClick={() => handleChooseAnswer(3)} className="w-full h-[50px]" variant={answer === 3 ? "contained" : "outlined"}>{question.answer_3}</Button>
                            <Button sx={{textTransform: "unset"}} disabled={answers ? true : false} onClick={() => handleChooseAnswer(4)} className="w-full h-[50px]" variant={answer === 4 ? "contained" : "outlined"}>{question.answer_4}</Button>

                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    </>
}

export default QuestionCard;