import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const [cartTotal, setCartTotal] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Ensures authentication (sessions or JWT)
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cart - ${response.status}`);
      }

      const text = await response.text();
      console.log("Cart API Response:", text);

      if (!text || text.trim() === "") {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text);
      setCartProducts(data.products || []);
      setCartTotal(data.totalPrice || 0);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load cart.");
      setCartProducts([]);
      setCartTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (drawerOpen) {
      fetchCart();
    }
  }, [drawerOpen]); // ✅ Now refetches when the drawer opens

  const handleCheckOut = () => {
    navigate('/checkout');
  };

  return (
    <>
      {drawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleCartDrawer}
        />
      )}

      <div
        className={`fixed top-0 right-0 w-[400px] md:w-[450px] h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col z-50 overflow-hidden 
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-300">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button 
            onClick={toggleCartDrawer} 
            className="hover:bg-gray-200 p-2 rounded-full transition-all"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-5">
          {loading ? (
            <p>Loading cart...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : cartProducts.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <CartContents cartProducts={cartProducts} setCartTotal={setCartTotal} />
          )}
        </div>

        <div className="p-5 border-t border-gray-300 bg-gradient-to-t from-gray-100 to-white">
          <div className="flex justify-between text-lg font-semibold pb-3">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleCheckOut} 
            disabled={cartProducts.length === 0 || loading}
            className={`w-full py-3 rounded-md transition duration-300 ${
              cartProducts.length === 0 || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:opacity-90"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
