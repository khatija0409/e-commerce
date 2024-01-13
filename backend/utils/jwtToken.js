const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    //expiry of cookie
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, //cannot be accessed by client scripts
  };
  res.status(statusCode).cookie("token", token, options).json({
    //200--ok
    success: "true",
    user,
    token, 
  });
};
module.exports = sendToken;
