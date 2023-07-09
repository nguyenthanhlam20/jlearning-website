import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@heroicons/react/24/solid/ArrowSmallDownIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import { useDispatch } from "react-redux";
import { Button, Stack, SvgIcon } from "@mui/material";
import ConfirmDialog from "../Confirm";
import { deleteBlogDetail } from "../../redux/blogDetailSlice";
import blogDetailSlice from "../../redux/blogDetailSlice";
import AppInput from "../AppInput/AppInput";
import blogSlice from "../../redux/blogSlice";
import BlogImageDefault from "../../assets/images/blog/blog-default.png";

const BlogDetails = ({ blogDetail, setCurrentBlogDetail, index }) => {

    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const [isDeleteBlogDetail, setIsDeleteBlogDetail] = React.useState(false);



    const { setIsRefreshSpecific } = blogSlice.actions;
    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };


    const handleDeleteBlogDetail = (status) => {
        if (status == true) {
            dispatch(deleteBlogDetail({ blog_details_id: blogDetail.blog_details_id }));
            dispatch(setIsRefreshSpecific(true));
        }

        setIsDeleteBlogDetail(false);
    }


    return (
        <div className="p-1">
            <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                <AccordionSummary
                    expandIcon={<SvgIcon>
                        <ExpandMoreIcon />
                    </SvgIcon>}
                    sx={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;" }}
                    aria-controls="panel1bh-content"
                    id={'panel-header' + index}
                >
                    
                    <Typography sx={{ width: '10%', flexShrink: 0 }}>
                        <img src={blogDetail.blog_img_url.trim() === '' ? BlogImageDefault : blogDetail.blog_img_url} width={50} height={50} />
                    </Typography>
                    <Typography sx={{ width: '90%', flexShrink: 0 }}>
                    <p className="whitespace-nowrap overflow-auto max-w-[650px]" >{blogDetail.header}</p>
                    </Typography>

                </AccordionSummary>
                <AccordionDetails sx={{ p: 3 }}>
                    <Stack direction={"column"} spacing={3}>
                        <Stack direction={"row"} spacing={1}>

                            <Button sx={{ fontSize: 12 }} variant="contained" className='bg-primary'

                                onClick={() => setCurrentBlogDetail(blogDetail)}
                            >
                                <SvgIcon sx={{ fontSize: 18, mr: 1 }} >
                                    <PencilIcon />
                                </SvgIcon> Chỉnh sửa mục
                            </Button>
                            <Button onClick={() => setIsDeleteBlogDetail(true)} sx={{ fontSize: 12 }} variant="contained" className='bg-pink-500' >
                                <SvgIcon sx={{ fontSize: 18, mr: 1 }} >
                                    <TrashIcon />
                                </SvgIcon> Xóa mục
                            </Button>
                        </Stack>

                        <Stack direction={"row"} spacing={3}>
                        <img src={blogDetail.blog_img_url.trim() === '' ? BlogImageDefault : blogDetail.blog_img_url} className="w-[200px] h-full" />
                      
                             <Stack direction={"column"} spacing={3}>
                                <p className="whitespace-pre-wrap overflow-auto max-h-[140px]" >{blogDetail.description}</p>
                            </Stack>
                        </Stack>
                    </Stack>

                </AccordionDetails>
            </Accordion>
            <ConfirmDialog title={"Xác nhận xóa câu hỏi"} description={"Câu hỏi sẽ bị xóa! Bạn có muốn tiếp tục?"} isOpen={isDeleteBlogDetail} handleAction={handleDeleteBlogDetail} />
        </div>
    )
}

export default BlogDetails;