const mongoose = require("mongoose");

// Define Cart Item Schema
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: String,
    image: String,
    price: Number,  // Changed from String to Number for calculations
    size: String,
    color: String,
    quantity: {
        type: Number,
        default: 1,
    }
}, { _id: false }); // Disable `_id` for cart items

// Define Cart Schema
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    guestId: {
        type: String,
    },
    products: [cartItemSchema], // Array of cart items
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true }); // Enable timestamps (createdAt, updatedAt)

// Export Model
module.exports = mongoose.model("Cart", cartSchema);
