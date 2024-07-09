const express = require('express');

const {signUpLecturer, loginLecturer} = require('../controllers/lecturerAuthControllers');

const router = express.Router();

router.route('/signup').post(signUpLecturer);
router.route('/login').post(loginLecturer);


module.exports = router;