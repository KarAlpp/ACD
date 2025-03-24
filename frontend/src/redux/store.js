import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import productReducer from  './slices/productSlice';
import cartReducer from "./slices/productSlice";
import checkoutReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import adminReducer from "./slices/adminSlice";
import adminProductReducer from "./slices/adminProductSlice";
import adminOrderReducer from "./slices/adminOrderSlice";
const store = configureStore({
    reducer: {
        auth : authReducer,
        products : productReducer,
        cart : cartReducer,
        checkout : checkoutReducer,
        orders : orderReducer,
        admin : adminReducer,
        adminProduct : adminProductReducer,
        adminOrders : adminOrderReducer,
    },
});

export default store;
