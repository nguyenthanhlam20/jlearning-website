
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { feedbackServices } from "../services";
import { toast } from 'react-toastify';

export const insertFeedback = createAsyncThunk("insert-feedback", async (feedback) => {
  const response = await feedbackServices.insertFeedback(feedback);
  return response;
});

export const updateFeedback = createAsyncThunk("update-feedback", async (feedback) => {
  const response = await feedbackServices.updateFeedback(feedback);
  return response;
});

export const getFeedbacks = createAsyncThunk("get-feedbacks", async () => {
  const response = await feedbackServices.getFeedbacks();
  return response;
});




const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    response_status: false,
    data: [],
    isRefresh: false
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(updateFeedback.fulfilled, (state, action) => {
      state.isRefresh = true;
      toast.success("Cập nhật điệp thành công");
    });
    builder.addCase(insertFeedback.fulfilled, (state, action) => {
        state.isRefresh = true;
        toast.success("Gửi thông điệp thành công");
      });
    builder.addCase(getFeedbacks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isRefresh = false;
    });
  },
});

export default feedbackSlice;
