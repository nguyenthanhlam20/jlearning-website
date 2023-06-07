
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardServices } from "../services";
import { toast } from 'react-toastify';

export const getData = createAsyncThunk("get-dara", async () => {
    const response = await dashboardServices.getData();
    return response;
});

const DashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        data: null,
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default DashboardSlice;
