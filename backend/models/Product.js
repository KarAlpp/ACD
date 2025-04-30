const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    collection: { type: String, required: true },
    brand: { type: String, default: "Fermob" },

    ref: { type: String, required: false, default: "" }, // 🔥 BURAYA EKLİYORUZ

    colors: { type: [String], default: [] },
    packings: { type: [String], default: [] },

    images: {
      type: Map,
      of: String,
      required: true,
      validate: {
        validator: function (v) {
          return v.size > 0;
        },
        message: "At least one image is required",
      },
    },

    technicalSheet: { type: [String], default: [] },

    altText: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    tags: { type: [String], default: [] },

    material: { type: String, default: "Not Specified" },
    door: { type: [String], enum: ["indoor", "outdoor"], default: ["indoor"] },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: [String], default: [] },

    dimensions: {
      type: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number }
      },
      default: null
    },

    weight: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
