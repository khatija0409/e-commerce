const app = require("./app");
const cloudinary=require("cloudinary");
const connectDB = require("./config/database");
//handling uncaught exceptions 
process.on("uncaughtException",(err)=>{
   console.log(`Error:${err.message}`);
   console.log(`Shutting down the server due to uncaught exception`);
   process.exit(1);
});

// path of dotenv file
if(process.env.NODE_ENV!=="PRODUCTION"){
  require("dotenv").config({
    path: "backend/config/config.env"
  });
}
 
//connect to database
connectDB();
// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

//listen server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejecetion`);

  server.close(() => {
    process.exit(1);
  });  
});
