import { AppBar, Button, Dialog, DialogContent, IconButton, List, SvgIcon, Toolbar, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import React from "react";
import ConfirmDialog from "../Confirm";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import RecyclingIcon from '@mui/icons-material/Recycling';
import QuestionCard from "../QuestionCard";
import { Stack } from "@mui/system";
const Transition = React.forwardRef(function Transition(
    props,
    ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const TestResultDialog = ({ isOpen, setIsOpen, setIsOpenTest, test, answers }) => {

    const getCorrectAnswer = () => {
        let count = 0;
        const questions = test.questions;
        for (let i = 0; i < questions.length; i++) {
            if (answers[i] !== undefined && questions[i].correct_answer === answers[i]) {
                count++;
            }
        }
        return count + "/" + questions.length;
    }

    const handleReturn = () => {
        setIsOpen(false);
    }

    const handleRetake = () => {
        setIsOpen(false);
        setIsOpenTest(true);
    }


    return <>
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleReturn}

            sx={{ zIndex: 999 }}
            TransitionComponent={Transition}
        >

            <AppBar sx={{ position: 'relative', position: "fixed" }}>
                <Toolbar>

                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleReturn}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <div className="flex justify-between items-center w-full" >
                        <Typography sx={{ cursor: "pointer" }} onClick={handleReturn} variant="h6" component="div">
                            Trở lại khóa học
                        </Typography>
                        <Stack className="w-[120px] mr-[50px]" spacing={0} direction={"column"}>
                            <Typography className="w-full text-center"  >
                                {" Kết quả: " + getCorrectAnswer()}
                            </Typography>

                        </Stack>
                    </div>
                </Toolbar>
            </AppBar>

            <div className="p-28 pl-64 pr-64 back bg-quiz"  >
                <Stack direction={"column"} spacing={8}>
                    <Stack direction={"column"} spacing={5}>

                        {test?.questions.map((question, key) => {
                            return (
                                <div key={"question-" + key}>
                                    <QuestionCard
                                        question={question}
                                        index={key}
                                        totalQuestion={test?.questions.length}
                                        answers={answers}
                                        showExplaination={true}
                                    />
                                </div>
                            );
                        })}




                    </Stack>
                    <Stack direction={"row"} spacing={2} className="flex justify-center w-full" >
                        <Button color="primary" className="w-[300px] h-[50px]" variant="contained" onClick={handleReturn} >

                            <SvgIcon sx={{ mr: 1 }}>
                                <KeyboardReturnIcon />
                            </SvgIcon> Quay trở lại khóa học
                        </Button>
                        <Button color="error" className="w-[300px] h-[50px]" variant="contained" onClick={handleRetake} >

                            <SvgIcon sx={{ mr: 1 }}>
                                <RecyclingIcon />
                            </SvgIcon> Làm lại
                        </Button>

                    </Stack>
                </Stack>
            </div>

        </Dialog>




    </>
}

export default TestResultDialog;