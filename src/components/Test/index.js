import { AppBar, Button, Dialog, DialogContent, IconButton, List, SvgIcon, Toolbar, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import React from "react";
import ConfirmDialog from "../Confirm";
import QuestionCard from "../QuestionCard";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack } from "@mui/system";
const Transition = React.forwardRef(function Transition(
    props,
    ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const TestDialog = ({ isOpen, setIsOpen, setOpenTestResult, test, setTestAnswers, handleTestDone }) => {
    const [openReturnConfirm, setOpenReturnConfirm] = React.useState(false);
    const [openSubmitConfirm, setOpenSubmitConfirm] = React.useState(false);
    const [isTimeOut, setOpenTimeOut] = React.useState(false);
    const [countdown, setCountdown] = React.useState(test?.duration * 60);

    const [answers, setAnswers] = React.useState([]);

    React.useEffect(() => {
        if (isOpen === true) {
            const intervalId = setInterval(() => {
                setCountdown(countdown => countdown - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [isOpen]);

    React.useEffect(() => {
        if (countdown === 0) {
            setOpenTimeOut(true);
            setCountdown(0);
        } 
    }, [countdown]);

    const handleCloseTimeout = (value) => {
        setOpenTimeOut(false);
        setIsOpen(false);

        setTestAnswers(answers);
        setOpenTestResult(true);

        handleTestDone();
    }

    React.useEffect(() => {
        setCountdown(test?.duration * 60);
        setAnswers([]);
    }, [isOpen]);

    const formatTime = (seconds) => {
      if(seconds >= 0) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return [hours, minutes, secs]
            .map(time => time.toString().padStart(2, '0'))
            .join(':');
      } else {
        return "00:00:00";
      }
    };

    const handleConfirmReturnAction = (value) => {
        if (value == true) {
            setOpenReturnConfirm(false);
            setIsOpen(false);
        } else {
            setOpenReturnConfirm(false);
        }
    }
    const handleConfirmSubmitAction = (value) => {
        if (value == true) {
            setOpenSubmitConfirm(false);
            setIsOpen(false);

            setTestAnswers(answers);
            setOpenTestResult(true);

            handleTestDone();

        } else {
            setOpenSubmitConfirm(false);
        }
    }

    const handleOpenConfirm = () => {
        setOpenReturnConfirm(true)
    }

    const handleSetValue = (index, value) => {

        if (index < answers.length) {
            answers[index] = value;
        } else {
            answers.push(value);
        }
        console.log("answers: ", answers);

    }

    return <>
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleOpenConfirm}

            sx={{ zIndex: 999 }}
            TransitionComponent={Transition}
        >

            <AppBar sx={{ position: 'relative', position: "fixed" }}>
                <Toolbar>

                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleOpenConfirm}
                        aria-label="close"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <div className="flex justify-between items-center w-full" >
                        <Typography sx={{ cursor: "pointer" }} onClick={handleOpenConfirm} variant="h6" component="div">
                            Trở lại khóa học
                        </Typography>
                        <Stack className="w-[120px] mr-[90px]" spacing={0} direction={"column"}>
                            <Typography className="w-full text-center"  >
                                {test?.test_name}
                            </Typography>
                            <Typography className="w-full text-center" >
                                {formatTime(countdown)}
                            </Typography>
                        </Stack>
                        <Button color="inherit" onClick={() => setOpenSubmitConfirm(true)}>

                            <SvgIcon sx={{ mr: 1 }}>
                                <ThumbUpAltIcon />
                            </SvgIcon> Nộp bài
                        </Button> </div>
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
                                        handleSetValue={handleSetValue}
                                    />
                                </div>
                            );
                        })}




                    </Stack>
                    <div className="flex justify-center w-full" >
                        <Button className="w-[300px] h-[50px]" variant="contained" onClick={() => setOpenSubmitConfirm(true)} >
                            <SvgIcon sx={{ mr: 1 }}>
                                <ThumbUpAltIcon />
                            </SvgIcon> Nộp bài

                        </Button>
                    </div>
                </Stack>
            </div>

        </Dialog>

        <ConfirmDialog
            isOpen={openReturnConfirm}
            title={"Quay trở lại khóa học"}
            description={"Dữ liệu về bài kiểm tra sẽ bị mất? Bạn có muốn tiếp tục?"} handleAction={handleConfirmReturnAction} />

        <ConfirmDialog
            isOpen={openSubmitConfirm}
            title={"Nộp bài kiểm tra"}
            description={"Bài kiểm tra sẽ được nộp? Bạn có muốn tiếp tục?"} handleAction={handleConfirmSubmitAction} />

        <ConfirmDialog
            isOpen={isTimeOut}
            closeText="OK"
            title={"Hết thời gian"}
            disableClose={true}
            description={"Thời gian làm bài đã kết thúc!"} handleAction={handleCloseTimeout} />
    </>
}

export default TestDialog;