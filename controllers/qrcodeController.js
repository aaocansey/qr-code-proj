const QRCode = require('qrcode'); // Assuming type definitions installed

exports.genQRCode = async (req, res) => {
    console.log(req.headers.url);
    try {
        const url = req.headers.url;
        const qrCodeImage = await QRCode.toDataURL(url);
        res.send(qrCodeImage);
    } catch (err) {
        console.error("Error generating QR code:", err);
        res.status(500).send("Internal Server Error");
    }
};



// req.query.url || 
