import React, { useCallback, useState } from 'react';
import {
    Button, Card, CardContent, CardHeader, Chip, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, Stack, SvgIcon, Typography
} from '@mui/material';
import { PaymentTable } from '../../sections/table/payment-table';
import AppInput from '../../components/AppInput/AppInput';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BookIcon from '@mui/icons-material/Book';
import AlarmIcon from '@mui/icons-material/Alarm';
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { Box } from '@mui/system';

const ListPayment = ({ data, user, courses }) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [payments, setPayments] = useState(data);

    const [paymentsPagination, setPaymentsPagination] = useState(payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [searchTerm, setSearchTerm] = React.useState({ value: '' });

   

    React.useEffect(() => {
        setPayments(data);
        setPaymentsPagination(payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    }, [data])


    const [currentPayment, setCurrentPayment] = React.useState(null);
    const [currentCourse, setCurrentCourse] = React.useState(null);
    console.log(data);

    React.useEffect(() => {

        if (currentPayment === null) {
            setCurrentCourse(null);
        } else {
            setCurrentCourse(courses.find((c) => c.course_id === currentPayment.course_id));
        }

    }, [currentPayment])



    const handleCloseModal = () => {
        setIsOpenModal(false);
        setCurrentPayment(null);

    }



    const handlePageChange = useCallback(
        (value) => {
            setPage(value);
            setPaymentsPagination(payments?.slice(value * rowsPerPage, value * rowsPerPage + rowsPerPage))
        },
        []
    );


    const handleChangeSearchTerm = (key, value) => {

        setSearchTerm({
            [key]: value
        });
    }

    const handleRowsPerPageChange = useCallback(
        (event) => {
            setPage(0);
            setRowsPerPage(event.target.value);

            let endIndex = rowsPerPage;
            if (payments?.length < endIndex) endIndex = payments?.length;


            setPaymentsPagination(payments?.slice(0, endIndex))
        },
        []
    );

    React.useEffect(() => {
        const result = data?.filter((payment) => payment?.course_name?.toLowerCase().includes(searchTerm?.value.toLowerCase()));
        setPayments(result);
        setPage(0);
        setRowsPerPage(5);

        let endIndex = 5;
        if (result?.length < endIndex) endIndex = result?.length;

        setPaymentsPagination(result?.slice(0, endIndex))
    }, [searchTerm.value])


    const handleClearSearch = () => {
        setSearchTerm({
            value: ''
        });
    }
    const getInvoiceId = (id) => {
        const idStr = new String(id);

        let str = "#00000";
        const result = str.slice(0, str?.length - idStr?.length);
        console.log(result);
        return result + id;

    }


    const getTotalLesson = () => {
        let count = 0;
        if (currentCourse !== null) {
            const chapters = currentCourse?.chapters;
            for (let i = 0; i < chapters?.length; i++) {
                count += chapters[i].lessons?.length;
            }
        }
        return count;
    }


    return (
        <>

            <Box

                component="main"
                sx={{
                    flexGrow: 1,
                    p: 5,
                    mb: 10
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Card sx={{ p: 2, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}>
                            <Stack direction={"row"} spacing={2}>
                                <div className="w-96 ">
                                    <AppInput value={searchTerm.value} handleChangeValue={handleChangeSearchTerm} placeholder={"Tìm kiếm lịch sử giao dịch"} title={"value"} />
                                </div>
                                {searchTerm.value != '' ? <Button
                                    onClick={handleClearSearch}
                                    variant='contained' size='medium' color='error' >
                                    Xóa
                                </Button> : <></>}
                            </Stack>
                        </Card>
                        {payments?.length > 0 ? <PaymentTable
                            count={payments?.length}
                            items={paymentsPagination}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            user={user}
                            courses={courses}
                            setIsOpenModal={setIsOpenModal}
                            setCurrentPayment={setCurrentPayment}
                        /> : <>

                            <Card sx={{ p: 2, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;", height: 525 }}>
                                <CardContent  >
                                    <div className='mt-[200px] text-center w-full h-full font-bold text-xl' >
                                        Không tìm thấy kết quả
                                    </div>
                                </CardContent>

                            </Card>
                        </>}

                    </Stack>
                </Container>
            </Box>

            <Dialog fullWidth maxWidth="lg" open={isOpenModal} >
                <DialogTitle >
                    <div className='flex justify-between'>
                        <p>
                            Hóa Đơn {getInvoiceId(currentPayment?.payment_id)}
                        </p>
                        <p className='text-body-color'>
                            Ngày tạo:  {new Date(currentPayment?.created_date).toLocaleDateString()}
                        </p>

                    </div>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 8, pl: 5, pr: 5, mb: 2 }}>
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
                                                src={currentCourse?.course_avatar_url}
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
                                                    <div className='block text-base font-medium text-black'>{currentCourse?.course_name}</div>
                                                </Stack>
                                            </Typography>
                                            <Typography>
                                                <Stack direction={"row"} spacing={1}>
                                                    <SvgIcon color="primary">
                                                        <AttachMoneyIcon />
                                                    </SvgIcon>
                                                    <div>{new Intl.NumberFormat('vi-VN').format(Number(currentCourse?.price)) + '₫'}</div>
                                                </Stack>
                                            </Typography>
                                            <Typography>
                                                <Stack direction={"row"} spacing={1}>
                                                    <SvgIcon color="primary">
                                                        <AlarmIcon />
                                                    </SvgIcon>
                                                    <div>{currentCourse?.duration + " tháng"}</div>
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
                                            <CardContent>
                                                <Stack direction={"column"} spacing={3}>
                                                    <p>Họ và tên: {currentPayment?.name}</p>
                                                    <p>Email: {currentPayment?.email}</p>
                                                    <p>Sđt: {currentPayment?.phone}</p>
                                                    <p>Địa chỉ: {currentPayment?.address}</p>
                                                    <p>
                                                        {"Trạng thái giao dịch:   "}
                                                        <Chip color="success" variant='filled' sx={{ width: 150 }} label={"Đã thanh toán"} />

                                                    </p>
                                                </Stack>
                                            </CardContent>
                                        </CardContent>
                                        <Divider />
                                    </Card>

                                </Grid>
                            </Grid>
                        </div>
                        <div className='w-full flex justify-end'>
                            <Stack direction={"row"} spacing={2}>
                                <Button onClick={handleCloseModal} color='error' variant="contained" className='w-[280px]'>
                                    <SvgIcon className='mr-2'>
                                        <XMarkIcon />
                                    </SvgIcon> Đóng
                                </Button>

                            </Stack>
                        </div>
                    </Stack>
                </DialogContent>
            </Dialog>


        </>
    );
};


export default ListPayment;
