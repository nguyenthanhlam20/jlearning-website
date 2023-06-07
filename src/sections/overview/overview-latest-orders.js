import { format } from 'date-fns';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BookIcon from '@mui/icons-material/Book';
import AlarmIcon from '@mui/icons-material/Alarm';
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../constants/route.constants';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const OverviewLatestOrders = (props) => {
  const navigate = useNavigate();
  const { payments = [], sx } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentPayment, setCurrentPayment] = React.useState(null);
  const [currentCourse, setCurrentCourse] = React.useState(null);
  const courses = useSelector((state) => state.course.data);

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
  const getTotalLesson = () => {
    let count = 0;
    if (currentCourse !== null) {
      const chapters = currentCourse?.chapters;
      for (let i = 0; i < chapters.length; i++) {
        count += chapters[i].lessons.length;
      }
    }
    return count;
  }


  const getInvoiceId = (id) => {
    const idStr = new String(id);

    let str = "#00000";
    const result = str.slice(0, str.length - idStr.length);
    console.log(result);
    return result + id;

  }
  return (
    <>
      <Card sx={sx}>
        <CardHeader title="10 Giao Dịch Mới Nhất" />
        <Box sx={{ minWidth: 800, maxHeight: 450, overflow: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  Hóa đơn
                </TableCell>
                <TableCell>
                  Người mua
                </TableCell>
                <TableCell sortDirection="desc">
                  Ngày tạo
                </TableCell>
                <TableCell>
                  Trạng thái
                </TableCell>
                <TableCell>
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody  >
              {payments.map((payment) => {

                return (
                  <TableRow
                    hover
                    key={payment.payment_id}
                  >

                    <TableCell>
                      {getInvoiceId(payment.payment_id)}
                    </TableCell>
                    <TableCell>
                      {payment.name}
                    </TableCell>
                    <TableCell sx={{ width: 200 }}>
                      {new Date(payment.created_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ width: 200 }}>
                      <Chip color='success' variant='conatined' label="Đã thanh toán" />
                    </TableCell>
                    <TableCell sx={{ width: 150 }} >
                      <Button
                        onClick={() => {
                          setIsOpenModal(true);
                          setCurrentPayment(payment);
                        }}

                        variant='contained' color='primary' size='small' >
                        <SvgIcon>
                          <EyeIcon />
                        </SvgIcon>
                      </Button>
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            color="inherit"
            endIcon={(
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            )}
            size="small"
            variant="text"
            onClick={() => navigate(ROUTE_CONSTANTS.ADMIN_INVOICE_PAGE)}
          >
            Xem tất cả
          </Button>
        </CardActions>
      </Card>

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
