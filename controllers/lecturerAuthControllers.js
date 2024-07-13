const lecturerModel = require("../models/lecturerModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const createToken = (email) => {
  const maxAge= 3 * 24 *60 *60;

    return jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: maxAge})
};

const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

exports.signUpLecturer = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const lecturer = new lecturerModel({
      username,
      email,
      password: hashedPassword,
    });

    const validationError = lecturer.validateSync();
    if (validationError) {
      return res.status(400).json({ message: validationError.message });
    }

    await lecturer.save();
    res.send({ message: "successful", data: lecturer.email });
  } catch (error) {
    console.error("Error registering lecturer:", error);
    // Handle specific errors (e.g., mongoose duplicate key error)
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Error registering lecturer" });
  }
};

exports.loginLecturer = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const lecturer = await lecturerModel.findOne({ email });
    
    if (!lecturer) {
      return res.send({ message: "unsuccessful wrong email", data: null });
    }
    
    const isPassword = await bcrypt.compareSync(password, lecturer.password);
    
    if (!isPassword) {
      return res.send({
        message: "unsuccessful",
        response: "invalid credentials",
      });
    }
    
    const token = await createToken(lecturer.email);
    res.cookie('auth_token', token, {httpOnly: true, maxAge:8640000});
    res.json({token})
  } catch (error) {  
    console.error("Error logging in lecturer:", error);
    return res.status(500).json({ message: "Error logging in lecturer" });
  }
};
