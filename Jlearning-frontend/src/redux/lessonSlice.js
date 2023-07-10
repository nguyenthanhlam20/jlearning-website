
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { lessonServices } from "../services";
import { toast } from 'react-toastify';

export const insertLesson = createAsyncThunk("insert-lesson", async (lesson) => {
    const response = await lessonServices.insertLesson(lesson);
    return response;
});
export const insertLessonDone = createAsyncThunk("insert-lesson-done", async (lesson) => {
    const response = await lessonServices.insertLessonDone(lesson);
    return response;
});

export const updateLesson = createAsyncThunk("update-lesson", async (lesson) => {
    const response = await lessonServices.updateLesson(lesson);
    return response;
});
export const deleteLesson = createAsyncThunk("delete-lesson", async (lesson) => {
    const response = await lessonServices.deleteLesson(lesson);
    return response;
});


export const getLessonsDone = createAsyncThunk("get-lessons-done", async (user) => {
    const response = await lessonServices.getLessonsDone(user);
    return response;
});




const lessonSlice = createSlice({
    name: "lesson",
    initialState: {
        response_status: false,
        data: [],
        lessons_done: [],
        isRefresh: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(updateLesson.fulfilled, (state, action) => {
            const { response_status } = action.payload;
            state.response_status = response_status;
            state.isRefresh = true;
            toast.success("Cập nhật bài học thành công");
        });
        builder.addCase(insertLesson.fulfilled, (state, action) => {
            const { response_status } = action.payload;
            state.response_status = response_status;
            state.isRefresh = true;
            toast.success("Thêm bài học thành công");
        });
        builder.addCase(insertLessonDone.fulfilled, (state, action) => {
            state.isRefresh = true;
            console.log("Thêm bài học xong");
        });
        builder.addCase(deleteLesson.fulfilled, (state, action) => {
            state.isRefresh = true;
            toast.success("Xóa bài học thành công");
        });
        builder.addCase(getLessonsDone.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.isRefresh = false;
            state.lessons_done = action.payload;
        });
    },
});

export default lessonSlice;
