
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { testServices } from "../services";
import { toast } from 'react-toastify';

export const insertTest = createAsyncThunk("insert-test", async (test) => {
  const response = await testServices.insertTest(test);
  return response;
});

export const updateTest = createAsyncThunk("update-test", async (test) => {
  const response = await testServices.updateTest(test);
  return response;
});

export const getTests = createAsyncThunk("get-testes", async () => {
  const response = await testServices.getTests();
  return response;
});




const testSlice = createSlice({
  name: "test",
  initialState: {
    data: [],
    isRefresh: false
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(updateTest.fulfilled, (state, action) => {
      state.isRefresh = true;
      toast.success("Cập nhật câu hỏi thành công");
    });
    builder.addCase(insertTest.fulfilled, (state, action) => {
        state.isRefresh = true;
        toast.success("Thêm câu hỏi thành công");
      });
    builder.addCase(getTests.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isRefresh = false;
    });
  },
});

export default testSlice;
