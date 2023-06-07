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
  Chip,
  Typography,
  SvgIcon
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Scrollbar } from '../../components/ScrollBar';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';

export const ContactTable = (props) => {
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
    var contact = items.find(item => item.contact_id === currentId);
    setCurrentContact(contact);

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
                  Thời gian gửi
                </TableCell>

                <TableCell>
                  Nội dung
                </TableCell>
                <TableCell>
                  Trạng thái
                </TableCell>

                <TableCell>
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((contact) => {


                return (
                  <TableRow
                    hover
                    key={contact?.contact_id}
                  >

                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >

                        <Typography variant="subtitle2">
                          <p style={{ whiteSpace: "nowrap", width: 170, overflow: "auto" }} >
                            {contact?.name}
                          </p>

                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <p style={{ whiteSpace: "nowrap", width: 220, overflow: "auto" }} >
                        {contact?.email}
                      </p>

                    </TableCell>

                    <TableCell>
                      {new Date(contact?.request_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <p style={{ whiteSpace: "nowrap", width: 260, overflow: "auto" }} >
                        {contact?.request_message}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Chip color={contact?.status === true ? 'secondary' : 'error'} label={contact?.status === true ? 'Đã phản hồi' : 'Chưa phản hồi'} />
                    </TableCell>
                    <TableCell>
                      <Button size="small" sx={{ width: 140 }} onClick={() => setCurrentId(contact?.contact_id)} variant="contained" className='bg-primary '>

                        <SvgIcon sx={{ mr: 1 }}>
                          {contact?.status === true ? <PencilIcon /> : <ReplyIcon />}
                        </SvgIcon>  {contact?.status === true ? 'Chỉnh sửa' : 'Phản hồi'}

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
  </>
  );
};

