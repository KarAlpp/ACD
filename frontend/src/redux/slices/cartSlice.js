import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Function to load cart from localStorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Function to save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch Cart
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ userID, guestID }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`);
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response?.data || "Failed to fetch cart");
        }
    }
);

// Add to Cart
export const addToCart = createAsyncThunk(
    "cart/add",
    async ({ productId, quantity, size, color, guestID, userID }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                productId,
                quantity,
                size,
                color,
                guestID,
                userID,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add item to cart");
        }
    }
);

// Update Cart Item Quantity
export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async ({ productId, quantity, guestID, userID, size, color }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${productId}`, {
                quantity,
                guestID,
                userID,
                size,
                color,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update cart item");
        }
    }
);

// Remove from Cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ productId, guestID, userID, size, color }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                data: { productId, guestID, userID, size, color },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to remove item from cart");
        }
    }
);

// Merge Guest Cart into User Cart
export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async ({ guestID, userID }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, {
                guestID,
                userID,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to merge cart");
        }
    }
);

// Initial State
const initialState = {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
};

// Cart Slice
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to fetch cart";
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart.products.push(action.payload);
                saveCartToStorage(state.cart);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to add item to cart";
            })
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                const updatedItem = action.payload;
                const index = state.cart.products.findIndex(item => item.productId === updatedItem.productId);
                if (index !== -1) {
                    state.cart.products[index] = updatedItem;
                }
                saveCartToStorage(state.cart);
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to update item quantity";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart.products = state.cart.products.filter(item => item.productId !== action.payload.productId);
                saveCartToStorage(state.cart);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to remove item from cart";
            })
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to merge cart";
            });
    },
});

// Export Actions
export const { clearCart } = cartSlice.actions;

// Export Reducer
export default cartSlice.reducer;
