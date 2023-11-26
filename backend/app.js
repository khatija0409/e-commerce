//make an express app by importing express
const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");

const dotenv = require("dotenv");
//import error middleware
const errorMiddleware = require("./middleware/error");
 
 
// config
dotenv.config({
    path: "backend/config/config.env",
  });
  
app.use(cors());
//for json input to be given in body of postman and see op in response
app.use(express.json());
//for using cookie parser so that cookie can be read from postman
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
 

 

 
 
//IMPORT ROUTES
//import product router
const product = require("./routes/productRoute");
//import user router
const user = require("./routes/userRoute");
//import order route
const order = require("./routes/orderRoute");

const payment = require("./routes/paymentRoute");
 

 
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1",payment );
//to use middleware for error
app.use(errorMiddleware);
//export app to be used in server.js
module.exports = app;
