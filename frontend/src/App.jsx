import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './components/Common/ProductDetails';
import CheckOut from './components/Cart/CheckOut';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/admin/UserManagement';
import ProductManagement from './components/admin/ProductManagement';
import EditProductPage from './components/admin/EditProductPage';
import {Provider} from "react-redux";
import store from "./redux/store";
import AboutUs from './pages/AboutUsPage';
import ContactUs from './pages/Contacts';
import ProtectedRoute from './components/Common/ProtectedRoute';
const App = () => {
  return (
    <Provider store = {store}>
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="my-orders" element={<MyOrdersPage />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path ="ContactUs" element = {<ContactUs/>}/>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path= "products/:id/edit" element ={<EditProductPage/>}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
