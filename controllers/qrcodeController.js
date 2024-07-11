const QRCode = require('qrcode'); // Assuming type definitions installed

exports.genQRCode = async (req, res) => {
    try {
        const url = "https://youtube.com";
        const qrCodeImage = await QRCode.toDataURL(url);
        res.send(qrCodeImage);
    } catch (err) {
        console.error("Error generating QR code:", err);
        res.status(500).send("Internal Server Error");
    }
};



// req.query.url || 
