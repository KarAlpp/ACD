import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create Checkout
export const createCheckout = createAsyncThunk(
    "checkout/createCheckout",
    async (checkoutData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
                checkoutData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to create checkout");
        }
    }
);

// Initial State
const initialState = {
    checkout: null,
    loading: false,
    error: null,
};

// Checkout Slice
const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        clearCheckout: (state) => {
            state.checkout = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCheckout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckout.fulfilled, (state, action) => {
                state.loading = false;
                state.checkout = action.payload;
            })
            .addCase(createCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create checkout";
            });
    },
});

// Export Actions
export const { clearCheckout } = checkoutSlice.actions;

// Export Reducer
export default checkoutSlice.reducer;
