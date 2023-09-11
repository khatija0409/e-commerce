//models folder has all mongoose models
const mongoose = require("mongoose");
//making schema for products to store specify anything about product
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"], //[if entered,if not entered]
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
  //as there will be many images of a single product use array of objects below
  images: [
    {
      //well use cloudnavi to host images and we get 2 things
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
    default: 0, //inititally there will be no reviews
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
  //user id is displayed  along with product to know who created it
  //ref tells it to use id from user model
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  //to know when it was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//making model and exporting it
module.exports = mongoose.model("Product", productSchema);
