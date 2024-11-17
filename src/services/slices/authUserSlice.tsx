import { RootState } from "../../services/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginRequest,
  logoutRequest,
  fetchWithRefresh,
  getUserRequest,
  registerUserRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  updateUserRequest,
} from "../../utils/normaAPI";

import {
  TUser,
  TRegisterData,
  TLoginData,
  TRefreshResponse,
  TAuthResponse,
  TUserResponse,
} from "../../utils/Types";
import { getCookie, deleteCookie, setCookie } from "../../utils/cookie";

export interface AuthState {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
  loading: boolean;
}

export const authInitialState: AuthState = {
  isAuthenticated: false,
  isAuthChecked: false,
  user: null,
  loading: false,
};

export const selectAuthState = (state: RootState) => state.auth;
export const selectUser = (state: RootState): TUser | null => state.auth.user;

export const fetchWithRefreshThunk = createAsyncThunk<
  TRefreshResponse,
  { url: string; options: RequestInit }
>("api/fetchWithRefresh", async ({ url, options }, {}) => {
  const data = await fetchWithRefresh<TRefreshResponse>(url, options);
  return data;
});

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  "auth/loginUser",
  async (body) => {
    const data = await loginRequest(body);
    return data;
  },
);

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const data = await getUserRequest();
  return data.user;
});

export const updateUser = createAsyncThunk<TUserResponse, TRegisterData>(
  "auth/fetchNewDateUser",
  async (body) => {
    const user = await updateUserRequest(body);
    return user;
  },
);

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  "auth/registerUser",
  async (body) => {
    const data = await registerUserRequest(body);
    return data;
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (args: { email: string }) => {
    const { email } = args;
    const data = await forgotPasswordRequest({ email });
    return data;
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (args: { password: string; token: string }) => {
    const { token, password } = args;
    const data = await resetPasswordRequest({ token, password });
    return data;
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("Требуется токен");
  }
  await logoutRequest();
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        setCookie("accessToken", action.payload.accessToken);
        setCookie("userData", JSON.stringify(action.payload.user));
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        deleteCookie("accessToken");
        deleteCookie("userData");
        localStorage.removeItem("refreshToken");
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        console.error("Logout Error:", action.error);
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        setCookie("accessToken", action.payload.accessToken);
        setCookie("userData", JSON.stringify(action.payload.user));
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        setCookie("userData", JSON.stringify(action.payload.user));
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isAuthChecked = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
