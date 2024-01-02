//make an express app by importing express
const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
 
// config
dotenv.config({
    path: "backend/config/config.env",
  });
  
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());


// product router
const product = require("./routes/productRoute");
// user router
const user = require("./routes/userRoute");
// order router
const order = require("./routes/orderRoute");
// payment router
const payment = require("./routes/paymentRoute");
 
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1",payment );
app.use(errorMiddleware);

module.exports = app;
