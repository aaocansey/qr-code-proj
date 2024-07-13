const jwt = require("jsonwebtoken");
const lecturerModel = require("../models/lecturerModel");


exports.protect = async (req, res, next) => {
  const {token} = req.body
  console.log(token);

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
          //If token is successfully verified, we can send the autorized data 
          res.json({
              message: 'Successful log in',
              decodedData
          });
          console.log('SUCCESS: Connected to protected route');
          console.log(`decoded data is ${decodedData}`);
          let user = await lecturerModel.findOne(decodedData);
          console.log(user);
          
          if (!user) {
            return res.status(500);
          }
          req.user = user;
        }
      });

  } catch (error) {
    console.log(error)
    return res.status(403)
  }
};