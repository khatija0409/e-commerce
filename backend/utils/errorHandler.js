//Handling error 

class ErrorHandler extends Error{
    constructor(message,statusCode){
        //using constructor of parent class using super
        super(message);
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports=ErrorHandler;
