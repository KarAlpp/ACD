const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Kullanıcının veya misafirin sepetini getiren yardımcı fonksiyon
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged-in user
// @access Public
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await getCart(userId, guestId);
        
        if (!cart) {
            cart = new Cart({
                user: userId || undefined,
                guestId: guestId || undefined,
                products: [],
                totalPrice: 0
            });
        }

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId && p.size === size && p.color === color
        );

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({
                productId,
                name: product.name,
                image: product.images?.[0]?.url || "",
                price: product.price,
                size,
                color,
                quantity,
            });
        }

        cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();

        return res.status(200).json(cart);
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
// @route PUT /api/cart
// @desc Update product quantity in cart
// @access Public
router.put("/", async (req, res) => {
    console.log("Incoming PUT Request Body:", req.body);

    // Extract the first product from `products` array if it exists
    let { productId, quantity, size, color, guestId, userId } = req.body;

    if (req.body.products && Array.isArray(req.body.products)) {
        const firstProduct = req.body.products[0];
        productId = firstProduct?.productId;
        quantity = firstProduct?.quantity;
        size = firstProduct?.size;
        color = firstProduct?.color;
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        console.error("Invalid Product ID:", productId);
        return res.status(400).json({ message: "Invalid product ID format" });
    }

    try {
        // Find the product first to verify it exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await getCart(userId, guestId);
        
        // CREATE CART IF IT DOESN'T EXIST - This is the key change
        if (!cart) {
            console.log("Creating new cart for user/guest:", userId, guestId);
            cart = new Cart({
                user: userId || undefined,
                guestId: guestId || undefined,
                products: [],
                totalPrice: 0
            });
        }

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId && p.size === size && p.color === color
        );

        if (productIndex === -1) {
            // If product not in cart, add it (just like in POST endpoint)
            cart.products.push({
                productId,
                name: product.name,
                image: product.images?.[0]?.url || "",
                price: product.price,
                size,
                color,
                quantity,
            });
        } else {
            // Update existing product quantity
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1);
            }
        }

        cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();

        return res.status(200).json(cart);
    } catch (error) {
        console.error("PUT Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// @route DELETE /api/cart
// @desc Remove product from cart
// @access Public
router.delete("/", async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;

    try {
        let cart = await getCart(userId, guestId);

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            // Ürünü sepetten çıkar
            cart.products.splice(productIndex, 1);

            // Toplam fiyatı güncelle
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});
router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;

    try {
        const cart = await getCart(userId, guestId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;

    try {
        // Find the guest cart and user cart
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user });

        if (!guestCart) {
            return res.status(404).json({ message: "Guest cart not found" });
        }

        if (!userCart) {
            // Eğer kullanıcı için bir sepet yoksa, misafir sepetini ona atayalım
            guestCart.user = req.user;
            guestCart.guestId = undefined;
            await guestCart.save();
            return res.status(200).json(guestCart);
        }

        // Kullanıcının ve misafirin sepetindeki ürünleri birleştir
        guestCart.products.forEach((guestProduct) => {
            const existingProductIndex = userCart.products.findIndex(
                (p) =>
                    p.productId.toString() === guestProduct.productId.toString() &&
                    p.size === guestProduct.size &&
                    p.color === guestProduct.color
            );

            if (existingProductIndex > -1) {
                // Ürün zaten sepette varsa miktarı güncelle
                userCart.products[existingProductIndex].quantity += guestProduct.quantity;
            } else {
                // Ürün sepette yoksa ekle
                userCart.products.push(guestProduct);
            }
        });

        // Toplam fiyatı güncelle
        userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

        // Kullanıcının sepetini kaydet ve misafir sepetini sil
        await userCart.save();
        await Cart.deleteOne({ _id: guestCart._id });

        return res.status(200).json(userCart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
