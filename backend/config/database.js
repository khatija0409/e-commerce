//filecan be made anywhere
const mongoose=require("mongoose");
//connect to db
//mongoose.connect("mongo://localhost:27017/Ecommerce" this path isnt used since after hosting on cloud we cant change here
//making a function to connect db

const connectDB =( )=>{
    //others objects like use create index are removed in this version
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`MongoDB is connected with server: ${data.connection.host}`);
        });
}
module.exports=connectDB
     