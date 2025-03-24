import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch products with filters
export const fetchProductByFilters = createAsyncThunk(
  "product/fetchByFilters",
  async ({ collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit }) => {
    try {
      const query = new URLSearchParams();
      if (collection) query.append("collection", collection);
      if (size) query.append("size", size);
      if (color) query.append("color", color);
      if (gender) query.append("gender", gender);
      if (minPrice) query.append("minPrice", minPrice);
      if (maxPrice) query.append("maxPrice", maxPrice);
      if (sortBy) query.append("sortBy", sortBy);
      if (search) query.append("search", search);
      if (category) query.append("category", category);
      if (material) query.append("material", material);
      if (brand) query.append("brand", brand);
      if (limit) query.append("limit", limit);

      const response = await axios.get(`${API_BASE_URL}/api/products?${query.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch products";
    }
  }
);

// Fetch product details
export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch product details";
    }
  }
);

// Update a product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to update product";
    }
  }
);

// Fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "product/fetchSimilarProducts",
  async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products/similar/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch similar products";
    }
  }
);

// Initial state
const initialState = {
  products: [],
  selectedProduct: null,
  similarProducts: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    size: "",
    color: "",
    gender: "",
    maxPrice: "",
    minPrice: "",
    sortBy: "",
    search: "",
    material: "",
    collection: "",
  },
};

// Product slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex((product) => product.id === updatedProduct.id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
