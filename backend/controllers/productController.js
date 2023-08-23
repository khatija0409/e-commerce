const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
//create product first ans export it simultaneously
//check api video
//create product >>admin(no one else can create a product)
//previously catchAsyncErrors func wasnt used
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: "true",
    product,
  });
});

//function thatll be executed when url is of productRoute
//shows all products to everone not only the admin>get req
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  //for pagination
  const resultsPerPage = 5;
  const productCount=await Product.countDocuments();

  //creating object of class apifeatires and calling its constructor
  //keyword is anything that user searches after ? mark in url
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);

  // we cant call product.find() again const products = await Product.find();
  const products = await apiFeature.query; //since we have got the entire obj above

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});
//function for put req that is update product>>admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  //let is used instead of const sinceitll be chnaged
  let product = await Product.findById(req.params.id);
  //if prod not found
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});
//function for delete products
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  //if user enters wrong id prod mot found then
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: "true",
    message: "Product deleted",
  });
});
//get single product or product details by their id
//to handle errors in the below function instead of using try and catch below we make a separate errohandler for this
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  //if user enters wrong id prod mot found then
  //if(!product){
  //   return res.status(500).json({
  //       success:false,
  //       message:"Product not found"
  //   })

  //}
  if (!product) {
    //next refers to callback
    //new ErrorHandler is object of class ErrorHandler
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: "true",
    product,
  });
});
