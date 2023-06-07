import { Card, Container, Paper, Stack, SvgIcon } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BookIcon from '@mui/icons-material/Book';
import AlarmIcon from '@mui/icons-material/Alarm';
import InfoIcon from '@mui/icons-material/Info';
import { ROUTE_CONSTANTS } from "../../constants/route.constants";
const RelatedCourse = ({
    image,
    title,
    price,
    description,
    courseId,
}) => {
    const link = ROUTE_CONSTANTS.COURSE_DETAILS_PAGE + "?course_id=" + courseId;
    const navigate = useNavigate();

    return (
        <Paper sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;", p: 2, cursor: "pointer" }} >
            <div className="flex items-top lg:block xl:flex" onClick={() => navigate(link)}>
                <div className="mr-5 ">
                    <img className="rounded" src={image} alt={title} width={200} height={200} />
                </div>
                <div className="w-full">

                    <Stack direction={"column"} spacing={2}>
                        <p className="text-xs font-medium text-body-color">
                            <Stack direction={"row"} spacing={1} className="flex items-center">
                                <SvgIcon color="primary">
                                    <BookIcon />
                                </SvgIcon>
                                <div
                                    className=" block text-base font-medium leading-snug text-black "
                                >
                                    {title}
                                </div>
                            </Stack>
                        </p>
                        <p className="text-xs font-medium text-body-color">
                            <Stack direction={"row"} spacing={1} className="flex items-center">
                                <SvgIcon color="primary">
                                    <InfoIcon />
                                </SvgIcon>
                                <div className="leading-snug "> {description}</div>
                            </Stack>
                        </p>
                        <p className="text-xs font-medium text-body-color">
                            <Stack direction={"row"} spacing={1} className="flex items-center">

                                <SvgIcon color="primary">
                                    <AttachMoneyIcon />
                                </SvgIcon>
                                <div className="leading-snug">
                                    {new Intl.NumberFormat('vi-VN').format(Number(price)) + '₫'}
                                </div>
                            </Stack>
                        </p>

                    </Stack>
                </div>
            </div>

        </Paper>
    );
};

export default RelatedCourse;
