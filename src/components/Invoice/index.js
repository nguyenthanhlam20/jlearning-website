import { Avatar, Button, Card, CardContent, CardHeader, Chip, Container, Divider, Grid, Stack, SvgIcon, Typography } from "@mui/material";
import AppInput from "../AppInput/AppInput";
import AppInputPhone from "../AppInput/AppInputPhone";
import AppDatePicker from "../AppInput/AppDatePicker";
import AppTextArea from "../AppInput/AppTextArea";
import { useDispatch, useSelector } from "react-redux";
import HandThumbUpIcon from "@heroicons/react/24/solid/HandThumbUpIcon";
import EmailIcon from '@mui/icons-material/Email';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BookIcon from '@mui/icons-material/Book';
import AlarmIcon from '@mui/icons-material/Alarm';
import React from "react";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants/route.constants";
import paymentSlice, { createPayment } from "../../redux/paymentSlice";
import { toast } from "react-toastify";

const Invoice = ({ course }) => {
    const user = (useSelector((state) => state.authen.user));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getTotalLesson = () => {
        let count = 0;
        if (course !== null) {
            const chapters = course?.chapters;
            for (let i = 0; i < chapters.length; i++) {
                count += chapters[i].lessons.length;
            }
        }
        return count;
    }

    const [values, setValues] = React.useState({
        name: user?.name,
        address: user?.address ? user?.address : '',
        year_of_birth: user?.year_of_birth ? user?.year_of_birth : 1990,
        phone: user?.phone ? user?.phone : '',
        email: user?.email,
        course_id: course?.course_id,
        course_name: course?.course_name,
        price: course?.price,
        created_date: new Date(),
    });

    React.useEffect(() => {
        setValues({
            name: user?.name,
            address: user?.address ? user?.address : '',
            year_of_birth: user?.year_of_birth ? user?.year_of_birth : 1990,
            phone: user?.phone ? user?.phone : '',
            email: user?.email,
            course_id: course?.course_id,
            course_name: course?.course_name,
            price: course?.price,
            created_date: new Date(),
        });
    }, [course])

    const { resetPayment } = paymentSlice.actions;
    const paymentUrl = useSelector((state) => state.payment.url);

    const goToPayment = localStorage.getItem("goToPayment");
    if (goToPayment > 0) {
        dispatch(resetPayment());
    }

    React.useEffect(() => {
        if (paymentUrl !== null && paymentUrl !== '' && paymentUrl !== undefined) {
            window.location.href = paymentUrl;

            if (!goToPayment) {
                localStorage.setItem("goToPayment", 1);
            } else {
                localStorage.setItem("goToPayment", parseInt(goToPayment) + 1);
            }
        }
    }, [paymentUrl, goToPayment]);

    const handlePayment = async () => {
        if (values.name.trim() === '') {
            toast.warning("Chưa nhập tên");
            return;
        }

        if (values.phone.trim() === '') {
            toast.warning("Chưa nhập số điện thoại");
            return;
        }

        if (values.phone.trim().length !== 10) {
            toast.warning("Số điện thoại không hợp lệ");
            return;
        }


        if (values.address.trim() === '') {
            toast.warning("Chưa nhập địa chỉ");
            return;
        }


        const paymentDetails = {
            ...values,
            bankCode: '', // Optional bank code
            orderDescription: 'Payment for goods', // The order description
            orderType: '', // Optional order type
            language: 'vn', // Language preference
            ipAddr: window.location.hostname,
        }

        dispatch(createPayment(paymentDetails));
    };



    const handleChangeValue = (key, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    };

    const handleCancelBuy = () => {
        navigate(ROUTE_CONSTANTS.HOME_PAGE);
    }

    return (<>


        <Container className=' mb-24 block' >
            <Stack spacing={3}>

                <div >
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            xs={12}
                            md={6}
                            lg={4}
                            className="rounded-md"
                            sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }}
                        >
                            <div className="relative   flex w-full flex-col  bg-white bg-clip-border text-gray-700 ">
                                <div className="relative mx-4  -mt-6 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                                    <img
                                        src={course?.course_avatar_url}
                                        alt="img-blur-shadow"

                                    />
                                </div>
                                <Divider className='h-4' />
                                <Stack direction={"column"} spacing={2} sx={{ p: 3 }}>
                                    <Typography>
                                        <Stack direction={"row"} spacing={1}>
                                            <SvgIcon color="primary">
                                                <BookIcon />
                                            </SvgIcon>
                                            <div className="block text-base font-medium text-black">{course?.course_name}</div>
                                        </Stack>
                                    </Typography>
                                    <Typography>
                                        <Stack direction={"row"} spacing={1}>
                                            <SvgIcon color="primary">
                                                <AttachMoneyIcon />
                                            </SvgIcon>
                                            <div>{new Intl.NumberFormat('vi-VN').format(Number(course?.price)) + '₫'}</div>
                                        </Stack>
                                    </Typography>
                                    <Typography>
                                        <Stack direction={"row"} spacing={1}>
                                            <SvgIcon color="primary">
                                                <AlarmIcon />
                                            </SvgIcon>
                                            <div>{course?.duration + " tháng"}</div>
                                        </Stack>
                                    </Typography>
                                    <Typography>
                                        <Stack direction={"row"} spacing={1}>
                                            <SvgIcon color="primary">
                                                <OndemandVideoIcon />
                                            </SvgIcon>
                                            <div>{getTotalLesson() + " bài học"}</div>
                                        </Stack>
                                    </Typography>
                                </Stack>
                            </div>

                        </Grid>
                        <Grid
                            xs={12}
                            md={6}
                            lg={8}
                        >
                            <Card sx={{ ml: 3, pt: 2, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }} >

                                <CardContent className='h-[394px]' sx={{ pb: 5 }} >
                                    <CardHeader title="Thông tin cá nhân" />
                                    <Stack direction={"column"} spacing={2}>
                                        <Stack direction={"row"} spacing={2} className='w-full'>

                                            <AppInput height={""} value={values.name} title={"name"} handleChangeValue={handleChangeValue} placeholder={"Tên đầy đủ"} />
                                            <AppInputPhone value={values.phone} title={"phone"} handleChangeValue={handleChangeValue} placeholder={"Số điện thoại"} />
                                        </Stack>
                                        <Stack className='w-full' direction={"row"} spacing={2}>
                                            <Chip sx={{ borderRadius: 1, height: 36, paddingLeft: "8px", justifyContent: "left" }} className='w-full' color='default' icon={<EmailIcon />} label={"Email: " + values.email} />
                                            <AppDatePicker value={values.year_of_birth} title={"year_of_birth"} handleChangeValue={handleChangeValue} placeholder={"Ngày sinh"} />
                                        </Stack>

                                        <Stack direction={"row"} spacing={2}>
                                            <AppTextArea height={"h-[180px]"} value={values.address} title={"address"} handleChangeValue={handleChangeValue} placeholder={"Địa chỉ"} />

                                        </Stack>
                                    </Stack>
                                </CardContent>
                                <Divider />
                            </Card>

                        </Grid>
                    </Grid>
                </div>
                <div className='w-full flex justify-end'>
                    <Stack direction={"row"} spacing={2}>
                        <Button onClick={handleCancelBuy} color='error' variant="contained" className='w-[280px]'>
                            <SvgIcon className='mr-2'>
                                <XMarkIcon />
                            </SvgIcon> Hủy
                        </Button>
                        <Button onClick={handlePayment} color='primary' variant="contained" className='w-[280px]'>
                            <SvgIcon className='mr-2'>
                                <CurrencyExchangeIcon />
                            </SvgIcon> Thanh Toán
                        </Button>
                    </Stack>
                </div>
            </Stack>
        </Container>

    </>);
}

export default Invoice;