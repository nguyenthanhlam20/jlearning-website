import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import AppInput from '../AppInput/AppInput';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';

const BlogTable = ({ blogs }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTearm] = React.useState({ value: '' });
  const [enableActionAdd, setEnableActionAdd] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Avoid a layout jump when reaching the last page with empty blogs.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - blogs.length) : 0;

  const handleChangeValue = (key, value) => {
    setSearchTearm({
      [key]: value
    })
  }

  React.useEffect(() => {
    
  }, [searchTerm.value])

  return <>
    <div className="p-2 pt-3 pb-0">
      <Stack direction="row" className="mt-2 ml-2" justifyContent="space-between">
        <div className="w-96 ">
          <AppInput placeholder={"Tìm kiếm tin tức"} title={"value"} handleChangeValue={handleChangeValue} value={searchTerm.value} />
        </div>
        <div >
          <Button
            onClick={() => setIsOpenModal(true)}
            className='bg-primary'
            startIcon={(
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            )}
            variant="contained"
          >
            Thêm mới tin tức
          </Button>
        </div>
      </Stack>
    </div>
    {blogs.length === 0 ? <Card sx={{ width: '100%', height: 470 }}>
      <CardContent sx={{ width: '100%', height: '100%' }} >
        <div className='mt-[200px] text-center text-xl font' >
          Không tìm thấy tin tức
        </div>

      </CardContent>

    </Card> : <Box sx={{ width: '100%', height: 470 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <TableHead>
              <TableRow>
                <TableCell >Ảnh</TableCell>
                <TableCell >Tên</TableCell>
                <TableCell >Loại Tin Tức</TableCell>
                <TableCell >Mô Tả</TableCell>
                <TableCell >Ngày Tạo</TableCell>
                <TableCell >Trạng Thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((row, index) => {

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    sx={{ cursor: 'pointer' }}
                  >


                    <TableCell >
                      <img src={row.blog_avatar_url} width={50} height={50} />
                    </TableCell>
                    <TableCell >{row.blog_name}</TableCell>
                    <TableCell >{row.blog_category}</TableCell>
                    <TableCell >{row.blog_description}</TableCell>
                    <TableCell >{row.created_date}</TableCell>
                    <TableCell >{row.status}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={blogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

    </Box>}
  </>;
}
export default BlogTable;