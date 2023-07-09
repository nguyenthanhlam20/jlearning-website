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
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import { ACTION_TYPE } from '../../constants/constants';

export const SupportTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange,
    setActionType,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    setIsOpenModal,
    setIsOpenConfirmModal,
    setCurrentContact,
    setCurrentSupport,
    isOpenModal
  } = props;

  const [currentId, setCurrentId] = React.useState(null);

  const handleContact = () => {
    var support = items.find(item => item.support_id === currentId);
    setCurrentContact(support);

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
                  Tiêu đề
                </TableCell>
                <TableCell>
                  Nội dung
                </TableCell>

                <TableCell>
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((support) => {


                return (
                  <TableRow
                    hover
                    key={support?.support_id}
                  >

                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >

                        <Typography sx={{ overflow: "auto", textAlign: "left", height: 50, width: 200 }} variant="subtitle2">
                          {support?.support_name}
                        </Typography>
                      </Stack>
                    </TableCell>


                    <TableCell>
                      <Typography sx={{ overflow: "auto", height: 45 }} variant="subtitle2">
                        {support?.message}
                      </Typography>

                    </TableCell>
                    <TableCell sx={{ width: 120 }} >
                      <Stack direction={"row"} spacing={1}>
                        <Button
                          onClick={() => {
                            setCurrentSupport(support);
                            setIsOpenModal(true);
                            setActionType(ACTION_TYPE.UPDATE);
                          }}
                          variant='contained' color='primary'>
                          <SvgIcon>
                            <PencilIcon />
                          </SvgIcon>
                        </Button>
                        <Button
                          onClick={() => {
                            setCurrentSupport(support);
                            setIsOpenConfirmModal(true);
                          }}
                          variant='contained' color='primary'>
                          <SvgIcon>
                            <TrashIcon />
                          </SvgIcon>
                        </Button>
                      </Stack>
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

