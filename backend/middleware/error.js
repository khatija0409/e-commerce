//importing class where initialising is done and op is sent here
const ErrorHandler = require("../utils/errorHandler");
//making a func for middleware
module.exports = (err, req, res, next) => {
  //whatever code we sent or 500
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //mongodb error >cast error > like when id given in postman is unusual len like 3 characters
  if (err.name == "CastError") {
    const message = `Resource not found. Invalid:${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //when an already registered user tries to regiser again we get E11000 duplicate key error collection: to solve that by giving a proper err msg
  if (err.code == 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`; //whatever is duplicate email or name will be shown
    err = new ErrorHandler(message, 400);
  }
  //when wrong jswt is entnred during reset
  if (err.name == "JsonWebTokenError") {
    const message = `Json Web Token is invalid. Try again`;
    err = new ErrorHandler(message, 400);
  }
  //JWT expire errror
  if (err.name == "TokenExpiredError") {
    const message = `Json Web Token has expired. Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
