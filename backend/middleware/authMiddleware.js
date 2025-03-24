const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware to protect routes (JWT Authentication)
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "Not authorized, token missing" });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request object (excluding password)
            req.user = await User.findById(decoded.user.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next(); // Proceed to the next middleware
        } catch (error) {
            console.error("❌ Token verification failed:", error);
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

// ✅ Middleware to check if user is admin
const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Not authorized as admin" });
    }
};

module.exports = { protect, admin };
