const ErrorHander = require("../utils/errorhander")

module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    // Wrong Mongodb Id error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message,400);
    }

    // Mongoose dublicatekey errors
    if(err.code === 11000){
        const message = `Dublicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHander(message,400);
    }

    // Wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = ` Json Web Token is Invaild, Try again`;
        err = new ErrorHander(message,400);
    }

    // JWT Expire error
    if(err.name === "TokenExpireError"){
        const message = ` Json Web Token is Expired, Try again`;
        err = new ErrorHander(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        error:err.message,

    })
 
   
}