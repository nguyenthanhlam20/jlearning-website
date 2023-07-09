
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogDetailServices } from "../services";
import { toast } from 'react-toastify';

export const insertBlogDetail = createAsyncThunk("insert-blogDetail", async (blogDetail) => {
    const response = await blogDetailServices.insertBlogDetail(blogDetail);
    return response;
});
export const updateBlogDetail = createAsyncThunk("update-blogDetail", async (blogDetail) => {
    const response = await blogDetailServices.updateBlogDetail(blogDetail);
    return response;
});
export const deleteBlogDetail = createAsyncThunk("delete-blogDetail", async (blogDetail) => {
    const response = await blogDetailServices.deleteBlogDetail(blogDetail);
    return response;
});

const blogDetailSlice = createSlice({
    name: "blog-details",
    initialState: {
        data: [],
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(insertBlogDetail.fulfilled, (state, action) => {
            toast.success("Thêm mục tin tức thành công");

        });
        builder.addCase(updateBlogDetail.fulfilled, (state, action) => {
            toast.success("Cập nhật mục tin tức thành công");

        });
        builder.addCase(deleteBlogDetail.fulfilled, (state, action) => {
            toast.success("Xóa mục tin tức thành công");
        });

       

    },
});

export default blogDetailSlice;
