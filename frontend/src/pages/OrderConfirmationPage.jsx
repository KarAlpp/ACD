import React from 'react';

const OrderConfirmationPage = () => {
  const order = {
    id: 12323,
    date: "13/12/2024",
    estimatedDelivery: "23/12/2024",
    items: [
      {
        name: "Jacket",
        color: "black",
        size: "M",
        price: 150,
        quantity: 1,
        imageUrl: "URL_HERE"
      },
      {
        name: "T-shirt",
        color: "black",
        size: "M",
        price: 120,
        quantity: 2,
        imageUrl: "URL_HERE"
      }
    ],
    paymentMethod: "PayPal",
    deliveryAddress: "123 Fashion Street, New York, USA"
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">Thank You for Your Order!</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="font-bold">Order ID: {order.id}</h3>
            <p className="text-gray-600">Order date: {order.date}</p>
          </div>
          <p className="text-gray-600">Estimated Delivery: {order.estimatedDelivery}</p>
        </div>
        
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center mb-4 border-b pb-2">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover mr-4" />
            <div className="flex justify-between w-full">
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-gray-600">{item.color} | {item.size}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${item.price}</p>
                <p className="text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between mt-4">
          <div>
            <h3 className="font-bold">Payment</h3>
            <p className="text-gray-600">{order.paymentMethod}</p>
          </div>
          <div>
            <h3 className="font-bold">Delivery</h3>
            <p className="text-gray-600">{order.deliveryAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;