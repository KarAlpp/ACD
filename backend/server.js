const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 9000;

// ✅ Properly Apply CORS Middleware (BEFORE Routes)
app.use(cors({
    origin: "*",  // Allow all origins (not recommended for production)
    credentials: true,
}));

// ✅ Body Parser Middleware
app.use(express.json());

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("Selamün Aleyküm");
});

// ✅ Global Error Handling Middleware (Do NOT put CORS here)
app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
