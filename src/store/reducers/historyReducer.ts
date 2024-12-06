/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api"; // Sesuaikan path API Anda

// Asynchronous Thunk untuk mengambil transaksi history
export const getHistoryTransaksi = createAsyncThunk<
  any,
  { offset: number; limit: number },
  { rejectValue: any }
>(
  "history/getHistoryTransaksi",
  async ({ offset, limit }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Token not found");
      }

      const { data } = await api.get(`transaction/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          offset,
          limit,
        },
      });

      return fulfillWithValue(data?.data?.records);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

// Initial state untuk transaction history
const initialState = {
  loader: false,
  transactionHistory: [] as any[],
  offset: 0,
  limit: 5,
  hasMore: true,
  errorMessage: "",
  successMessage: "",
};

// Slice reducer untuk transaction history
const historyReducer = createSlice({
  name: "history",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryTransaksi.pending, (state) => {
        state.loader = true;
      })
      .addCase(
        getHistoryTransaksi.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          const newRecords = action.payload.filter(
            (newRecord) =>
              !state.transactionHistory.some(
                (existingRecord) =>
                  existingRecord.invoice_number === newRecord.invoice_number
              )
          );

          state.transactionHistory = [
            ...state.transactionHistory,
            ...newRecords,
          ];
          state.loader = false;
          state.offset += newRecords.length;
          state.hasMore = action.payload.length === state.limit;
        }
      )
      .addCase(
        getHistoryTransaksi.rejected,
        (state, action: PayloadAction<any>) => {
          state.errorMessage =
            action.payload || "Failed to fetch transaction history!";
          state.loader = false;
        }
      );
  },
});

export const { messageClear } = historyReducer.actions;

export default historyReducer.reducer;
