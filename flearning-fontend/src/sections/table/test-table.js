import React from 'react';
import {
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Chip,
  Typography
} from '@mui/material';
import { Scrollbar } from '../../components/ScrollBar';

export const TestTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    setIsOpenModal,
    setCurrentContact,
    isOpenModal
  } = props;

  const [currentId, setCurrentId] = React.useState(null);

  const handleContact = () => {
    var test = items.find(item => item.test_id === currentId);
    setCurrentContact(test);

    // alert(currentId);
    setIsOpenModal(true);
  }

  React.useEffect(() => {
    if (currentId !== null) {
      handleContact();
    }
  }, [currentId]);

  React.useEffect(() => {
    if (isOpenModal === false) {
      setCurrentId(null);
    }
  }, [isOpenModal]);



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
                  Email
                </TableCell>
                <TableCell>
                  Khóa học
                </TableCell>
                <TableCell>
                  Sao
                </TableCell>
                <TableCell>
                  Nội dung
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((test) => {


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
                          {test?.name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {test?.email}
                    </TableCell>

                    <TableCell>
                      {test?.course_name}
                    </TableCell>
                    <TableCell>
                      {test?.star}
                    </TableCell>
                    <TableCell>
                      {test?.message}
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
  </>
  );
};

