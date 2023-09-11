//Ex: if whenever a user logs in only then we need to show products, for implementing this functionality
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
// till the user is logged in all products will be displayed
//isAuthUser>> to check if user is logged in
exports.isAuthUser = catchAsyncErrors(async (req, res, next) => {
  //get val of token stored in cookies as seen in postman,{token }gives exact token val and toen gives token obj{....}
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  // if token found
  //token was made using users id and secret key
  const decodedData = jwt.verify(token, process.env.JWT_SECRETKEY); //verifies the token
  //getting id of token
  //till the user is logged in we can make any req on user
  req.user = await User.findById(decodedData.id);
  next();
});
//func for authrole
//only if role is admin he can create update and del
//(...roles)is nothing but array of paramters>admin
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    //req.user has all details of user
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role:${req.user.role} is not allowed to access this resource`,
          403
        )
      ); //403>server refused to provide
    }

    //if admin role is matched
    next(); //passes control to next middleware function by comin out of currrent middleware func
    //returns nothing empty
  };
};
