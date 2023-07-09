import AppInput from "../../../components/AppInput/AppInput";
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';

import { Button, Card, CardContent, CardHeader, Container, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, SvgIcon } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import blogSlice, { updateBlog } from "../../../redux/blogSlice";
import { ACTION_TYPE } from "../../../constants/constants";
import { Box, spacing } from "@mui/system";
import AppTextArea from "../../../components/AppInput/AppTextArea";
import BlogDetails from "../../../components/BlogDetails";
import AppSelect from "../../../components/AppInput/AppSelect";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { insertBlogDetail, updateBlogDetail } from "../../../redux/blogDetailSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../constants/route.constants";
import AppInputNumber from "../../../components/AppInput/AppInputNumber";
import AppCheckBox from "../../../components/AppInput/AppCheckBox";
import FileUploader from "../../../components/FileUploader";
import BlogImageDefault from "../../../assets/images/blog/blog-default.png";

const AdminBlogDetails = ({ blog, categories }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [disableSubmit, setDisableSubmit] = React.useState(false);
    const [disableSubmitBlogDetail, setDisableSubmitBlogDetail] = React.useState(false);
    const { setIsRefreshSpecific } = blogSlice.actions;
    const [isViewImage, setIsViewImage] = React.useState(true);
    const [currentFile, setCurrentFile] = React.useState(null);
    const [previewUrl, setPreviewUrl] = React.useState('');
    const [previewUrlBlogDetail, setPreviewUrlBlogDetail] = React.useState('');
    const [openBlogDetailModal, setOpenBlogDetailModal] = React.useState(false);
    const [actionType, setActionType] = React.useState(ACTION_TYPE.INSERT);
    const [currentBlogDetail, setCurrentBlogDetail] = React.useState();
    const [currentBlogDetailsFile, setCurrentBlogDetailsFile] = React.useState(null);
    const [blogDetail, setBlogDetail] = React.useState({
        header: '',
        description: '',
        blog_img_url: '',
        blog_id: blog?.blog_id
    });


    const [values, setValues] = React.useState({
        blog_avatar_url: blog?.blog_avatar_url,
        blog_id: blog?.blog_id,
        blog_name: blog?.blog_name,
        blog_description: blog?.blog_description,
        blog_category_id: blog?.blog_category_id,
        status: blog?.status,
    });

    React.useEffect(() => {
        setValues({
            blog_avatar_url: blog?.blog_avatar_url,
            blog_id: blog?.blog_id,
            blog_name: blog?.blog_name,
            blog_description: blog?.blog_description,
            blog_category_id: blog?.blog_category_id,
            status: blog?.status,

        });

        setBlogDetail({
            header: '',
            description: '',
            blog_img_url: '',
            blog_id: blog?.blog_id
        })
    }, [blog])



    const handleChangeValue = (key, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    };

    const handleChangeBlogDetailValue = (key, value) => {
        setBlogDetail(prevValues => ({
            ...prevValues,
            [key]: value
        }));
    }

    const handleUpdateBlog = () => {
        if (values.blog_name.trim() === '') {
            toast.warning("Chưa nhập tiêu đề tin tức");
            return;
        }

        if (values.blog_description.trim() === '') {
            toast.warning("Chưa nhập mô tả tin tức");
            return;
        }

        dispatch(updateBlog(values));
    }

    const handleSubmitBlogDetail = () => {

        if (blogDetail.header.trim() === '') {
            toast.warning("Chưa nhập tiêu đề mục");
            return;
        }


        if (blogDetail.description.trim() === '') {
            toast.warning("Chưa nhập nội dung mục");
            return;
        }


        if (actionType === ACTION_TYPE.UPDATE) {
            dispatch(updateBlogDetail(blogDetail));
        } else {
            dispatch(insertBlogDetail(blogDetail));
        }


        dispatch(setIsRefreshSpecific(true));

        setOpenBlogDetailModal(false);
    }

    React.useEffect(() => {
        if (currentFile !== null) {
            setValues(prevValues => ({
                ...prevValues,
                blog_avatar_url: currentFile.url
            }));
            setDisableSubmit(false);
        }
    }, [currentFile])


    React.useEffect(() => {
        if (currentBlogDetailsFile !== null) {
            setBlogDetail(prevValues => ({
                ...prevValues,
                blog_img_url: currentBlogDetailsFile.url
            }));
            setDisableSubmitBlogDetail(false);
        }
    }, [currentBlogDetailsFile])

    React.useEffect(() => {

        if (openBlogDetailModal === false) {
            setBlogDetail({
                header: '',
                description: '',
                blog_img_url: '',
                blog_id: blog?.blog_id
            });

            setCurrentBlogDetail(null);
            setPreviewUrlBlogDetail('');
        }
    }, [openBlogDetailModal])



    const handleReturnToList = () => {
        navigate(ROUTE_CONSTANTS.ADMIN_BLOG_PAGE);
    }

    React.useEffect(() => {
        if (currentBlogDetail !== null && currentBlogDetail !== undefined) {
            setOpenBlogDetailModal(true);
            setActionType(ACTION_TYPE.UPDATE);
            setBlogDetail({
                header: currentBlogDetail.header,
                description: currentBlogDetail.description,
                blog_img_url: currentBlogDetail.blog_img_url,
                blog_details_id: currentBlogDetail.blog_details_id,
                blog_id: blog?.blog_id
            })
        }
    }, [currentBlogDetail]);


    const handleCloseModal = () => {
        setOpenBlogDetailModal(false);
    }

    return (
        <>
            <Box className='ml-72 mt-4'
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 0
                }}>
                <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "row", height: 620 }}>
                    <Card className="w-full h-full mr-4" sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}>
                        <CardContent>
                            <Stack direction={"column"} spacing={2}>
                                <div >
                                    <Button variant="contained" className='bg-primary' onClick={() => {
                                        setOpenBlogDetailModal(true);
                                        setActionType(ACTION_TYPE.INSERT);
                                    }} >
                                        <SvgIcon sx={{ mr: 1 }}>
                                            <PlusIcon />
                                        </SvgIcon> Thêm mới mục
                                    </Button>
                                </div>
                                <Stack direction={"column"} sx={{ overflow: "auto", height: 520 }} spacing={0}>
                                    {blog?.blog_details?.map((blogDetail, key) => {
                                        return <><BlogDetails index={key} blogDetail={blogDetail} setCurrentBlogDetail={setCurrentBlogDetail} /></>;
                                    })}
                                </Stack>

                            </Stack>
                        </CardContent>
                    </Card>
                    <Card sx={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }} className=" w-[500px] h-full flex flex-col rounded bg-white bg-clip-border text-gray-700 shadow-md">
                        <div
                            onMouseLeave={() => setIsViewImage(true)}
                            onMouseEnter={() => setIsViewImage(false)}
                            className="h-full overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                            <img
                                className={`${isViewImage === false ? 'hidden' : 'block'}`}
                                src={previewUrl !== '' && previewUrl !== undefined ? previewUrl : values.blog_avatar_url}
                                alt="img-blur-shadow"

                            />
                            <div className={`${isViewImage === true ? 'hidden' : 'block'} pt-6`}>
                                <FileUploader
                                    id={"update-blog-image"}
                                    setDisableSubmit={setDisableSubmit}
                                    setCurrentFile={setCurrentFile}
                                    firebaseFolderName={"course/images"} setPreviewUrl={setPreviewUrl} />
                            </div>
                        </div>
                        <div className="p-4 h-full">
                            <Stack spacing={2} direction={"column"} className="h-full">
                                <AppInput value={values.blog_name} title={"blog_name"} handleChangeValue={handleChangeValue} placeholder={"Tiêu đề"} />
                                <AppSelect value={values.blog_category_id} data={categories} title={"blog_category_id"} display={"name"} placeholder={"Chọn loại tin tức"} handleChangeValue={handleChangeValue} />
                                <AppCheckBox value={values?.status} title={"status"} handleChangeValue={handleChangeValue} placeholder={"Công khai"} />
                                <AppTextArea height={"h-[120px]"} value={values.blog_description} title={"blog_description"} handleChangeValue={handleChangeValue} placeholder={"Mô tả"} />
                            </Stack>
                        </div>
                        <Stack className="m-4" direction={"row"} spacing={2} >
                            <Button disabled={disableSubmit} onClick={handleReturnToList} color='success' variant="contained" className='w-[150px]'>
                                <SvgIcon className='mr-2' >
                                    <ArrowLeftIcon />
                                </SvgIcon> Trở lại
                            </Button>
                            <Button disabled={disableSubmit} variant="contained" onClick={handleUpdateBlog} className='bg-primary w-[150px]'>
                                <SvgIcon className="mr-2">
                                    <HandThumbUpIcon />
                                </SvgIcon> Lưu
                            </Button>
                        </Stack>
                    </Card>
                </Container>
            </Box>
            <Dialog open={openBlogDetailModal} fullWidth maxWidth="lg" >
                <DialogTitle sx={{ textTransform: "uppercase" }}>Thêm mới đề mục</DialogTitle>
                <DialogContent sx={{ p: 4 }}>
                    <Container className='mt-10' maxWidth="lg" sx={{ height: 450 }}>
                        <Stack direction={"column"} spacing={3}>

                            <div>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        xs={12}
                                        md={6}
                                        lg={4}
                                    >
                                        <div style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }} className="relative  flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                            <div className="relative mx-4  -mt-6 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                                                <img
                                                    src={previewUrlBlogDetail === '' ? blogDetail.blog_img_url !== '' ? blogDetail.blog_img_url : BlogImageDefault : previewUrlBlogDetail}
                                                    alt="img-blur-shadow"

                                                />
                                            </div>
                                            <Divider className='h-4' />
                                            <FileUploader
                                                id={"upload-blog-detail-image"}
                                                setDisableSubmit={setDisableSubmitBlogDetail}
                                                setCurrentFile={setCurrentBlogDetailsFile}
                                                firebaseFolderName={"blog/images"} setPreviewUrl={setPreviewUrlBlogDetail} />
                                        </div>

                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                        lg={8}
                                    >
                                        <Card sx={{ ml: 3, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }} >

                                            <CardHeader title="Đề mục" />
                                            <CardContent className='h-[330px]' sx={{ pb: 5 }} >
                                                <Stack direction={"column"} spacing={2}>
                                                    <AppInput height={""} value={blogDetail?.header} title={"header"} handleChangeValue={handleChangeBlogDetailValue} placeholder={"Tiêu đề"} />
                                                    <AppTextArea height={"h-[230px]"} value={blogDetail?.description} title={"description"} handleChangeValue={handleChangeBlogDetailValue} placeholder={"Nội dung"} />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className='w-full flex justify-end'>
                                <div className='w-[320px] flex justify-between'>
                                    <Button disabled={disableSubmitBlogDetail} color='error' variant="contained" className=' w-[150px]' onClick={handleCloseModal}>

                                        <SvgIcon className='mr-2'>
                                            <XMarkIcon />
                                        </SvgIcon> Hủy
                                    </Button>
                                    <Button disabled={disableSubmitBlogDetail} onClick={handleSubmitBlogDetail} color='primary' variant="contained" className='w-[150px] ml-3'>
                                        <SvgIcon className='mr-2'>
                                            <HandThumbUpIcon />
                                        </SvgIcon> Lưu
                                    </Button>
                                </div>
                            </div>
                        </Stack>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    )


}

export default AdminBlogDetails;