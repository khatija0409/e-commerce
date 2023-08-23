//importing class where initialising is done and op is sent here
const ErrorHandler=require("../utils/errorHandler");
//making a func for middleware
module.exports=(err,req,res,next)=>{
    //whatever code we sent or 500
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal server error";


    //mongodb error >cast error > like when id given in postman is unusual len like 3 characters 
    if(err.name=="CastError"){
        const message=`Resource not found. Invalid:${err.path}`;
        err=new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });


}