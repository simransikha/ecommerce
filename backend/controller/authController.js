const User = require('../model/user')
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

//register a user => /api/v1/register

exports.registerUser = catchAsyncError(async (req,res,next) => {
  

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale'
    })

    const {name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id:result.public_id,
            url:result.secure_url
        }
    })

     sendToken(user,200,res)
})

//login user => /api/v1/login

exports.loginUser = catchAsyncError(async (req,res,next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    //Finding Usser in database
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid Email  or Password',401));
    }

    //check if password is correct or not
    const isPasswordMatched = await user.ComparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email  or Password',401));
    }

    sendToken(user,200,res)
})

//forget password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req,res,next) =>{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler('user with this email is not found',404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false})

    //create reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `You password reset  token is as follow \n\n${resetUrl}\n\nIf you have not reset this email then ignored it.`

    try {
        
        await sendEmail({
            email: user.email,
            subject: 'Shop password recovery',
            message
        }) 

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));
        
    }

})

//reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req,res,next) =>{
    //Hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt:Date.now() }
    })

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired',400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match',400));
    }
 //set up password

 user.password  = req.body.password;
 user.resetPasswordToken = undefined;
 user.resetPasswordExpire = undefined;

     await user.save();
     sendToken(user,200,res)
})

//get currently logged user => /api/v1/me
exports.getUserProfile = catchAsyncError(async (req,res,next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

//update / change password => /api/v1/password/update
exports.updatePassword = catchAsyncError(async (req,res,next) => {
    const user = await User.findById(req.user.id).select('+password');
    
    //check previous user password
    const isMatched = await user.ComparePassword(req.body.oldPassword);
    
    if(!isMatched){
        return next(new ErrorHandler('Old password is not matched',400));
    }
    
    user.password = req.body.password;
     await user.save();
    
    sendToken(user,200,res)
    
    })
    
    //update your profile => /api/v1/me/update
exports.updateProfile = catchAsyncError(async (req,res,next) => {

    const newUserData = {
      name: req.body.name,
      email: req.body.email
    }
    
    //update avatar and todo

    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    
        new: true,
        runValidators:true,
        useFindAndModify:false
    })
    
    res.status(200).json({
        success:true
    })
    
    
    })
    

//logout user => /api/v1/logout

exports.logOut = catchAsyncError(async (req,res,next) => {

    res.cookie('token',null, {
        expires:new Date(Date.now()),
        httpOnly:true
    })

     res.status(201).json({
        success:true,
        message:'Logout Successfully'
     })
})

//Admin Routes

//Get all user => /api/v1/admin/users
exports.allAdminUser = catchAsyncError(async (req,res,next)=>{

    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

//Get user detail => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncError(async (req,res,next)=>{
 
    const user = await User.findById(req.params.id);

    if(!user){
        return next (new ErrorHandler(`User is not found with id ${req.params.id}`));
    }

    res.status(200).json({
        success:true,
        user
    })

})

//update profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncError(async (req,res,next) => {

    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    }
    
    //update avatar and todo
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    
        new: true,
        runValidators:true,
        useFindAndModify:false
    })
    
    res.status(200).json({
        success:true
    })
    
    
    })

    //delete user detail => /api/v1/admin/user/:id
exports.deleteuser = catchAsyncError(async (req,res,next)=>{
 
    const user = await User.findById(req.params.id);
    
    if(!user){
        return next (new ErrorHandler(`User is not found with id ${req.params.id}`));
    }

  //remove user from cloudinary

  const image_id = user.avatar.public_id;
   await cloudinary.v2.uploader.destroy(image_id);


    await User.deleteOne({
        _id: user._id
    }).catch((err)=>{
        console.log(err)
    })

    res.status(200).json({
        success:true,
        
    })

})