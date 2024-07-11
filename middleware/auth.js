const jwt = require("jsonwebtoken");
const lecturerModel = require("../models/lecturerModel");


exports.protect = async (req, res, next) => {
  const token = req.cookies && req.cookies.auth_token

  if (!token) {
    return res.send({
      message: "unsuccessful",
      error: "Please login to access route",
    });
  }
  try {
    let decoded = jwt.verify(token, "node jwt");

    let user = await lecturerModel.findById(decoded.id);
    
    if (!user) {
      return res.send({
        message: "unsuccessful",
        error: "Please login to access route",
      });
    }
    
    req.user = user;
  } catch (error) {
    return res.send({
      message: "unsuccessful",
      error: "Please login to access route",
    });
  }
  next();
};