const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    console.log("🔵 User Register Request:", { name, email, password });

    try {
        let user = await User.findOne({ email });
        if (user) {
            console.log("🔴 User already exists:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        // **Burada bcrypt.hash() Kullanma! Çünkü Model Hashleme Yapıyor**
        user = new User({ name, email, password });

        await user.save();
        console.log("✅ New user registered:", user);

        // **JWT Token oluştur**
        const payload = { user: { id: user._id, role: user.role } };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
            (err, token) => {
                if (err) throw err;
                console.log("🟢 JWT Token Generated:", token);
                res.status(201).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                });
            }
        );
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


// @route   POST /api/users/login
// @desc    Authenticate user & return token
// @access  Public
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    console.log("🔵 Login Request Received:", { email, password });

    try {
        let user = await User.findOne({ email });

        if (!user) {
            console.log("🔴 User not found:", email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("🟢 Stored Hashed Password in DB:", user.password);
        console.log("🟢 Entered Password:", password);

        // **Şifre Karşılaştırma (Eğer çift hashleme varsa burada çıkacak)**
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🟡 Password Match Result:", isMatch);

        if (!isMatch) {
            console.log("🔴 Password does not match!");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("✅ User authenticated successfully:", user.email);

        // **JWT Token oluştur**
        const payload = { user: { id: user._id, role: user.role } };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "40h" },
            (err, token) => {
                if (err) {
                    console.error("❌ JWT Token Generation Failed:", err);
                    return res.status(500).json({ message: "Error generating token" });
                }
                console.log("🟢 JWT Token Generated:", token);
                res.json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                });
            }
        );
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   GET /api/users/profile
// @desc    Get logged in user's profile (Protected route)
// @access  Private
router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
});

module.exports = router;
