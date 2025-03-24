const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");
const Cart = require("./data/Cart");


dotenv.config();

// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

const seedData = async () => { // 'asynch()' yerine 'async () => {}' düzeltildi
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        const createdUser = await User.create({ // 'createduser' küçük harf düzeltildi
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin",
        });

        const userID = createdUser._id;
        
        const sampleProducts = products.map((product) => { // 'prodcudts' hatası düzeltildi
            return { ...product, user: userID }; // 'sample Products' hatası düzeltildi
        });

        // Insert the products
        await Product.insertMany(sampleProducts);
        console.log("Product data seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding the data", error); // 'conosle.error' hatası düzeltildi
        process.exit(1);
    }
};

seedData();
