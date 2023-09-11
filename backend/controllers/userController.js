const ErrorHandler = require("../utils/errorHandler");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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
  sendToken(user, 201, res);
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
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  //if password doesntb match then no login
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  //if password matches

  //const token = user.getJWTToken();
  //res.status(200).json({
  //200>>ok
  //success: "true",
  //token, //instead of user w esend token
  //});
  //instead of above use thsi func below
  sendToken(user, 200, res);
});
//log out user
exports.logOutUser = catchAsyncErrors(async (req, res, next) => {
  //cookie takes 3 arg 1>keyword token 2> token val 3> options
  res.cookie("token", null, {
    //if loged ot cookie is deleted
    expires: new Date(Date.now()), //right now
    httpOnly: true,
  });
  res.status(200).json({
    success: "true",
    message: "Logged out", //instead of user w esend token
  });
});
// forgot password > we use nodemailer
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  //first find user with help of email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  //get reset password token>method of userSchema
  const resetToken = user.getResetPasswordToken();

  //inorder to save the resetPasswordToken and resetPasswordExpire tthat were assigned values in usermodel
  await user.save({ validateBeforeSave: false });
  //to send link to reset
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`; //instead of local host get whatver host is being used;protocol can be http or https
  //msg to be sent in mail
  const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\n If you have not requested for Passsword change then ignore it.`;
  //to send msg use try  catch
  try {
    //method to send email
    await sendEmail({
      //whom to send email
      email: user.email, //write email in body of postman (only if user is present in db email will be sent othersie err)
      subject: `Ecommerce password recovery`,
      message,
    });
    //after email is sent
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    //if theres error undefine whatevr we jsut stored above >resetPassword token,expire
    user.getResetPasswordToken = undefined;
    user.getResetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
//from above we get link to email(
//http://localhost:4000/api/v1/password/reset/cf3b741a16aaeee17d4697031a11f0d596b5e9b3) > reset password ,
//reset passsword

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //get token number from above link and use it to search fro the user in db
  // in user model we have stored token of users in hasehd format(resetPasswordToken) so hash the token number we got above as well
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  // use this hashed token to search for user whose hahsed token is stored in db
  const user = await User.findOne({
    resetPasswordToken, //resetPasswordToken:resetPasswordToken.same
    resetPasswordExpire: { $gt: Date.now() }, //expiry should remain ex: if date.now is 5 we have 5+15 min so gt5
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is inavlid or has been expired",
        400
      )
    );
  }
  //if user is got>change password
  // check if password at both places is right
  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }
  //change user password
  user.password = req.body.password; //type password in body of postman along with confirmpassword
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  //save all details
  await user.save();
  //now since password is chnaged log in the user as well
  sendToken(user, 200, res);
});
//get user details same like get product detauls
//its detail of the user who has logged in to be known by the user we use this
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  //a user can get his setails only if he has logged in
  //in auth.js when a auser has loggged in his detaiuls are stored in req.user from that we are taking id
  //there is not comdition that user wont be found since this step is done after being logged out

  res.status(200).json({
    success: "true",
    user,
  });
});
//update/change user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password"); //finding user by id and password since password is kept false by deafult so use slesct
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res); //after passowrd is changed we login the user as well
});
//change or update user profile>name,email,pic apart from password
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  //for changing pic we use cloudinary
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});
//get all users>>ADMIN
//if admin wants to know who are the users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});
//get user detail individually>>ADMIN
//if admin wants to know details of the user
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id); //req.params.id>>from request url get param having keyword id
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with ID:${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});
//update user role
//if ADMIN wants to chnage role of any user to admin
exports.updateRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    //it is req.params.id and not req.user.id otherwise admin himself will get updated
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with ID:${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
  });
});
//delete user>>ADMIN

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  //find user to del
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with ID:${req.params.id}`, 400)
    );
  }
  //we will remove avatar from cloudinary
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
