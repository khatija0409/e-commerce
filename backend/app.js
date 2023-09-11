//make an express app by importing express
const express = require("express");
const app = express();
//import error middleware
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
//IMPORT ROUTES
//import product router
const product = require("./routes/productRoute");
//import user router
const user = require("./routes/userRoute");
//import order route
const order = require("./routes/orderRoute");
//for json input to be given in body of postman and see op in response
app.use(express.json());
//for using cookie parser so that cookie can be read from postman
app.use(cookieParser());
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
//to use middleware for error
app.use(errorMiddleware);
//export app to be used in server.js
module.exports = app;
