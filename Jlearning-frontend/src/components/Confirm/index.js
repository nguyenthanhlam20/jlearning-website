import { Dialog, Stack, DialogContent, DialogContentText, DialogTitle, Button, SvgIcon } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
const ConfirmDialog = ({ isOpen, title, description, handleAction, disableClose, closeText }) => {

    return <>
        <Dialog open={isOpen} >
            <DialogTitle sx={{ textTransform: "uppercase" }}>{title}</DialogTitle>
            <DialogContent>
                <Stack direction={"column"} spacing={5}>
                    <DialogContentText>
                        {description}
                    </DialogContentText>
                    <Stack direction={"row"} spacing={2}>


                        {disableClose === true ? <></> :
                            <Button onClick={() => handleAction(false)} variant="contained" className="w-full absolute bottom-0" color="error" >

                                <SvgIcon sx={{ mr: 1 }}>
                                    <CloseIcon />
                                </SvgIcon> Hủy
                            </Button>}


                        <Button onClick={() => handleAction(true)} variant="contained" className="w-full absolute bottom-0" color="primary" >

                            <SvgIcon sx={{ mr: 1 }}>
                                <ThumbUpAlt />
                            </SvgIcon> {closeText ? closeText : " Tiếp tục" } 
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    </>
}

export default ConfirmDialog;