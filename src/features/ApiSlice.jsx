import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getApiData = createAsyncThunk(
  "apiData",
  async ({ page, lang }, { rejectWithValue }) => {
    const token = process.env.REACT_APP_API_TOKEN;
    const url = `https://fuatmercan.com/kids/api/v1/page.php?slug=${page}&lang=${lang}&token=${token}`;
    try {
      const { data } = await axios(url);
      return data;
    } catch (error) {
      return rejectWithValue("bir hata oluştu..");
    }
  }
);

const initialState = {
  apiPageData: [],
  loading: false,
  error: "",
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApiData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getApiData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.apiPageData = payload;
      })
      .addCase(getApiData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default apiSlice.reducer;
