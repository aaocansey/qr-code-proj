const express = require('express');

const {genQRCode} = require('../controllers/qrcodeController');
// const {loginLecturer} = require('../controllers/lecturerAuthControllers');


const router = express.Router();

router.route("/genqrcode").get(genQRCode);

module.exports = router