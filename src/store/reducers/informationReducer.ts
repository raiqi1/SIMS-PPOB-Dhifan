/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";

interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export const getService = createAsyncThunk<any, void, { rejectValue: any }>(
  "service",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Token not found");
      }
      const { data } = await api.get("/services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data service", data);
      return fulfillWithValue(data?.data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const informationReducer = createSlice({
  name: "information",
  initialState: {
    loader: false,
    service: [] as Service[],
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    service_reset: (state) => {
      state.service = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getService.pending, (state) => {
        state.loader = true;
      })
      .addCase(getService.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.service = action.payload;
      })
      .addCase(getService.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload as string;
      });
  },
});

// Ekspor actions
export const { messageClear } = informationReducer.actions;

// Ekspor reducer
export default informationReducer.reducer;
