const User = require('../model/user')
const jwt = require('jsonwebtoken')
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

exports.isAuthenticatedUser = catchAsyncError(async (req,res,next) => {

    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler('Login First',401))
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()

})

//Handling user roles
exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role ${req.user.role} is not allowed to access this role`,403))
        }
        next()
    }
}