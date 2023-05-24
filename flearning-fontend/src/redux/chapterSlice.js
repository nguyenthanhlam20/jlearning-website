
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { chapterServices } from "../services";
import { toast } from 'react-toastify';

export const insertChapter = createAsyncThunk("insert-chapter", async (chapter) => {
    const response = await chapterServices.insertChapter(chapter);
    return response;
});

export const updateChapter = createAsyncThunk("update-chapter", async (chapter) => {
    const response = await chapterServices.updateChapter(chapter);
    return response;
});
export const deleteChapter = createAsyncThunk("delete-chapter", async (chapter) => {
    const response = await chapterServices.deleteChapter(chapter);
    return response;
});

export const getChapters = createAsyncThunk("get-chapters", async () => {
    const response = await chapterServices.getChapters();
    return response;
});




const chapterSlice = createSlice({
    name: "chapter",
    initialState: {
        response_status: false,
        data: [],
        isRefresh: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(updateChapter.fulfilled, (state, action) => {
            const { response_status } = action.payload;
            state.response_status = response_status;
            state.isRefresh = true;
            toast.success("Cập nhật chương thành công");
        });
        builder.addCase(insertChapter.fulfilled, (state, action) => {
            const { response_status } = action.payload;
            state.response_status = response_status;
            state.isRefresh = true;
            toast.success("Thêm chương thành công");
        });
        builder.addCase(deleteChapter.fulfilled, (state, action) => {
            state.isRefresh = true;
            toast.success("Xóa chương thành công");
        });
        builder.addCase(getChapters.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isRefresh = false;
        });
    },
});

export default chapterSlice;
