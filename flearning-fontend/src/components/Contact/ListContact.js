import React, { useCallback, useMemo, useState } from 'react';
import {
    Box, Button, CardContent, Card, Container, Stack, Dialog, DialogTitle
    , DialogContent, Divider, CardHeader, SvgIcon
} from '@mui/material';
import { ContactTable } from '../../sections/table/contact-table';
import AppInput from '../../components/AppInput/AppInput';
import AppTextArea from '../AppInput/AppTextArea';


const ListContact = ({ data }) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [contacts, setContacts] = useState(data);

    const [contactsPagination, setContactsPagination] = useState(contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [currentContact, setCurrentContact] = useState();
    const [requestMessage, setRequestMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [searchTerm, setSearchTerm] = React.useState({ value: '' });

    React.useEffect(() => {
        setContacts(data);
        setContactsPagination(data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    }, [data]);

    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    const handlePageChange = (value) => {
        setPage(value);
        setContactsPagination(contacts.slice(value * rowsPerPage, value * rowsPerPage + rowsPerPage));
    }

    const handleChangeValue = (value) => {
        setResponseMessage(value);
    }
    const handleChangeSearchTerm = (key, value) => {

        setSearchTerm({
            [key]: value
        });
    }

    const handleRowsPerPageChange = (event) => {
        setPage(0);
        const rows = event.target.value;
        setRowsPerPage(rows);

        let endIndex = rowsPerPage;
        if (contacts.length < endIndex) endIndex = contacts.length;


        setContactsPagination(contacts.slice(0, endIndex));
    }

    React.useEffect(() => {
        const result = data.filter((contact) => contact.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
        setContacts(result);
        setPage(0);
        setRowsPerPage(5);

        let endIndex = 5;
        if (result.length < endIndex) endIndex = result.length;

        setContactsPagination(result.slice(0, endIndex))
    }, [searchTerm.value])


    const handleClearSearch = () => {
        setSearchTerm({
            value: ''
        });
    }
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
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Card sx={{ p: 2, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}>
                            <Stack direction={"row"} spacing={2}>
                                <div className="w-96 ">
                                    <AppInput value={searchTerm.value} handleChangeValue={handleChangeSearchTerm} placeholder={"Tìm kiếm liên hệ"} title={"value"} />
                                </div>
                                {searchTerm.value != '' ? <Button
                                    onClick={handleClearSearch}
                                    variant='contained' size='medium' color='error' >
                                    Xóa
                                </Button> : <></>}
                            </Stack>
                        </Card>
                        {contacts.length > 0 ? <ContactTable
                            count={contacts.length}
                            items={contactsPagination}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            setIsOpenModal={setIsOpenModal}
                            isOpenModal={isOpenModal}
                            setCurrentContact={setCurrentContact}
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


            <Dialog maxWidth="lg" fullWidth open={isOpenModal} onClose={handleCloseModal}>
                <DialogTitle >HỌC VIÊN "{currentContact?.name}"</DialogTitle>
                <DialogContent sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;', p: 0, pb: 2, height: 400, width: "100%" }} dividers>
                    <Stack spacing={3} sx={{ p: 3 }} direction={"row"}>

                        <Card sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;', p: 0, width: "100%", height: 270 }} >

                            <CardContent  >
                                <CardHeader title="Thông điệp" sx={{ p: 0, pb: 2 }} />

                                <span>
                                    {currentContact?.request_message}
                                </span>
                            </CardContent>
                        </Card>
                        <Card sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;', width: "100%", height: 270 }} >

                            <CardContent  >
                                <CardHeader title="Phản hồi" sx={{ p: 0, pb: 2 }} />
                                <AppTextArea height={"h-[180px]"} value={responseMessage} handleChangeValue={handleChangeValue} placeholder={"Phản hồi của bạn"} />

                                {/* <AppInput height={"h-[160px]"} value={responseMessage} handleChangeValue={handleChangeValue} placeholder={"Phản hồi của bạn"} /> */}
                            </CardContent>
                        </Card>
                    </Stack>
                    <div className='w-full  flex justify-end pr-6'>
                        <Button variant="contained" sx={{ mr: 2 }} title='Hủy' className='bg-cteal' onClick={handleCloseModal}>
                            Hủy
                        </Button>
                        <Button variant="contained" title={currentContact?.email != null ? 'Gửi phản hồi tới ' + currentContact?.email : 'Gửi phản hồi'} className='bg-primary'>
                            Gửi
                        </Button>
                    </div>
                </DialogContent>

            </Dialog>
        </>
    );
};


export default ListContact;
