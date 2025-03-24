import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const mockOrders = [
                {
                    id: '#12345',
                    createdAt: new Date(),
                    shippingAddress: {
                        city: 'New York',
                        country: 'USA',
                        street: '1234 Street',
                        zip: '12345'
                    },
                    orderItems: [
                        {
                            name: 'Scenic View',
                            image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }
                    ],
                    totalPrice: 100,
                    isPaid: true
                },
                {
                    id: '#34567',
                    createdAt: new Date(),
                    shippingAddress: {
                        city: 'New York',
                        country: 'USA',
                        street: '1234 Street',
                        zip: '12345'
                    },
                    orderItems: [
                        {
                            name: 'Chair',
                            image: 'https://images.unsplash.com/photo-1560830889-96266c6dbe96?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }
                    ],
                    totalPrice: 100,
                    isPaid: true
                }
            ];

            setOrders(mockOrders);
        }, 1000);
    }, []);
    const handleRowClick =(orderId) =>{
        navigate('/order/${orderId}')
    };
    return (
        
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-xl sm:text-2xl font-bold m-6'>My Orders</h2>
            <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-50 text-xs border-b border-gray-200'>
                        <tr className='text-gray-600'>
                            <th className='py-3 px-4'>IMAGE</th>
                            <th className='py-3 px-4'>ORDER ID</th>
                            <th className='py-3 px-4'>CREATED</th>
                            <th className='py-3 px-4'>SHIPPING ADDRESS</th>
                            <th className='py-3 px-4'>ITEMS</th>
                            <th className='py-3 px-4'>PRICE</th>
                            <th className='py-3 px-4'>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    key={order.id}
                                    onClick={()=> handleRowClick(order.id)}
                                    className='border-b border-gray-100 hover:bg-gray-50'
                                >
                                    <td className='py-4 px-4'>
                                        <img
                                            src={order.orderItems[0].image}
                                            alt={order.orderItems[0].name}
                                            className='w-12 h-12 object-cover rounded-lg'
                                        />
                                    </td>
                                    <td className='py-4 px-4 font-bold'>{order.id}</td>
                                    <td className='py-4 px-4'>
                                        {new Date(order.createdAt).toLocaleDateString()}{' '}
                                        {new Date(order.createdAt).toLocaleTimeString()}
                                    </td>
                                    <td className='py-4 px-4'>
                                        {order.shippingAddress.city}, {order.shippingAddress.country}
                                    </td>
                                    <td className='py-4 px-4'>{order.orderItems.length}</td>
                                    <td className='py-4 px-4'>${order.totalPrice}</td>
                                    <td className='py-4 px-4'>
                                        {order.isPaid ? (
                                            <span className='bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full'>
                                                Paid
                                            </span>
                                        ) : (
                                            <span className='bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full'>
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrdersPage;
