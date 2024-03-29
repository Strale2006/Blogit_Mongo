const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
   username:{
       type: String,
       required: [true, "Please provide a username"]
   },
   email:{
       type: String,
       required: [true, "Please provide an email"],
       unique: true,
       match: [
           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
           "Please provide a valid email"
       ]
   },
   password:{
       type: String,
       required: [true, "Please add a password"],
       minLength: 6,
       select: false
   },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verificationToken: String,
    isVerified: {
       type: Boolean,
       default: false
    },
    tasks: {
        type: [String], // Tip je niz stringova
        default: [] // Podrazumevana vrednost je prazan niz
    }
});

UserSchema.pre("save", async function(next){
    if (!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.methods.matchPasswords = async function (password){
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = resetToken

    this.resetPasswordExpire = Date.now() + 10* (60 * 1000);

    return resetToken;
}

UserSchema.methods.getVerificationToken = function() {
    const verificationToken = crypto.randomBytes(20).toString("hex");

    this.verificationToken = verificationToken;

    return verificationToken;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;