const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
   name:{
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Your name cannot exceed 30 Character']
   },
   email:{
          type:String,
          required: [true, "Please enter your email"],
          unique: true,
          validate: [validator.isEmail, 'please enter valid email address']
   },
   password:{
       type:String,
       required: [true, 'Please enter your password'],
       minlength: [5,'Your password must be longer than 5 character'],
       select:false

   },
   avatar:{
    public_id:{
        type:String,
    
    },
    url:{
        type:String,
    }
   },
   role:{
       type:String,
       default: 'user'
   },
   createdAt:{
    type:String,
    default: Date.now
   },
   resetPasswordToken:String,
   resetPasswordExpire:Date

})

//Encrypting Password before saving user
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
    next()
}

this.password = await bcrypt.hash(this.password,10)

})

//compare Password
userSchema.methods.ComparePassword = async function (enteredPassword){
   return  await bcrypt.compare(enteredPassword,this.password)
}

//Retuen JWT token 
userSchema.methods.getJwtToken = function () {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

userSchema.methods.getResetPasswordToken = function(){
    // generate token
    const resetToken = crypto.randomBytes(32).toString('hex'); 

    //hash and reset to password token
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //time to expire password
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('User',userSchema)