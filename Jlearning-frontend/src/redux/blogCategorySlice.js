
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogCategoryServices } from "../services";
import { toast } from 'react-toastify';

export const insertBlogCategory = createAsyncThunk("insert-blogCategory", async (blogCategory) => {
    const response = await blogCategoryServices.insertBlogCategory(blogCategory);
    return response;
});
export const updateBlogCategory = createAsyncThunk("update-blogCategory", async (blogCategory) => {
    const response = await blogCategoryServices.updateBlogCategory(blogCategory);
    return response;
});
export const deleteBlogCategory = createAsyncThunk("delete-blogCategory", async (blogCategory) => {
    const response = await blogCategoryServices.deleteBlogCategory(blogCategory);
    return response;
});
export const getBlogCategories = createAsyncThunk("get-blogCategorys", async () => {
    const response = await blogCategoryServices.getBlogCategories();
    return response;
});




const blogCategorySlice = createSlice({
    name: "blog-category",
    initialState: {
        data: [],
        isRefresh: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(insertBlogCategory.fulfilled, (state, action) => {
            toast.success("Thêm tin tức thành công");
            state.isRefresh = true;

        });
        builder.addCase(updateBlogCategory.fulfilled, (state, action) => {
            toast.success("Cập nhật tin tức thành công");
            state.isRefresh = true;

        });
        builder.addCase(deleteBlogCategory.fulfilled, (state, action) => {
            toast.success("Xóa tin tức thành công");
            state.isRefresh = true;
        });

        builder.addCase(getBlogCategories.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isRefresh = false;
            // console.log(action.payload);
        });


    },
});

export default blogCategorySlice;
