export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
// export const generateToken = (user, message, statusCode, res) => {
//   const token = user.generateJsonWebToken();
//   const options = {
//     expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//   };
//   res.status(statusCode).cookie('token', token, options).json({
//     success: true,
//     message,
//     user,
//     token,
//   });
// };
