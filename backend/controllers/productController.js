const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
//create product first ans export it simultaneously
//check api video
//create product >>admin(no one else can create a product)
//previously catchAsyncErrors func wasnt used
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  // in users body we are assigning user id whoever created the product(by being logged in) which will be seen in response of postman
  //details of user is taken in auth.js in req.user
  // after a  product is created in response in postman we get user id it is the same id of the person who has logged in and created the product in this case it is the admin
  req.body.user = req.user.id;
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
  const resultsPerPage = 8;
  const productCount = await Product.countDocuments();

  //creating object of class apifeatires and calling its constructor
  //keyword is anything that user searches after ? mark in url
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeature.query;
  let filteredProductsCount = products.length;
  apiFeature.pagination(resultsPerPage);

  // we cant call product.find() again const products = await Product.find();
  products = await apiFeature.query.clone(); //since we have got the entire obj above

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    filteredProductsCount,
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
    useFindAndModify: false,
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
//create new review or update existing rev
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body; //will be given by us iin body of postman
  const review = {
    //rev is array specified in prodSchema
    //already defined in prodSchema
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  //find product for which rev iwill be given or is already given to update it
  const product = await Product.findById(productId); //first find prod by id which will be enetered in body of postman
  //if reviewed already
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  ); //rev.user(rev can be any var as weell) >>gives user id who gave the rev , extract it from the review objcet we created above//check if obtained id== loggend in users id
  //from above if ist equal it means that user has already reviewed before and he just wants to update itt

  //if prod is already reviewed
  if (isReviewed) {
    //if same user is giving rev again then just update the old rev
    //update rev
    product.reviews.forEach((rev) => {
      if ((rev) => rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    //new rev>>by new user
    //if prod is not reveiwed then add rev to rev obj defined in prodSchema for the first time
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  //overall rating not rating inside reviews
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
//get all the reviews of a single product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id); //id will be given in query part after ? key-val pair >id of product
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
//delte rev
//in this we retain all reviews after deleting any particular rev
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId); //id will be given in query part after ? key-val pair>>id of product
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  //inorder to del rev>>> keep reviews that we need by elimainating deleted rev
  //below has reviews that we want excludibg the ones to be deleted
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  ); //every rev has an id genertated!== id of rev to be deleted which is given as query
  //when rev is del other parametres change
  let avg = 0;
  reviews.forEach((rev) => {
    //npt product .reviews bcz rvviews has filtered version
    avg += rev.rating;
  });
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
  });
});
