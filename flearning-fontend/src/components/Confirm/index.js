import { Dialog, Stack, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const ConfirmDialog = ({ isOpen, title, description, handleAction }) => {

    return <>
        <Dialog open={isOpen} >
            <DialogTitle sx={{ textTransform: "uppercase" }}>{title}</DialogTitle>
            <DialogContent>
                <Stack direction={"column"} spacing={5}>
                    <DialogContentText>
                        {description}
                    </DialogContentText>
                    <Stack direction={"row"} spacing={2}>
                        <Button onClick={() => handleAction(false)} variant="contained" className="w-full absolute bottom-0" color="error" >
                            Hủy
                        </Button>
                        <Button onClick={() => handleAction(true)} variant="contained" className="w-full absolute bottom-0" color="primary" >
                            Tiếp tục
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    </>
}

export default ConfirmDialog;