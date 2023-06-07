import { useState } from 'react';
import {
  Button, Container, Stack, Grid
  , Card, CardContent, Divider, SvgIcon, CardHeader, Avatar, Chip
} from '@mui/material';
import React from "react";
import FileUploader from '../../components/FileUploader';
import AvatarDefault from "../../assets/images/avatar_default.jpeg";
import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';
import Breadcrumb from '../../components/Common/Breadcrumb';
import AppInput from '../../components/AppInput/AppInput';
import AppDatePicker from '../../components/AppInput/AppDatePicker';
import AppRadioButton from '../../components/AppInput/AppRadioButton';
import EmailIcon from '@mui/icons-material/Email';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../../redux/userSlice';
import authenSlice from '../../redux/authenSlice';
import AppTextArea from '../../components/AppInput/AppTextArea';
import AppInputPhone from '../../components/AppInput/AppInputPhone';
import SmoothScrollUp from '../../components/Common/SmoothScrollUp';



const AccountPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authen.user);
  const [currentFile, setCurrentFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [disableSubmit, setDisableSubmit] = React.useState(false);
  const { setUser } = authenSlice.actions;

  const [values, setValues] = useState({
    name: user?.name,
    address: user?.address,
    year_of_birth: user?.year_of_birth ? user?.year_of_birth : 1990,
    phone: user?.phone,
    email: user?.email,
    gender: user?.gender === true || user?.gender === 1 ? 1: 0,
    avatar_url: user?.avatar_url,
  });

  const handleSubmitInfo = () => {
    dispatch(updateInfo(values));
    dispatch(setUser(values));
  }

  React.useEffect(() => {
    if (currentFile?.url != undefined) {
      // window.alert(currentFile?.url);
      setValues(prevValues => ({
        ...prevValues,
        avatar_url: currentFile?.url
      }));
    }

    setDisableSubmit(false);
  }, [currentFile]);


  const handleChangeValue = (key, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [key]: value
    }));
  };

  return <>   
   <SmoothScrollUp />

    <Breadcrumb
      pageName="Thông tin cá nhân"
      description="Cập nhật thông tin cá nhân của bạn"
    />
    <Container className='mt-12 mb-24 block' sx={{ height: 400 }}>
      <Stack spacing={3}>

        <div >
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <Card sx={{ pt: 2, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className=" w-96 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className='w-full flex justify-center' >
                  <Avatar src={previewUrl == null ? (values?.avatar_url != null ? values?.avatar_url : AvatarDefault) : previewUrl}
                    sx={{ width: 200, height: 200 }}
                  />
                </div>
                <Divider className='h-4' />
                <FileUploader
                  setDisableSubmit={setDisableSubmit}
                  setCurrentFile={setCurrentFile}
                  firebaseFolderName={"course/images"} setPreviewUrl={setPreviewUrl} />
              </Card>

            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={8}
            >
              <Card sx={{ ml: 3, pt: 2, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }} >

                <CardContent className='h-[394px]' sx={{ pb: 5 }} >
                  <CardHeader title="Thông tin cá nhân" />
                  <Stack direction={"column"} spacing={2}>
                    <Stack direction={"row"} spacing={2} className='w-full'>

                      <AppInput height={""} value={values.name} title={"name"} handleChangeValue={handleChangeValue} placeholder={"Tên đầy đủ"} />
                      <AppInputPhone value={values.phone} title={"phone"} handleChangeValue={handleChangeValue} placeholder={"Số điện thoại"} />
                    </Stack>
                    <Stack className='w-full' direction={"row"} spacing={2}>
                      <Chip sx={{ borderRadius: 1, height: 36, paddingLeft: "8px", justifyContent: "left" }} className='w-full' color='default' icon={<EmailIcon />} label={"Email: " + values.email} />
                      <AppDatePicker value={values.year_of_birth} title={"year_of_birth"} handleChangeValue={handleChangeValue} placeholder={"Ngày sinh"} />
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <AppRadioButton value={values.gender} handleChangeValue={handleChangeValue} />
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <AppTextArea height={"h-[120px]"} value={values.address} title={"address"} handleChangeValue={handleChangeValue} placeholder={"Địa chỉ"} />

                    </Stack>
                  </Stack>
                </CardContent>
                <Divider />
              </Card>

            </Grid>
          </Grid>
        </div>
        <div className='w-full flex justify-end'>
          <Button disabled={disableSubmit} onClick={handleSubmitInfo} color='primary' variant="contained" className='w-[150px] ml-3'>
            <SvgIcon className='mr-2'>
              <HandThumbUpIcon />
            </SvgIcon> Lưu
          </Button>
        </div>
      </Stack>
    </Container>
  </>
};



export default AccountPage;
