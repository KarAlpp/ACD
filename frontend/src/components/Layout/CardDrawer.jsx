import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CartContents from "../Cart/CartContents";
import axios from "axios";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (!drawerOpen) return; // Fetch only when drawer is open

      try {
        const guestId = localStorage.getItem("guestId") || "";
        const userId = localStorage.getItem("userId") || "";

        if (!guestId && !userId) {
          console.warn("No guestId or userId found. Cannot fetch cart.");
          setCartProducts([]);
          setCartTotal(0);
          setLoading(false);
          return;
        }

        const queryParams = new URLSearchParams();
        if (userId) queryParams.append("userId", userId);
        if (guestId) queryParams.append("guestId", guestId);

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart?${queryParams}`,
          { withCredentials: true } // If using sessions
        );

        console.log("Cart data received:", response.data);

        if (!response.data || !Array.isArray(response.data.products)) {
          console.warn("Unexpected cart data format:", response.data);
          setCartProducts([]);
          setCartTotal(0);
        } else {
          setCartProducts(response.data.products);
          setCartTotal(response.data.totalPrice || 0);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart.");
        setCartProducts([]); // Reset state on failure
        setCartTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [drawerOpen]);

  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay - only visible when drawer is open */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleCartDrawer}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 w-[400px] md:w-[450px] h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col z-50 overflow-hidden 
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-300">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={toggleCartDrawer}
            className="hover:bg-gray-200 p-2 rounded-full transition-all"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-5">
          {loading ? (
            <p>Loading cart...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : cartProducts.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <CartContents cartProducts={cartProducts} />
          )}
        </div>

        {/* Footer with total price and checkout button */}
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
