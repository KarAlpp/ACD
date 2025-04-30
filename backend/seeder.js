const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./Data/products");

dotenv.config();

// MongoDB'ye Bağlan
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => {
  console.error("❌ MongoDB Connection Error:", err);
  process.exit(1);
});

// Seeding Fonksiyonu
const seedData = async () => {
  try {
    // Admin User kontrolü (varsa kullan, yoksa oluştur)
    let adminUser = await User.findOne({ email: "admin@example.com" });

    if (!adminUser) {
      adminUser = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "123456",
        role: "admin",
      });
      console.log("👤 Admin user created");
    } else {
      console.log("👤 Admin user already exists");
    }

    const userID = adminUser._id;

    // Ürünleri ekle (varsa atla, yoksa oluştur)
    let addedCount = 0;
    let skippedCount = 0;

    for (const product of products) {
      const existingProduct = await Product.findOne({ ref: product.ref });

      if (!existingProduct) {
        await Product.create({
          ...product,
          user: userID,
        });
        console.log(`✅ Product added: ${product.name}`);
        addedCount++;
      } else {
        console.log(`⚡ Product already exists: ${product.name} (Skipping)`);
        skippedCount++;
      }
    }

    console.log("\n🎯 Seeding Summary:");
    console.log(`- Added products: ${addedCount}`);
    console.log(`- Skipped existing products: ${skippedCount}`);
    console.log("✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding the data:", error.message);
    process.exit(1);
  }
};

seedData();
