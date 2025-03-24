import React from "react";
import { Mail, Facebook, Instagram, Twitter, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-300    bg-gray-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Newsletter</h3>
          <p className="text-sm text-gray-600">
            Be the first to know about new products, sales, and special offers.
          </p>
          <p className="text-sm text-gray-600 mb-4">Sign up for our newsletter.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 p-3 w-full text-sm rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-3 rounded-r-md hover:bg-gray-800 transition-all flex items-center justify-center"
            >
              <Mail size={20} />
            </button>
          </form>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Company</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><a href="#" className="hover:text-gray-900 transition-all">About Us</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-all">Careers</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-all">Contact</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Support</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><a href="#" className="hover:text-gray-900 transition-all">FAQ</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-all">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-all">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Us</h3>
          <div className="flex items-center space-x-2 text-gray-600 text-sm mb-4">
            <Phone size={20} className="text-gray-700" />
            <span>+90 538 99 71 58
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/acdstore/" className="text-gray-600 hover:text-gray-900 transition-all">
              <Facebook size={24} />
            </a>
            <a href="https://www.instagram.com/acdstore/" className="text-gray-600 hover:text-gray-900 transition-all">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-all">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
