
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseServices } from "../services";
import { toast } from 'react-toastify';

export const insertCourse = createAsyncThunk("insert-course", async (course) => {
  const response = await courseServices.insertCourse(course);
  return response;
});
export const insertUserCourse = createAsyncThunk("insert-user-course", async (userCourse) => {
  const response = await courseServices.insertUserCourse(userCourse);
  return response;
});
export const updateCourse = createAsyncThunk("update-course", async (course) => {
  const response = await courseServices.updateCourse(course);
  return response;
});
export const getCourses = createAsyncThunk("get-courses", async () => {
  const response = await courseServices.getCourses();
  return response;
});
export const getUserCourses = createAsyncThunk("get-user-courses", async (user) => {
  const response = await courseServices.getUserCourses(user);
  return response;
});
export const getCourseById = createAsyncThunk("get-course-by-id", async (course) => {
  const response = await courseServices.getCourseById(course);
  return response;
});




const courseSlice = createSlice({
  name: "course",
  initialState: {
    data: [],
    userCourses: [],
    specific: null,
    isRefreshSpecific: false,
    isRefresh: false,
  },
  reducers: {
    setIsRefreshSpecific: (state, action) => {
      state.isRefreshSpecific = action.payload;
    },
    setIsRefresh: (state, action) => {
      state.isRefresh = true;
    },
    resetCourseData: (state, action) => {
      state.data = [];
      state.userCourses = [];
      state.specific = null;
      state.isRefreshSpecific = false;
      state.isRefresh = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(insertCourse.fulfilled, (state, action) => {
      toast.success("Thêm khóa học thành công");
      state.isRefresh = true;
    });
    builder.addCase(insertUserCourse.fulfilled, (state, action) => {
      toast.success("Đăng ký khóa học thành công");
    });
    builder.addCase(updateCourse.fulfilled, (state, action) => {
      toast.success("Cập nhật khóa học thành công");
      state.isRefresh = true;
      state.isRefreshSpecific = true;
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isRefresh = false;
      // console.log(action.payload);
    });
    builder.addCase(getUserCourses.fulfilled, (state, action) => {
      state.userCourses = action.payload;
      state.isRefresh = false;
      // console.log(action.payload);
    });
    builder.addCase(getCourseById.fulfilled, (state, action) => {
      state.specific = action.payload;
      state.isRefreshSpecific = false;
      // console.log("specific course: ", action.payload);
    });
  },
});

export default courseSlice;
