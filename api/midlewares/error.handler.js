function logErrors(err,req,res,next){
    console.log('logError');
    console.log(err);
    next(err)
}

function errorHandler(err,req,res,next){
    console.error('errorHandler');    
    res.status(500).json({
            message:err.message,
            stack:err.stack
        });
        next(err);
}
//Cannot set headers after they are sent  to the client 
function boomErrorHandler(err,req,res,next){

    if(err.isBoom){
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }else{
        next(err);
    }
}



module.exports={logErrors,errorHandler,boomErrorHandler};