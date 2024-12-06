/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api"; // Sesuaikan path API Anda
import { jwtDecode } from "jwt-decode";

interface UserInfo {
  id: string;
  email: string;
}

interface Profile {
  profile_image: string;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface Balance {
  balance: any;
}

// Fungsi untuk mendecode token JWT
const decodeToken = (token: string): UserInfo | "" => {
  if (token) {
    return jwtDecode<UserInfo>(token);
  } else {
    return "";
  }
};

// Thunk untuk register
export const register = createAsyncThunk<
  any,
  Record<string, any>,
  { rejectValue: any }
>("auth/registration", async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await api.post("/registration", info);
    return fulfillWithValue(data); // Jika sukses
  } catch (error: any) {
    return rejectWithValue(error?.response?.data || error.message); // Jika gagal
  }
});

// Thunk untuk login
export const login = createAsyncThunk<
  any,
  Record<string, any>,
  { rejectValue: any }
>("auth/login", async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await api.post("/login", info);
    localStorage.setItem("token", data?.data?.token); // Menyimpan token di localStorage
    return fulfillWithValue(data); // Jika sukses
  } catch (error: any) {
    return rejectWithValue(error?.response?.data || error.message); // Jika gagal
  }
});

// Thunk untuk mendapatkan profil dari token
export const getProfile = createAsyncThunk<any, void, { rejectValue: any }>(
  "auth/getProfile",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Token not found");
      }
      const { data } = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Mengirim token di header
        },
      });
      return fulfillWithValue(data?.data); // Jika sukses
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error.message); // Jika gagal
    }
  }
);

export const getBalance = createAsyncThunk<any, void, { rejectValue: any }>(
  "balance",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Token not found");
      }
      const { data } = await api.get("/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data balance", data);
      return fulfillWithValue(data?.data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const updateImageProfile = createAsyncThunk<
  any,
  FormData,
  { rejectValue: any }
>("update-image", async (formData, { rejectWithValue, fulfillWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("user not found");
    }
    const { data } = await api.put("/profile/image", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("result", data);
    return fulfillWithValue(data?.data);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data || error?.message);
  }
});

export const editProfile = createAsyncThunk<
  any,
  Record<string, any>,
  { rejectValue: any }
>("edit-profile", async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("user not found");
    }
    const { data } = await api.put("/profile/update", info, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return fulfillWithValue(data?.data);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data || error?.message);
  }
});

// Slice untuk auth
export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: decodeToken(localStorage?.getItem("token") || ""),
    profile: null as Profile | null,
    balance: null as Balance | null,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state) => {
      state.userInfo = ""; 
      state.profile = null;
    },
    balance_reset: (state) => {
      state.balance = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loader = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        const userInfo = decodeToken(action.payload.token);
        state.successMessage = action.payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload?.message 
        state.loader = false;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loader = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        const userInfo = decodeToken(action.payload.token);
        state.successMessage = action.payload.message;
        state.loader = false;
        state.userInfo = userInfo; // Set informasi user
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload?.message;
        state.loader = false;
      })
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loader = true;
        state.profile = null;
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.profile = action.payload;
        state.loader = false;
      })
      .addCase(getProfile.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload?.error || "Error";
        state.loader = false;
      })
      // udpdate image profile
      .addCase(updateImageProfile.pending, (state) => {
        state.loader = true;
      })
      .addCase(
        updateImageProfile.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.profile = action.payload;
          state.loader = false;
        }
      )
      .addCase(
        updateImageProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.errorMessage = action.payload?.error || "Error";
          state.loader = false;
        }
      )
      .addCase(editProfile.pending, (state) => {
        state.loader = true;
      })
      .addCase(editProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.profile = action.payload;
        state.loader = false;
      })
      .addCase(editProfile.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload?.error || "Error";
        state.loader = false;
      })
      // Get Balance
      .addCase(getBalance.pending, (state) => {
        state.loader = true;
        state.balance = null;
      })
      .addCase(getBalance.fulfilled, (state, action: PayloadAction<any>) => {
        state.balance = action.payload;
        state.loader = false;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.errorMessage = action.payload?.error || "Error";
        state.loader = false;
      });
  },
});

// Ekspor actions
export const { messageClear, user_reset } = authReducer.actions;

// Ekspor reducer
export default authReducer.reducer;
