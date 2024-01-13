const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"], 
    maxLength: [30, "Name cannot 30 characters"],
    minLength: [4, "Name cannot be less than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email"], 
    unique: true, 
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"], 
    minLength: [8, "Password cannot be less than 8 characters"],
    select: false, 
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //if password is not modified
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
//JWT TOKEN--authorization
userSchema.methods.getJWTToken = function () {
  //make jwt token
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRE, //expiry of log in session
  });
  //
};
userSchema.methods.comparePassword = async function (enteredPassword) {
  //password in db is in hash so use bcrypt method
  return await bcrypt.compare(enteredPassword, this.password); 
};
userSchema.methods.getResetPasswordToken = function () {
  //Generate token
  const resetToken = crypto.randomBytes(20).toString("hex"); //gives 20 random bytes which are converted to string in hexa dec format
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); 
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //expiry of token
  return resetToken;
};

module.exports = new mongoose.model("User", userSchema);
