
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
export const getFeedbackById = createAsyncThunk("get-feedback-by-id", async (feedback) => {
  const response = await feedbackServices.getFeedbackById(feedback);
  return response;
});




const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    data: [],
    specific: null,
    isRefresh: false
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(updateFeedback.fulfilled, (state, action) => {
      state.isRefresh = true;
      toast.success("Cập phản hồi thành công");
    });
    builder.addCase(insertFeedback.fulfilled, (state, action) => {
        state.isRefresh = true;
        toast.success("Gửi phản hồi thành công");
      });
    builder.addCase(getFeedbacks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isRefresh = false;
    });
    builder.addCase(getFeedbackById.fulfilled, (state, action) => {
      state.specific = action.payload;
      // console.log(action.payload);
      state.isRefresh = false;
    });
  },
});

export default feedbackSlice;
