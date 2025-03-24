import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// **Fetch All Orders**
export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/admin/orders`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch orders");
        }
    }
);

// **Update Order Status**
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateStatus",
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/admin/orders/${orderId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update order status");
        }
    }
);

// **Delete an Order**
export const deleteOrder = createAsyncThunk(
    "adminOrders/delete",
    async (orderId, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/admin/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return orderId; // Return deleted order ID to remove from state
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete order");
        }
    }
);

// **Initial State**
const initialState = {
    orders: [],
    loading: false,
    error: null,
};

// **Admin Order Slice**
const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState,
    reducers: {
        clearAdminOrderState: (state) => {
            state.orders = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // **Fetch All Orders**
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch orders";
            })

            // **Update Order Status**
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrder = action.payload;
                const index = state.orders.findIndex(order => order.id === updatedOrder.id);
                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update order status";
            })

            // **Delete an Order**
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order.id !== action.payload);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete order";
            });
    },
});

// **Export Actions**
export const { clearAdminOrderState } = adminOrderSlice.actions;

// **Export Reducer**
export default adminOrderSlice.reducer;
