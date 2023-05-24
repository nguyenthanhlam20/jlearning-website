import { AppBar, Button, Dialog, DialogContent, IconButton, List, Toolbar, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import React from "react";
import ConfirmDialog from "../Confirm";
import Quiz from "../Quiz";
import { Stack } from "@mui/system";
const Transition = React.forwardRef(function Transition(
    props,
    ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const TestDialog = (props) => {
    const { isOpen, setIsOpen, test } = props;
    const [openReturnConfirm, setOpenReturnConfirm] = React.useState(false);
    const [openSubmitConfirm, setOpenSubmitConfirm] = React.useState(false);
    const [countdown, setCountdown] = React.useState(60 * 30);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(countdown => countdown - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    React.useEffect(() => {
        if (countdown === 0) {
            // Do something when the countdown is over
        }
    }, [countdown]);

    React.useEffect(() => {
        setCountdown(60 * 30);
    }, [isOpen]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return [hours, minutes, secs]
            .map(time => time.toString().padStart(2, '0'))
            .join(':');
    };
    const handleSubmitTest = () => {

    }

    const handleClose = () => {

        setIsOpen(false)
    }
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
        } else {
            setOpenSubmitConfirm(false);
        }
    }

    const handleOpenConfirm = () => {
        setOpenReturnConfirm(true)
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
                        <CloseIcon />
                    </IconButton>
                    <div className="flex justify-between items-center w-full" >
                        <Typography sx={{ cursor: "pointer" }} onClick={handleOpenConfirm} variant="h6" component="div">
                            Trở lại khóa học
                        </Typography>
                        <Stack className="w-[120px] mr-[90px]" spacing={0} direction={"column"}>
                            <Typography className="w-full text-center"  >
                                Bài kiểm tra 1
                            </Typography>
                            <Typography className="w-full text-center" >
                                {formatTime(countdown)}
                            </Typography>
                        </Stack>
                        <Button   color="inherit" onClick={() => setOpenSubmitConfirm(true)}>
                            Nộp bài
                        </Button> </div>
                </Toolbar>
            </AppBar>

            <div className="p-28 pl-64 pr-64 back bg-quiz"  >
                <Stack direction={"column"} spacing={8}>
                    <Stack direction={"column"} spacing={5}>
                        <Quiz />
                        <Quiz />
                        <Quiz />
                        <Quiz />

                    </Stack>
                    <div className="flex justify-center w-full" >
                        <Button className="w-[300px] h-[50px]" variant="contained" onClick={() => setOpenSubmitConfirm(true)} >Nộp Bài</Button>
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
    </>
}

export default TestDialog;