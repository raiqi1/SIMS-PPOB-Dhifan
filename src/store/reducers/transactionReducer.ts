/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api"; // Sesuaikan path API Anda

interface Balance {
  balance: any;
}

interface TopUp {
  top_up_amount: any;
}

interface Transaction {
  service_code: string;
}

export const topup = createAsyncThunk<
  any,
  Record<string, any>,
  { rejectValue: any }
>("topup", async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Token not found");
    }
    const { data } = await api.post("/topup", info, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data topup", data.data);
    return fulfillWithValue(data?.data);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data || error.message);
  }
});

export const bayarTransaksi = createAsyncThunk<
  any,
  Record<string, any>,
  { rejectValue: any }
>("bayarTransaksi", async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Token not found");
    }
    const { data } = await api.post("/transaction", info, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data transaction", data);
    return fulfillWithValue(data?.data);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data || error.message);
  }
});

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


export const transactionReducer = createSlice({
  name: "topup",
  initialState: {
    loader: false,
    balance: null as Balance | null,
    top_up_amount: null as TopUp | null,
    service_code: "" as Transaction | "",
    hasMore: true,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    topup_reset: (state) => {
      state.balance = null;
    },
    balance_reset: (state) => {
      state.balance = null;
    },
    isLoading: (state) => {
      state.loader = true;
    },
    isLoaded: (state) => {
      state.loader = false;
    },
    isError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      // Top Up
      .addCase(topup.pending, (state) => {
        state.loader = true;
        state.top_up_amount = null;
      })
      .addCase(topup.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.top_up_amount = action.payload;
        state.loader = false;
      })
      .addCase(topup.rejected, (state: any, action: PayloadAction<any>) => {
        state.errorMessage = action.payload?.error || "Error";
        state.loader = false;
      })
      //   Bayar transaksi
      .addCase(bayarTransaksi.pending, (state) => {
        state.loader = true;
        state.service_code = "";
      })
      .addCase(
        bayarTransaksi.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.service_code = action.payload;
          state.loader = false;
        }
      )
      .addCase(
        bayarTransaksi.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.errorMessage = action.payload?.error || "Error";
          state.loader = false;
        }
      )
      // Get Balance
      .addCase(getBalance.pending, (state: any) => {
        state.loader = true;
        state.balance = null;
      })
      .addCase(
        getBalance.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.balance = action.payload;
          state.loader = false;
        }
      )
      .addCase(
        getBalance.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.errorMessage = action.payload?.error || "Error";
          state.loader = false;
        }
      )
  },
});

export const { messageClear, topup_reset } = transactionReducer.actions;

export default transactionReducer.reducer;
