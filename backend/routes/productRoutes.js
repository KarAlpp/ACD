const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");
const products = require("../Data/products");
const router = express.Router();

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (Admin only)
 */
router.post("/", protect, admin, async (req, res) => {
    try {
        const { 
            name, description, price, discountPrice, countInStock, sku, 
            category, brand, sizes, colors, collections, material, door, 
            images, altText, isFeatured, isPublished, rating, numReviews, 
            tags, metaTitle, metaDescription, metaKeywords, dimensions, 
            weight 
        } = req.body;

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            door,
            images,
            altText,
            isFeatured,
            isPublished,
            rating,
            numReviews,
            tags,
            user: req.user.id, // Assigning the logged-in user as product creator
            metaTitle,
            metaDescription,
            metaKeywords,
            dimensions,
            weight
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Product Creation Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Fetch Products Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

/**
 * @route   GET /api/products/best-seller
 * @desc    Get the best-selling product
 * @access  Public
 */
router.get("/best-seller", async (req, res) => {
    try {
        // Find the best-selling product (sorted by highest numReviews first, then rating)
        const bestSeller = await Product.findOne().sort({ numReviews: -1, rating: -1 });

        if (bestSeller) {
            res.json(bestSeller);
        } else {
            res.status(404).json({ message: "No best seller found" });
        }
    } catch (error) {
        console.error("Best Seller Route Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

/**
 * @route   GET /api/products/new-arrivals
 * @desc    Retrieve latest 8 products by creation date
 * @access  Public
 */
router.get('/new-arrivals', async (req, res) => {
    try {
        // Fetch the most recently added products
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);

        res.json(newArrivals);
    } catch (error) {
        console.error("New Arrivals Route Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

/**
 * @route   GET /api/products/filter
 * @desc    Filter products by various criteria
 * @access  Public
 */
router.get("/filter", async (req, res) => {
    try {
        console.log("✅ `/filter` route hit");
        console.log("Received Query Params:", req.query);
        
        const { collection, size, color, minPrice, maxPrice, sortBy, 
            door, search, material, brand, limit, category } = req.query;

        let query = {};
        let sort = {}; 

        // 🔹 Koleksiyon filtresi (Boş değilse ekle)
        if (collection && collection.trim() !== "" && collection.toLowerCase() !== "all") {
            query.collections = { $regex: collection, $options: "i" };
        }
        

        // 🔹 Malzeme filtresi (Boş değilse ekle)
        if (material && material.trim() !== "") {
            query.material = { $regex: material, $options: "i" };
        }

        // 🔹 Marka filtresi (Boş değilse ekle)
        if (brand && brand.trim() !== "") {
            query.brand = { $regex: brand, $options: "i" };
        }

        // 🔹 Kapı (door) filtresi (Boş değilse ekle)
        if (door && door.trim() !== "") {
            query.door = { $regex: door, $options: "i" };
        }

        // 🔹 Beden (size) filtresi (Boş değilse ekle)
        if (size) {
            const sizeValues = Array.isArray(size) ? size : size.split(",");
            if (sizeValues.length > 0) {
                query.sizes = { $in: sizeValues.map(s => new RegExp(s, "i")) };
            }
        }

        // 🔹 Renk (color) filtresi (Boş değilse ekle)
        if (color) {
            const colorValues = Array.isArray(color) ? color : color.split(",");
            if (colorValues.length > 0) {
                query.colors = { $in: colorValues.map(c => new RegExp(c, "i")) };
            }
        }

        // 🔹 Kategori filtresi (Boş değilse ekle)
        if (category && category.trim() !== "") {
            query.category = { $regex: category, $options: "i" };
        }

        // 🔹 Fiyat filtresi (Boş değilse ekle)
        if (minPrice || maxPrice) {
            query.price = {};
            if (!isNaN(minPrice) && minPrice.trim() !== "") query.price.$gte = Number(minPrice);
            if (!isNaN(maxPrice) && maxPrice.trim() !== "") query.price.$lte = Number(maxPrice);
        }

        // 🔹 Arama (search) filtresi (Boş değilse ekle)
        if (search && search.trim() !== "") {
            query.$or = [
                { name: { $regex: search, $options: "i" } }, 
                { description: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } }
            ];
        }

        // 🔹 Sıralama (sortBy)
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "popularity":
                    sort = { rating: -1 };
                    break;
                case "newest":
                    sort = { createdAt: -1 };
                    break;
                default:
                    sort = { createdAt: -1 }; // Default sıralama
                    break;
            }
        } else {
            sort = { createdAt: -1 };
        }

        // 🔹 Debug için query'yi ekrana yazdır
        console.log("🔍 Query Built:", JSON.stringify(query, null, 2));
        console.log("📊 Sort Options:", JSON.stringify(sort, null, 2));

        // 🔹 Varsayılan limit
        const limitValue = !isNaN(limit) ? Number(limit) : 20;

        // 🔹 Filtrelenen ürünleri çek
        const products = await Product.find(query)
            .sort(sort)
            .limit(limitValue);

        // 🔹 Toplam ürün sayısını al
        const totalCount = await Product.countDocuments(query);

        console.log(`Returning ${products.length} products`);

        // Sonuçları dön
        res.json({
            products,
            total: totalCount,
            count: products.length,
            parsedQuery: query
        });
    } catch (error) {
        console.error("❌ Fetch Products Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

/**
 * @route   GET /api/products/similar/:id
 * @desc    Get similar products based on current product
 * @access  Public
 */
router.get("/similar/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find similar products based on category (excluding the current product)
        const similarProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id } // Exclude the current product from the results
        }).limit(4); // Limit results to 4 similar products

        res.json(similarProducts);
    } catch (error) {
        console.error("Fetch Similar Products Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


/**
 * @route   GET /api/products/icons/:name
 * @desc    Get icon by name
 * @access  Public
 */
router.get("/icons/:name", async (req, res) => {
  try {
    const iconName = req.params.name;
    const icon = await getLucideIcon(iconName);
    if (!icon) {
      return res.status(404).json({ message: "Icon not found" });
    }
    res.json({ success: true, message: "Icon loaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error loading icon", error: error.message });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product Not Found" });
        }
    } catch (error) {
        console.error("Fetch Product Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private (Admin only)
 */
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const { 
            name, description, price, discountPrice, countInStock, sku, 
            category, brand, sizes, colors, collections, material, door, 
            images, altText, isFeatured, isPublished, rating, numReviews, 
            tags, metaTitle, metaDescription, metaKeywords, dimensions, 
            weight 
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update only provided fields
        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.discountPrice = discountPrice ?? product.discountPrice;
        product.countInStock = countInStock ?? product.countInStock;
        product.sku = sku ?? product.sku;
        product.category = category ?? product.category;
        product.brand = brand ?? product.brand;
        product.sizes = sizes ?? product.sizes;
        product.colors = colors ?? product.colors;
        product.collections = collections ?? product.collections;
        product.material = material ?? product.material;
        product.door = door ?? product.door;
        product.images = images ?? product.images;
        product.altText = altText ?? product.altText;
        product.isFeatured = isFeatured ?? product.isFeatured;
        product.isPublished = isPublished ?? product.isPublished;
        product.rating = rating ?? product.rating;
        product.numReviews = numReviews ?? product.numReviews;
        product.tags = tags ?? product.tags;
        product.metaTitle = metaTitle ?? product.metaTitle;
        product.metaDescription = metaDescription ?? product.metaDescription;
        product.metaKeywords = metaKeywords ?? product.metaKeywords;
        product.dimensions = dimensions ?? product.dimensions;
        product.weight = weight ?? product.weight;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private (Admin only)
 */
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        // Find the product by ID
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Remove the product from DB
        await product.deleteOne();

        res.json({ message: "Product removed successfully" });
    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Utility function for dynamically importing icons
let iconsCache = {};

const getLucideIcon = async (iconName) => {
  if (!iconsCache[iconName]) {
    try {
      const lucide = await import('lucide-react');
      iconsCache[iconName] = lucide[iconName];
    } catch (error) {
      console.error(`Error loading icon ${iconName}:`, error);
      return null;
    }
  }
  return iconsCache[iconName];
};

module.exports = router;