import React, { useCallback, useState } from 'react';
import {
    Box, Button, CardContent, Card, Container, Stack, Dialog, DialogTitle
    , DialogContent, Divider, CardHeader, SvgIcon
} from '@mui/material';
import { SupportTable } from '../../sections/table/support-table';
import AppInput from '../../components/AppInput/AppInput';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useDispatch } from 'react-redux';
import { deleteSupport, insertSupport, updateSupport } from '../../redux/supportSlice';
import { ACTION_TYPE } from '../../constants/constants';
import ConfirmDialog from '../Confirm';
import AppTextArea from '../AppInput/AppTextArea';

const ListSupport = ({ data }) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [supports, setSupports] = useState(data);
    const [supportsPagination, setSupportsPagination] = useState(supports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [currentSupport, setCurrentSupport] = useState(null);
    const [searchTerm, setSearchTerm] = React.useState({ value: '' });
    const [actionType, setActionType] = React.useState(ACTION_TYPE.INSERT);
    const [values, setValues] = React.useState({
        support_name: '',
        message: '',
    })

    // console.log(data);

 

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    const handlePageChange = useCallback(
        (value) => {
            setPage(value);
            setSupportsPagination(supports.slice(value * rowsPerPage, value * rowsPerPage + rowsPerPage))
        },
        []
    );


    const handleChangeValue = (key, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    };


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
            if (supports.length < endIndex) endIndex = supports.length;


            setSupportsPagination(supports.slice(0, endIndex))
        },
        []
    );

    React.useEffect(() => {
        const result = data.filter((support) => support?.support_name.toLowerCase().includes(searchTerm.value.toLowerCase()));
        setSupports(result);
        setPage(0);
        setRowsPerPage(5);

        let endIndex = 5;
        if (result.length < endIndex) endIndex = result.length;

        setSupportsPagination(result.slice(0, endIndex))
    }, [searchTerm.value])


    const handleClearSearch = () => {
        setSearchTerm({
            value: ''
        });
    }

    const handleSubmit = () => {
        if (actionType === ACTION_TYPE.INSERT) {
            dispatch(insertSupport(values));
        } else {

            const newValues = {
                ...values,
                support_id: currentSupport.support_id
            }
            console.log(newValues);
            dispatch(updateSupport(newValues));
        }
        setIsOpenModal(false);
    }

    const handleDeleteSupport = (status) => {
        console.log(currentSupport);
        if (status === true) {
            dispatch(deleteSupport(currentSupport));
        }
        setIsOpenConfirmModal(false);
    }


    React.useEffect(() => {
        if (currentSupport !== null) {
            setValues(currentSupport);
        }
    }, [currentSupport]);

    return (
        <>

            <Box
                className='ml-72'
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 0
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3} sx={{ mt: 3 }}>
                        <Card sx={{ p: 2, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}>
                            <div className='flex flex-row justify-between'>
                                <Stack direction={"row"} spacing={2}>
                                    <div className="w-96 ">
                                        <AppInput value={searchTerm.value} handleChangeValue={handleChangeSearchTerm} placeholder={"Tìm kiếm hỗ trợ"} title={"value"} />
                                    </div>
                                    {searchTerm.value != '' ? <Button
                                        onClick={handleClearSearch}
                                        variant='contained' size='medium' color='error' >
                                        Xóa
                                    </Button> : <></>}
                                </Stack>
                                <Button onClick={() => {
                                    setActionType(ACTION_TYPE.INSERT);
                                    setIsOpenModal(true);

                                }} variant='contained' color='primary'>
                                    <SvgIcon sx={{ mr: 1 }}>
                                        <PlusIcon />
                                    </SvgIcon>
                                    Thêm mới hỗ trợ
                                </Button>
                            </div>
                        </Card>
                        {supports.length > 0 ? <SupportTable
                            count={supports.length}
                            items={supportsPagination}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            setIsOpenModal={setIsOpenModal}
                            setIsOpenConfirmModal={setIsOpenConfirmModal}
                            isOpenModal={isOpenModal}
                            setActionType={setActionType}
                            setCurrentSupport={setCurrentSupport}
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


            <Dialog maxWidth="md" fullWidth open={isOpenModal} onClose={handleCloseModal}>
                <DialogTitle >Thêm mới hỗ trợ</DialogTitle>
                <DialogContent sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;', p: 0, pb: 2, height: 380, width: "100%" }} dividers>

                    <Box sx={{ p: 5 }}>
                        <Stack direction={"column"} spacing={2}>
                            <div>
                                <AppInput placeholder={"Tiêu đề"} value={values.support_name} title={"support_name"} handleChangeValue={handleChangeValue} />
                            </div>
                            <div className='h-[170px]' >
                            <AppTextArea height={"h-[160px]"} value={values.message} title={"message"} handleChangeValue={handleChangeValue} placeholder={"Nội dung"} />

                            </div>
                            <div className='w-full flex justify-end'>
                                <Button variant="contained" sx={{ mr: 2 }} title='Hủy' className='bg-cteal' onClick={handleCloseModal}>
                                    Hủy
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    variant="contained" color='primary'>
                                    Lưu
                                </Button>
                            </div>
                        </Stack>

                    </Box>

                </DialogContent>

            </Dialog>
            <ConfirmDialog title={"Xác nhận xóa hỗ trợ"} description={"Hỗ trợ sẽ bị khóa. Bạn có muốn tiếp tục?"} isOpen={isOpenConfirmModal} handleAction={handleDeleteSupport} />

        </>
    );
};


export default ListSupport;
