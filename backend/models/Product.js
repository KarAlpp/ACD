const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true }, // ✅ Fixed String → Number
        discountPrice: { type: Number, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        sku: { type: String, unique: true, required: true },
        category: { type: String, required: true },
        brand: { type: String, default: "Unknown" },
        sizes: { type: [String], default: "Not Specified" },
        colors: { type: [String], required: true },
        collections: { type: String, required: false },
        material: { type: String, default: "Not Specified" },
        door: { type: String, enum: ["indoor", "outdoor"] },
        images: {
            type: [String], // ✅ Ensured Array format
            required: true,
            validate: {
                validator: function (arr) {
                    return arr.length > 0;
                },
                message: "At least one image is required",
            },
        },
        altText: { type: String ,default: false},
        isFeatured: { type: Boolean, default: false },
        isPublished: { type: Boolean, default: false },
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        tags: { type: [String] },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        metaTitle: { type: String },
        metaDescription: { type: String },
        metaKeywords: { type: [String] },
        dimensions: {
            type: {
                length: { type: Number },
                width: { type: Number },
                height: { type: Number }
            },
            default: false
        },
        weight: { type: Number,default: "Not Specified" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
