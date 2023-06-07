
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { testServices } from "../services";
import { toast } from 'react-toastify';

export const insertTest = createAsyncThunk("insert-test", async (test) => {
  const response = await testServices.insertTest(test);
  return response;
});
export const insertTestDone = createAsyncThunk("insert-test-done", async (test) => {
  const response = await testServices.insertTestDone(test);
  return response;
});
export const getTestById = createAsyncThunk("get-test", async (test) => {
  const response = await testServices.getTestById(test);
  return response;
});

export const updateTest = createAsyncThunk("update-test", async (test) => {
  const response = await testServices.updateTest(test);
  return response;
});
export const deleteTest = createAsyncThunk("delete-test", async (test) => {
  const response = await testServices.deleteTest(test);
  return response;
});

export const getTests = createAsyncThunk("get-testes", async () => {
  const response = await testServices.getTests();
  return response;
});

export const getTestsDone = createAsyncThunk("get-tests-done", async (user) => {
  const response = await testServices.getTestsDone(user);
  return response;
});




const testSlice = createSlice({
  name: "test",
  initialState: {
    data: [],
    tests_done: [],
    specific: null,
    isRefreshSpecific: false,
    isRefresh: false,
  },
  reducers: {
    setIsRefreshSpecific: (state, action) => {
      state.isRefreshSpecific = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateTest.fulfilled, (state, action) => {
      toast.success("Cập nhật bài kiểm tra thành công");
      state.isRefreshSpecific = true;
      state.isRefresh = true;
    });
    builder.addCase(insertTest.fulfilled, (state, action) => {
      toast.success("Thêm bài kiểm tra thành công");
      state.isRefresh = true;
    });
    builder.addCase(insertTestDone.fulfilled, (state, action) => {
      state.isRefresh = true;
      state.isRefreshSpecific = true;
    });
    builder.addCase(deleteTest.fulfilled, (state, action) => {
      toast.success("Xóa bài kiểm tra thành công");
      state.isRefresh = true;
    });
    builder.addCase(getTests.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isRefresh = false;
    });
    builder.addCase(getTestById.fulfilled, (state, action) => {
      state.specific = action.payload;
      state.isRefreshSpecific = false;
    });
    builder.addCase(getTestsDone.fulfilled, (state, action) => {
      state.tests_done = action.payload;
    });
  },
});

export default testSlice;
