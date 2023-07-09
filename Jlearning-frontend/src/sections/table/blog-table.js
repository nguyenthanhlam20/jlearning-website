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
  SvgIcon,
  Chip
} from '@mui/material';
import { Scrollbar } from '../../components/ScrollBar';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ConfirmDialog from '../../components/Confirm';
import { deleteBlog } from '../../redux/blogSlice';
import { ROUTE_CONSTANTS } from '../../constants/route.constants';

export const BlogTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    categories,
  } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = React.useState(null);
  const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);

  const handleConfirmDelete = (status) => {
    if (status === true) {
      dispatch(deleteBlog({ blog_id: currentId }));
    }
    setIsOpenConfirm(false);
  }

  const handleEditBlog = (id) => {
    navigate(ROUTE_CONSTANTS.ADMIN_BLOG_DETAILS_PAGE + "?blog_id=" + id);
  }

  const handleDeleteBlog = (id) => {
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
                  Tiêu đề
                </TableCell>
                <TableCell>
                  Số mục
                </TableCell>
                <TableCell>
                  Thời gian tạo
                </TableCell>
                <TableCell>
                  Loại tin tức
                </TableCell>
                <TableCell>
                  Mô tả
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
              {items.map((blog) => {
                const hours = Math.floor(blog.duration / 60);
                const minutes = blog.duration % 60;


                return (
                  <TableRow
                    hover
                    key={blog?.blog_id}
                  >

                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >

                        <Typography variant="subtitle2">
                          {blog?.blog_name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {blog?.blog_details.length}
                    </TableCell>

                    <TableCell>
                      {new Date(blog?.created_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip color='default' label={categories?.find((category) => category.blog_category_id === blog.blog_category_id).name} />
                    </TableCell>



                    <TableCell>
                      <Typography sx={{ overflow: "auto", width: 300, height: 45 }}> {blog?.blog_description}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip color={blog?.status === true ? 'success' : 'error'} label={blog?.status === true ? 'Công khai' : 'Khóa'} />
                    </TableCell>
                    <TableCell sx={{ width: 200 }}>
                      <Button size="small"  onClick={() => handleEditBlog(blog?.blog_id)} sx={{ mr: 1 }} variant="contained" className='bg-primary' >

                        <SvgIcon  >
                          <PencilIcon />
                        </SvgIcon>
                      </Button>
                      <Button size="small"  onClick={() => handleDeleteBlog(blog?.blog_id)} variant="contained" className='bg-pink-500' >
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


    <ConfirmDialog isOpen={isOpenConfirm} description={"Tin tức sẽ bị xóa, bạn có muốn tiếp tục?"} title={"Xác nhận xóa tin tức"} handleAction={handleConfirmDelete} />
  </>
  );
};

