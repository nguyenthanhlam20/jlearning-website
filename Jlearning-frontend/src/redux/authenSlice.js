
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authenServices from "../services/authenServices";
import { toast } from 'react-toastify';


export const signin = createAsyncThunk("signin", async (user) => {
  const response = await authenServices.signin(user);
  return response;
});

export const signup = createAsyncThunk("signup", async (user) => {
  const response = await authenServices.signup(user);
  return response;
});
export const changePassword = createAsyncThunk("change-password", async (user) => {
  const response = await authenServices.changePassword(user);
  return response;
});

export const forgotPassword = createAsyncThunk("forgot-password", async (email) => {
  const response = await authenServices.forgotPassword(email);
  return response;
});



const authenSlice = createSlice({
  name: "authen",
  initialState: {
    user: null,
    email: null,
    isGoToLogin: false,
  },
  reducers: {
    signOut: (state, action) => {
      state.user = null;
      sessionStorage.removeItem("user");

      localStorage.removeItem("currentPage");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },

    resetIsGoToLogin: (state, action) => {
      state.isGoToLogin = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      const { user } = action.payload;
      console.log("get user ", user);
      if (user == null) {
        const { message } = action.payload;
        toast.warning(message);
      } else {
        state.user = user;
        sessionStorage.setItem("user", JSON.stringify(user));
        toast.success("Đăng nhập thành công");
      }
    });
    builder.addCase(signin.rejected, (state, action) => {
      toast.warning("Tài khoản hoặc mật khẩu không chính xác");
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      toast.success("Tạo tài khoản thành công");
    state.isGoToLogin = true;
      console.log("create account successfully", action.payload);
    });
    builder.addCase(signup.rejected, (state, action) => {
      toast.warning("Email đã tồn tại");
    });

    builder.addCase(changePassword.fulfilled, (state, action) => {
      toast.success("Thay đổi mật khẩu thành công");
    });

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      const { status, email } = action.payload;
      if (status === true) {
        state.email = email;
        toast.success("Yêu cầu thành công");
      } else {
        toast.warning("Email không tồn tại");
      }

    });
  },
});

export default authenSlice;
