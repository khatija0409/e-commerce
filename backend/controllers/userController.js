const ErrorHandler = require("../utils/errorHandler");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");

//reister a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is pub id",
      url: "this is url",
    },
  });
  //calling the token creation function
  const token = user.getJWTToken();

  res.status(201).json({
    //201>>created
    success: "true",
    token, //instead of user w esend token
  });
});
//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  // forr logging in we need only email and password
  const { email, password } = req.body;
  //check if user has given both password and email
  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400)); //first error initialzation is done through errorhandler and then next function is called from error.js
  }
  // if both email and password is there then we search for user in db
  //findOne since we are searching for single user
  const user = await User.findOne({ email }).select("+password"); //email:email since both are same write email once; since password select was made false in userschema we use select here for password
  //if user not found
  if (!user) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }
  const isPasswordMatched = user.comparePassword(password);
  //if password doesntb match then no login
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }
  //if password matches
  const token = user.getJWTToken();
  res.status(200).json({
    //200>>ok
    success: "true",
    token, //instead of user w esend token
  });
});
