const User = require("../models/user.model");
const { tryCatch } = require("../utils/tryCatch");
const AppError = require("./AppError");
const jwt = require("jsonwebtoken");

const auth = tryCatch(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  }

  // Make sure token exists
  if (!token) {
    return next(new AppError(401, "Not authorized to access this route"));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

const verifytoken = tryCatch(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  }

  // Make sure token exists
  if (!token) {
    return next(new AppError(401, "Not authorized to access this route"));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  res.status(200).json({
    status: true,
    statuscode: 200,
  });

  // req.user = await User.findById(decoded.id);
});

module.exports = {
  auth,
  verifytoken,
};
