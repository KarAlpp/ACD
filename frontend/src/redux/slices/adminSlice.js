import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// **Fetch All Users**
export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch users");
        }
    }
);

// **Fetch All Orders**
export const fetchOrders = createAsyncThunk(
    "admin/fetchOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
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

// **Update User Role**
export const updateUserRole = createAsyncThunk(
    "admin/updateUserRole",
    async ({ userId, role }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`,
                { role },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update user role");
        }
    }
);

// **Update Order Status**
export const updateOrderStatus = createAsyncThunk(
    "admin/updateOrderStatus",
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}`,
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

// **Delete User**
export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return userId; // Return deleted userId to remove from state
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete user");
        }
    }
);

// **Delete Order**
export const deleteOrder = createAsyncThunk(
    "admin/deleteOrder",
    async (orderId, { rejectWithValue }) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return orderId; // Return deleted orderId to remove from state
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete order");
        }
    }
);

// **Initial State**
const initialState = {
    users: [],
    orders: [],
    loading: false,
    error: null,
};

// **Admin Slice**
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearAdminData: (state) => {
            state.users = [];
            state.orders = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // **Fetch Users**
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch users";
            })

            // **Fetch Orders**
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch orders";
            })

            // **Update User Role**
            .addCase(updateUserRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload;
                const userIndex = state.users.findIndex(user => user._id === updatedUser._id);
                if (userIndex !== -1) {
                    state.users[userIndex] = updatedUser;
                }
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update user role";
            })

            // **Update Order Status**
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrder = action.payload;
                const orderIndex = state.orders.findIndex(order => order.id === updatedOrder.id);
                if (orderIndex !== -1) {
                    state.orders[orderIndex] = updatedOrder;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update order status";
            })

            // **Delete User**
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete user";
            })

            // **Delete Order**
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
export const { clearAdminData } = adminSlice.actions;

// **Export Reducer**
export default adminSlice.reducer;