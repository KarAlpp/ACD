import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: "07/12/2024",
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: { city: "New York", country: "USA" },
      status: "Approved",
      deliveryStatus: "Pending Delivery",
      products: [
        { name: "Slim-Fit Easy-Iron Shirt", price: 34.99, quantity: 1, imageUrl: "URL_HERE" },
        { name: "Classic Oxford Button-Down Shirt", price: 39.99, quantity: 1, imageUrl: "URL_HERE" },
        { name: "Slim-Fit Easy-Iron Shirt", price: 34.99, quantity: 1, imageUrl: "URL_HERE" },
        { name: "Slim-Fit Easy-Iron Shirt", price: 34.99, quantity: 1, imageUrl: "URL_HERE" },
        { name: "Chino Pants", price: 55, quantity: 1, imageUrl: "URL_HERE" },
      ],
    };
    setOrderDetails(mockOrderDetails);
    pageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [id]);

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div ref={pageRef} className="pt-24 max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="font-bold">Order ID: #{orderDetails._id}</h3>
            <p className="text-gray-600">{orderDetails.createdAt}</p>
          </div>
          <div>
            <span className="bg-green-200 text-green-700 px-2 py-1 rounded">{orderDetails.status}</span>
            <span className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded ml-2">{orderDetails.deliveryStatus}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-bold">Payment Info</h3>
            <p>Payment Method: {orderDetails.paymentMethod}</p>
            <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
          </div>
          <div>
            <h3 className="font-bold">Shipping Info</h3>
            <p>Shipping Method: {orderDetails.shippingMethod}</p>
            <p>Address: {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}</p>
          </div>
        </div>
        
        <h3 className="font-bold mb-2">Products</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Unit Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.products.map((product, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 flex items-center">
                  <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover mr-2" />
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">${product.price.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-4">
          <Link to="/orders" className="text-blue-600 hover:underline">Back to My Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;