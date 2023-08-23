//making schema >models
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    select: false, //whenever a search is made in db password will be hidden
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
//save is an event and pre menas before saving
// we use function and not arrow func since we cnt use this. inside callback
userSchema.pre("save", async function (next) {
  //1st update method for name email etc whatver user wants to vhnage,2nd separate update for only password

  //whenevr name and email is given and password is not changed , hashing shouldnt take place on already hashed password so
  if (!this.isModified("password")) {
    //if password is not modified
    next();
  }

  this.password = await bcrypt.hash(this.password);
});

module.exports = new mongoose.model("User", userSchema);
