//make an express app by importing express
const express = require("express");
const app = express();
//import error middleware
const errorMiddleware = require("./middleware/error");
//import product router
const product = require("./routes/productRoute");
//import user router
const user = require("./routes/userRoute");
//for json input to be given in body of postman and see op in response

app.use(express.json());
app.use("/api/v1", product);
app.use("/api/v1", user);

//middleware for error
app.use(errorMiddleware);
//export app to be used in server.js
module.exports = app;
