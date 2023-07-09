
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactServices } from "../services";
import { toast } from 'react-toastify';

export const insertContact = createAsyncThunk("insert-contact", async (contact) => {
  const response = await contactServices.insertContact(contact);
  return response;
});

export const updateContact = createAsyncThunk("update-contact", async (contact) => {
  const response = await contactServices.updateContact(contact);
  return response;
});

export const getContacts = createAsyncThunk("get-contacts", async () => {
  const response = await contactServices.getContacts();
  return response;
});




const contactSlice = createSlice({
  name: "contact",
  initialState: {
    data: [],
    isRefresh: false
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(insertContact.fulfilled, (state, action) => {
      state.isRefresh = true;
      toast.success("Gửi thông điệp thành công");

    });
    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.isRefresh = true;
      toast.success("Phản hồi thông điệp thành công");

    });
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isRefresh = false;
    });
  },
});

export default contactSlice;
