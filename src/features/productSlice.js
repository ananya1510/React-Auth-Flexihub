import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "https://dummyjson.com/products";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data.products;
});

export const addProduct = createAsyncThunk("products/add", async (product) => {
  const res = await axios.post(`${API_URL}/add`, product);
  return res.data;
});

export const updateProduct = createAsyncThunk("products/update", async ({ id, title, price }) => {
  const res = await axios.put(`${API_URL}/${id}`, { title, price: Number(price) });
  return { ...res.data, price: Number(res.data.price) }; // Ensuring numeric price
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.map(p => ({ ...p, price: Number(p.price) }));
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push({ ...action.payload, price: Number(action.payload.price) });
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
