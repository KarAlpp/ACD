import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// **Create Order**
export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to create order");
        }
    }
);

// **Fetch User Orders**
export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUserOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch user orders");
        }
    }
);

// **Fetch Order Details**
export const fetchOrderDetails = createAsyncThunk(
    "orders/fetchOrderDetails",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch order details");
        }
    }
);

// **Cancel Order**
export const cancelOrder = createAsyncThunk(
    "orders/cancelOrder",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return { id: orderId }; // Return deleted order ID for removal from state
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to cancel order");
        }
    }
);

// **Initial State (Based on Your Provided Structure)**
const initialState = {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
};

// **Orders Slice**
const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.orders = [];
            state.totalOrders = 0;
            state.orderDetails = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // **Create Order**
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
                state.totalOrders += 1;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create order";
            })

            // **Fetch User Orders**
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch user orders";
            })

            // **Fetch Order Details**
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch order details";
            })

            // **Cancel Order**
            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order.id !== action.payload.id);
                state.totalOrders -= 1;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to cancel order";
            });
    },
});

// **Export Actions**
export const { clearOrders } = orderSlice.actions;

// **Export Reducer**
export default orderSlice.reducer;
