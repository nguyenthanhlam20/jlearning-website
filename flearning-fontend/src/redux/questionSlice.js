
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { questionServices } from "../services";
import { toast } from 'react-toastify';

export const insertQuestion = createAsyncThunk("insert-question", async (question) => {
  const response = await questionServices.insertQuestion(question);
  return response;
});
export const deleteQuestion = createAsyncThunk("delete-question", async (question) => {
  const response = await questionServices.deleteQuestion(question);
  return response;
});

export const updateQuestion = createAsyncThunk("update-question", async (question) => {
  const response = await questionServices.updateQuestion(question);
  return response;
});

export const getQuestiones = createAsyncThunk("get-questiones", async () => {
  const response = await questionServices.getQuestions();
  return response;
});




const questionSlice = createSlice({
  name: "question",
  initialState: {
    data: [],
    isRefresh: false
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(updateQuestion.fulfilled, (state, action) => {
      state.isRefresh = true;
      toast.success("Cập nhật câu hỏi thành công");
    });
    builder.addCase(insertQuestion.fulfilled, (state, action) => {
      state.isRefresh = true;
      toast.success("Thêm câu hỏi thành công");
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.isRefresh = true;
      toast.success("xóa câu hỏi thành công");
    });
    builder.addCase(getQuestiones.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isRefresh = false;
    });
  },
});

export default questionSlice;
