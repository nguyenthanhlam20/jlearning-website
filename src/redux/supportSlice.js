
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supportServices } from "../services";
import { toast } from 'react-toastify';

export const insertSupport = createAsyncThunk("insert-support", async (support) => {
  const response = await supportServices.insertSupport(support);
  return response;
});

export const updateSupport = createAsyncThunk("update-support", async (support) => {
  const response = await supportServices.updateSupport(support);
  return response;
});

export const getSupports = createAsyncThunk("get-supports", async () => {
  const response = await supportServices.getSupports();
  return response;
});

export const deleteSupport = createAsyncThunk("delete-support", async (support) => {
  const response = await supportServices.deleteSupport(support);
  return response;
});




const supportSlice = createSlice({
  name: "support",
  initialState: {
    data: [],
    isRefreshSupport: false
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(insertSupport.fulfilled, (state, action) => {
      state.isRefreshSupport = true;
      toast.success("Thêm mới hỗ trợ thành công");
    });
    builder.addCase(updateSupport.fulfilled, (state, action) => {
      state.isRefreshSupport = true;
      toast.success("Cập nhật hỗ trợ thành công");
    });
    builder.addCase(deleteSupport.fulfilled, (state, action) => {
      state.isRefreshSupport = true;
      toast.success("Xóa hỗ trợ thành công");
    });
    builder.addCase(getSupports.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isRefreshSupport = false;
      // window.alert("ok");
    });
  },
});

export default supportSlice;
