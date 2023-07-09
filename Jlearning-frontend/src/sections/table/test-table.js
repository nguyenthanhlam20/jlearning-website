import React from 'react';
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Typography,
  SvgIcon
} from '@mui/material';
import { Scrollbar } from '../../components/ScrollBar';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ConfirmDialog from '../../components/Confirm';
import { deleteTest } from '../../redux/testSlice';
import { ROUTE_CONSTANTS } from '../../constants/route.constants';

export const TestTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = React.useState(null);
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);

  const handleConfirmDelete = (status) => {
    if (status === true) {
      dispatch(deleteTest({ test_id: currentId }));
    }
    setIsOpenConfirm(false);
  }

  const handleEditTest = (id) => {
    navigate(ROUTE_CONSTANTS.ADMIN_TEST_DETAILS + "?test_id=" + id);
  }

  const handleDeleteTest = (id) => {
    setIsOpenConfirm(true);
    setCurrentId(id);
  }

  return (<>
    <Card sx={{ height: 450, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}   >
      <Scrollbar>
        <Box sx={{ minWidth: 800, maxHeight: 450 }}>
          <Table stickyHeader >
            <TableHead>
              <TableRow>

                <TableCell>
                  Tên
                </TableCell>
                <TableCell>
                  Số câu hỏi
                </TableCell>
                <TableCell>
                  Thời gian
                </TableCell>
                <TableCell>
                  Khóa học
                </TableCell>
                <TableCell>
                  Chương
                </TableCell>
                <TableCell>
                  Mô tả
                </TableCell>
                <TableCell>
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((test) => {
               const hours = Math.floor(test.duration / 60);
               const minutes = test.duration % 60;


                return (
                  <TableRow
                    hover
                    key={test?.test_id}
                  >

                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >

                        <Typography variant="subtitle2">
                          {test?.test_name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {test?.questions.length}
                    </TableCell>
                    <TableCell>
                      {hours + "h " + minutes + "m" }
                    </TableCell>

                    <TableCell>
                      {test?.course_name}
                    </TableCell>
                    <TableCell>
                      {test?.chapter_name}
                    </TableCell>
                    <TableCell>
                     <Typography sx={{overflow: "auto", width: 300}}> {test?.description}</Typography>
                    </TableCell>
                    <TableCell sx={{ width: 200 }}>
                      <Button size="small" onClick={() => handleEditTest(test?.test_id)} sx={{ mr: 1 }} variant="contained" className='bg-primary' >

                        <SvgIcon  >
                          <PencilIcon />
                        </SvgIcon>
                      </Button>
                      <Button size="small"  onClick={() => handleDeleteTest(test?.test_id)} variant="contained" className='bg-pink-500' >
                        <SvgIcon  >
                          <TrashIcon />
                        </SvgIcon>
                      </Button>
                    </TableCell>


                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>

    </Card>

    <Card sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}>
      <TablePagination
        component="div"
        count={count}
        onPageChange={(event, number) => onPageChange(number)}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        labelDisplayedRows={({ from, to, count }) => `Hiện thị từ ${from}-${to} trong tổng số ${count} bản ghi`}
        boundaryCount={4}
        labelRowsPerPage={"Số bản ghi"}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>


    <ConfirmDialog isOpen={isOpenConfirm} description={"Bài kiểm tra sẽ bị xóa, bạn có muốn tiếp tục?"} title={"Xác nhận xóa bài kiểm tra"} handleAction={handleConfirmDelete} />
  </>
  );
};

