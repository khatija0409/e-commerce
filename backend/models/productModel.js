const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"], 
    trim: true, //to remove whitespaces
  },
  description: {
    type: String,
    required: [true, "Please enter the product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the product price"],
    maxLength: [8, "Price cannot exceed 8 digits"],
  },
  ratings: {
    type: Number,
    default: 0, //if no rating is given this is default value
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter the product category"],
  },
  stock: {
    type: String,
    required: [true, "Please enter the product stock"],
    maxLength: [4, "Stock connot exceed 4 digits"],
    default: 1,
  },
  numOfReviews: {
    type: String,
    default: 0, 
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Product", productSchema);
