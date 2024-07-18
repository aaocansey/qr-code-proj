const jwt = require("jsonwebtoken");
const lecturerModel = require("../models/lecturerModel");


exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.send({
      message: "user not logged in",
      error: "Please login to access route",
    });
  }

  try {
  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedData) => {
      if(err){
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      } else {
          console.log('SUCCESS: Connected to protected route');
          console.log(decodedData.email);
          email = decodedData.email
          let user = await lecturerModel.findOne({email});    
          // console.log(user);    
          if (!user) {
            res.status(500);
          }
          req.user = user;
        }
      });
      next()

  } catch (error) {
    console.log(error)
    return res.status(403)
  }
};