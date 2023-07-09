
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import userServices from "../services/userServices";

export const updateInfo = createAsyncThunk("update-info", async (user) => {

  const response = await userServices.updateInfo(user);
  return response;
});



const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    currentPage: '',
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateInfo.fulfilled, (state, action) => {
      const {user} = action.payload;
      console.log(user);
      toast.success("Cập nhật thông tin thành công");
    })

  },
});

export default userSlice;
