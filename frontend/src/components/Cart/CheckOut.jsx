import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleOrderItems = [
  {
    name: "Stylish Jacket",
    price: 120,
    size: "M",
    color: "Black",
    imageUrl: "URL_HERE"
  },
  {
    name: "Casual Sneakers",
    price: 75,
    size: "42",
    color: "White",
    imageUrl: "URL_HERE"
  }
];

const Checkout = () => {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  return (
    <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-8 justify-center">
      {/* Left Section - Form */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">CHECKOUT</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={shippingAddress.email}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, email: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={shippingAddress.firstName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, firstName: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={shippingAddress.lastName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, lastName: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, address: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Postal Code</label>
            <input
              type="text"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, country: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            value={shippingAddress.phone}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, phone: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
          onClick={() => navigate("/payment")}
        >
          Continue to Payment
        </button>
      </div>

      {/* Right Section - Order Summary */}
      <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {sampleOrderItems.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover mr-4" />
              <div className="flex justify-between w-full">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Size: {item.size} | Color: {item.color}</p>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>$195</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>$195</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
