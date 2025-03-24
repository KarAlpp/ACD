const products = [
    {
        name: "Modern fafafafa Table",
        description: "A high-quality wooden table with a minimalist design.",
        price: 299.99,
        discountPrice: 249.99,
        countInStock: 15,
        sku: "WOOD-TABLE-001",
        category: "Furniture",
        brand: "HomeDecor",
        sizes: ["Small", "Medium", "Large"],
        colors: ["Brown", "Black", "White"],
        collections: "Luxury Collection",
        material: "Wood",
        door: "indoor",
        images: ["https://res.cloudinary.com/dj6xgjo5y/image/upload/v1742259484/zxtv9x57fbw65mj9ihki.jpg", "https://example.com/image2.jpg"], // ✅ Array olarak düzeltildi
        altText: "A wooden table",
        isFeatured: true,
        isPublished: true,
        rating: 4.5,
        numReviews: 10,
        tags: ["table", "wood", "home"],
        user: "67d70aa08bd1c965c9123eb5", // Admin user ID
        metaTitle: "Modern Wooden Table - Best Home Furniture",
        metaDescription: "Buy this modern wooden table for your home, available in different sizes.",
        metaKeywords: ["wooden table", "furniture", "home decor"],
        dimensions: {
            length: 120,
            width: 60,
            height: 75
        },
        weight: 15.5
    },
    {
        name: "Luxury Sofa Set",
        description: "Comfortable and stylish luxury sofa set for modern homes.",
        price: 599.99,
        discountPrice: 499.99,
        countInStock: 10,
        sku: "SOFA-SET-002",
        category: "Furniture",
        brand: "LuxuryHome",
        sizes: ["2-Seater", "3-Seater", "Corner"],
        colors: ["Gray", "Beige", "Dark Blue"],
        collections: "Premium Collection",
        material: "Fabric & Wood",
        door: "indoor",
        images: ["https://example.com/sofa1.jpg", "https://example.com/sofa2.jpg"], // ✅ Array olarak düzeltildi
        altText: "Luxury sofa set",
        isFeatured: true,
        isPublished: true,
        rating: 4.8,
        numReviews: 20,
        tags: ["sofa", "furniture", "living room"],
        user: "67d70aa08bd1c965c9123eb5",
        metaTitle: "Luxury Sofa Set - Modern Living Room Furniture",
        metaDescription: "Upgrade your living room with this stylish and comfortable sofa set.",
        metaKeywords: ["sofa", "luxury furniture", "home comfort"],
        dimensions: {
            length: 200,
            width: 90,
            height: 85
        },
        weight: 40
    }
];

module.exports = products;
