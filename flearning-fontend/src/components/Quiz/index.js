import { Card, Stack, CardContent, Typography, Button } from "@mui/material";
import React from "react";

const Quiz = ({ quiz }) => {
    const [answer, setAnswer] = React.useState(0);

    const handleChooseAnswer = (value) => {
        setAnswer(value);
    }
    return <>
        <Card sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: 2 }}>
            <CardContent>
                <Stack direction={"column"} spacing={3} >
                    <div className="flex flex-row justify-between">
                        <Typography>Câu hỏi 1</Typography>
                        <Typography>1/20</Typography>
                    </div>
                    <Typography className="overflow-auto h-[100px]" >Nội dung câu hỏi</Typography>
                    <Stack direction={"column"} spacing={3}>
                        <Stack direction={"row"} spacing={3}>
                            <Button  onClick={() => handleChooseAnswer(1)} className="w-full h-[50px]" variant={answer === 1? "contained" : "outlined"}>Outlined</Button>
                            <Button onClick={() => handleChooseAnswer(2)} className="w-full h-[50px]" variant={answer === 2? "contained" : "outlined"}>Outlined</Button>

                        </Stack>
                        <Stack direction={"row"} spacing={3}>
                            <Button onClick={() => handleChooseAnswer(3)} className="w-full h-[50px]" variant={answer === 3? "contained" : "outlined"}>Outlined</Button>
                            <Button onClick={() => handleChooseAnswer(4)} className="w-full h-[50px]" variant={answer === 4? "contained" : "outlined"}>Outlined</Button>

                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    </>
}

export default Quiz;