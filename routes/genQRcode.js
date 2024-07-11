const express = require('express');

const {genQRCode} = require('../controllers/qrcodeController');
const {protect} = require('../middleware/auth')


const router = express.Router();

router.route("/genqrcode").get(protect, genQRCode);

module.exports = router