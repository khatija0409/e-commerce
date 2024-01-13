const mongoose=require("mongoose");
// Conect database
const connectDB =( )=>{
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`MongoDB is connected with server: ${data.connection.host}`);
        });
}
module.exports=connectDB
     