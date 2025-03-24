import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../redux/slices/adminProductSlice';
import { fetchOrders } from '../redux/slices/adminSlice';

const AdminHomePage = () => {
  const dispatch = useDispatch();

  const { products, loading: productsLoading, error: productsError } = useSelector(
    (state) => state.adminProduct
  );
  
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);
  
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='p-4 shadow-md rounded-lg border'>
          <h2 className='text-xl font-semibold'>Revenue</h2>
          <p className='text-2xl'>${orders?.reduce((total, order) => total + order.totalPrice, 0).toFixed(2) || '0.00'}</p>
        </div>

        <div className='p-4 shadow-md rounded-lg border'>
          <h2 className='text-xl font-semibold'>Total Orders</h2>
          <p className='text-2xl'>{orders?.length || 0}</p>
          <Link to='/admin/orders' className='text-blue-500'>
            Manage Orders
          </Link>
        </div>

        <div className='p-4 shadow-md rounded-lg border'>
          <h2 className='text-xl font-semibold'>Total Products</h2>
          <p className='text-2xl'>{products?.length || 0}</p>
          <Link to='/admin/products' className='text-blue-500'>
            Manage Products
          </Link>
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='text-2xl font-semibold mb-4'>Recent Orders</h2>

        {ordersLoading ? (
          <p>Loading orders...</p>
        ) : ordersError ? (
          <p className='text-red-500'>Error: {ordersError}</p>
        ) : (
          <table className='min-w-full border-collapse border border-gray-200'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='p-4 border border-gray-300'>ORDER ID</th>
                <th className='p-4 border border-gray-300'>USER</th>
                <th className='p-4 border border-gray-300'>TOTAL PRICE</th>
                <th className='p-4 border border-gray-300'>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className='border-b hover:bg-gray-50 cursor-pointer'
                  >
                    <td className='p-4 border border-gray-300'>{order._id}</td>
                    <td className='p-4 border border-gray-300'>{order.user.name}</td>
                    <td className='p-4 border border-gray-300'>${order.totalPrice}</td>
                    <td className='p-4 border border-gray-300'>{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='4' className='p-4 text-center'>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;