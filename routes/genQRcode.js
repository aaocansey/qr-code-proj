const express = require('express');

const {genQRCode} = require('../controllers/qrcodeController');
const {protect} = require('../middleware/auth')


const router = express.Router();

router.get('/genqrcode', protect, genQRCode);

module.exports = router