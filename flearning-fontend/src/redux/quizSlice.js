
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { quizServices } from "../services";
import { toast } from 'react-toastify';

export const insertQuiz = createAsyncThunk("insert-quiz", async (quiz) => {
  const response = await quizServices.insertQuiz(quiz);
  return response;
});

export const updateQuiz = createAsyncThunk("update-quiz", async (quiz) => {
  const response = await quizServices.updateQuiz(quiz);
  return response;
});

export const getQuizes = createAsyncThunk("get-quizes", async () => {
  const response = await quizServices.getQuizes();
  return response;
});




const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    data: [],
    isRefresh: false
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(updateQuiz.fulfilled, (state, action) => {
      state.isRefresh = true;
      toast.success("Cập nhật câu hỏi thành công");
    });
    builder.addCase(insertQuiz.fulfilled, (state, action) => {
        state.isRefresh = true;
        toast.success("Thêm câu hỏi thành công");
      });
    builder.addCase(getQuizes.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isRefresh = false;
    });
  },
});

export default quizSlice;
