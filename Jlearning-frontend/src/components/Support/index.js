import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import React from "react";
import { Stack } from "@mui/system";
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
const Support = ({ data }) => {

    const [expanded, setExpanded] = React.useState('');

    const handleChange =
        (panel) => (event, newExpanded) => {
            setExpanded(newExpanded ? panel : false);
        };

    return <>
        <Stack direction={"column"} spacing={4} sx={{p: 10, pt: 1}}>
            <h2 className="font-bold text-4xl text-center">Câu Hỏi Thường Gặp</h2>
            <Card className="w-full" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                <CardContent>
                    <div >
                        {data?.map((support) => {
                            return <Accordion expanded={expanded === 'panel' + support.support_id} onChange={handleChange('panel' + support.support_id)}>
                                <AccordionSummary aria-controls={"panel1d-" + support.support_id + "content"} id={"panel" + support.support_id + "d-header"}>
                                    <Typography>{support.support_name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p className="whitespace-pre-wrap overflow-auto max-h-[400px]" >{support.message}</p>
                                </AccordionDetails>
                            </Accordion>
                        })}


                    </div>
                </CardContent>
            </Card>
        </Stack>
    </>
};

export default Support;