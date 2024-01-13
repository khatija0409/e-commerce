const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//to create order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  //things needed to create product
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});
//get single order details(shipping info etc..)
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); //populate>takes users id goes to user db and gets email and name

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});
//get all order of the user who is logged in
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }); //find all orders of the user who has loggged in having taht id>filter

  res.status(200).json({
    success: true,
    orders,
  });
});
//get all ordes of the user>>ADMIN
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find(); //find all orders of the user who has loggged in having taht id>filter
  let totalAmount = 0;
  //total amount of all orders made my diff users
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});
//update order status>>ADMIN
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }
  //find all orders of the user who has loggged in having taht id>filter
  //checking if orderstaus is already delivered
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }
  //if not yet delivered
  //change quantity in stock present in product for the already delivered itmes
  if(req.body.status==="Shipped"){
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity); //product id and quantity
    });

  }
  //after stock is updated
  order.orderStatus = req.body.status;
  //if order status till now is not delivered and now we are updating in body that its delivered
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
async function updateStock(id, quantity) {
  const product = await Product.findById(id); //from prod id find the product in product collection
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
//delete ordes of the user>>ADMIN
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id); //find all orders of the user who has loggged in having taht id>filter
  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }
  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});
