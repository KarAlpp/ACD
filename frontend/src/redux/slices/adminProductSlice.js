import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// **Fetch All Products**
export const fetchAllProducts = createAsyncThunk(
    "adminProducts/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/admin/products`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch products");
        }
    }
);

// **Create a New deleteProduct **
export const createProduct = createAsyncThunk(
    "adminProducts/create",
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/products`, productData, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to create product");
        }
    }
);

// **Update a Product**
export const updateProduct = createAsyncThunk(
    "adminProducts/update",
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/admin/products/${id}`, productData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update product");
        }
    }
);

// **Delete a Product**
export const deleteProduct = createAsyncThunk(
    "adminProducts/delete",
    async (id, { rejectWithValue }) => {
      try {
        await axios.delete(`${API_BASE_URL}/api/products/${id}`, {  // <-- "admin" kaldırıldı
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        return id;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete product");
      }
    }
  );
  

// **Initial State**
const initialState = {
    products: [],
    loading: false,
    error: null,
};

// **Admin Product Slice**
const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {
        clearAdminProductState: (state) => {
            state.products = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // **Fetch All Products**
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch products";
            })

            // **Create a Product**
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create product";
            })

            // **Update a Product**
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload;
                const index = state.products.findIndex(product => product.id === updatedProduct.id);
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update product";
            })

            // **Delete a Product**
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete product";
            });
    },
});

// **Export Actions**
export const { clearAdminProductState } = adminProductSlice.actions;

// **Export Reducer**
export default adminProductSlice.reducer;
