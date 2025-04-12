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

// ✅ .env dosyasını yükle
dotenv.config();

// ✅ MongoDB bağlantısını kur
connectDB();

const app = express();
const port = process.env.PORT || 9000;

// ✅ CORS ayarı (sıralama önemli)
const allowedOrigins = [
  'http://localhost:5173',            // Vite dev ortamı
  'https://acd-3euz.vercel.app'       // Production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("🧪 Gelen origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ CORS reddedildi:", origin);
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true
}));


// ✅ JSON body parse et
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

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Server Başlat
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
