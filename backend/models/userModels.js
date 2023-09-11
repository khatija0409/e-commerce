//making schema >models
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); //no need to install>builtIn
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"], //[if entered,if not entered]
    maxLength: [30, "Name cannot 30 characters"],
    minLength: [4, "Name cannot be less than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email"], //[if entered,if not entered]
    unique: true, //email must be new
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"], //[if entered,if not entered]
    minLength: [8, "Password cannot be less than 8 characters"],
    select: false, //whenever a search for a user is made in db password will be hidden
  },
  avatar: {
    //profile pic
    //not an array since there will be only 1 pic

    //well use cloudnavi to host images and we get 2 things
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
    default: "user", //utill he is made admin he will be user
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});
//write all databse opeartions related to user here
//save is an event and pre menas before saving
// we use function and not arrow func since we cnt use this. inside callback
userSchema.pre("save", async function (next) {
  //if we give update option for user to chnage his profile name email ,1st update method for name email etc whatver user wants to vhnage,2nd separate update for only password

  //whenevr name and email is given and password is not changed , hashing shouldnt take place on already hashed password so
  if (!this.isModified("password")) {
    //if password is not modified
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
//JWT TOKEN>>authorization
//after registering if we want to get logged into the website without entering login details again we use this, and if its a user/admin depending on that we can access routes

//we generate tokoen and store in cookie
//method to generate token
//name  of methos if getJWTToken
userSchema.methods.getJWTToken = function () {
  //make jwt token
  //this._id is id of individual user'seen in response of postman
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRE, //expiry of log in session
  });
  //
};
// function for comparing entered password an password in db
userSchema.methods.comparePassword = async function (enteredPassword) {
  //password in db is inhash so use bcrypt method
  return await bcrypt.compare(enteredPassword, this.password); //this.password is hashed password of indiv user in db; return true or false
};
//creating a method for reset password
userSchema.methods.getResetPasswordToken = function () {
  //gen token
  const resetToken = crypto.randomBytes(20).toString("hex"); //gives 20 random bytes which are converted to string in hexa dec format
  //creating hash and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); //which algo to use,what to update and hex gives meaningful val
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //token expires in so much time
  return resetToken;
};

module.exports = new mongoose.model("User", userSchema);
