const ErrorHandler = require('../utils/errorHandler');


module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode  || 500;
    
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error:err,
            errMessage:err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}

        error.Message = err.message;

        //wrong Mongoose Id
        if(err.name === 'CastError'){
          const message = `Resources not found.Inavalid ${err.path}`
          error = new ErrorHandler(message,404)
        }

        //Validation Error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message,404)
        }

        res.status(error.statusCode).json({
            success:false,
            message: err.message || 'Internal server error'
        })
    }


    
}