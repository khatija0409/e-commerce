//for handling any error instead of writing repetitve code like if(!product) in controller file
//inherits nodes default class Error
//here only initialization is taking place
class ErrorHandler extends Error{
    constructor(message,statusCode){
        //using constructor of paremt classs using super
        super(message);
        this.statusCode=statusCode;
        //methos of parent class is used
        //above constructor
        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports=ErrorHandler;
//to run this we use a middleware error.js