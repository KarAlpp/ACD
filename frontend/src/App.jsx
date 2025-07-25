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
import PrivacyPolicyPage from './pages/Privacy';
import Catalogs from './pages/Catalogs';
import CatalogDetails from './pages/CatalogDetails';
import FermobDetails from './pages/FermobDetails';
import OltaProductDetail from './oltaz/OltaProductDetail';
import Oltacatalogs from './pages/Oltacatalogs';
const App = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-]">
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
              <Route path="checkout" element={<CheckOut />} />
              <Route path="order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="order/:id" element={<OrderDetailsPage />} />
              <Route path="my-orders" element={<MyOrdersPage />} />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="ContactUs" element={<ContactUs />} />
              <Route path="privacy" element={<PrivacyPolicyPage />} />
              <Route path="/collectionsfermob" element={<Catalogs />} />
<Route path="/collectionsfermob/:catalogName" element={<CatalogDetails />} />
<Route path="product/:id" element={<FermobDetails />} />
<Route path="/olta" element={<OltaProductDetail />} />
              </Route>
            <Route path="/oltacatalogs" element={<Oltacatalogs />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminHomePage />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="products/:id/edit" element={<EditProductPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
