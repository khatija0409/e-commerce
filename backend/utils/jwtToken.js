//since this is repeated we write a function for it
//const token = user.getJWTToken();
//  res.status(200).json({
//200>>ok
//    success: "true",
//    token, //instead of user w esend token
//  });
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  // making a variable that will have options of cookie

  const options = {
    //expiry of cookie
    //from cookie gen date to time limit
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, //cannot be accessed by client scipts
  };
  //token in stored in a cookie
  //cookie can be seen in response in postman
  //cookie takes 3 arg 1>keyword token 2> token val 3> options
  res.status(statusCode).cookie("token", token, options).json({
    //200>>ok
    success: "true",
    user,
    token, //instead of user w esend token
  });
};
module.exports = sendToken;
