const express = require("express");
const QRCode = require("qrcode");
const { isValidUrl } = require("../middleware/validateUrl");

const router = express.Router();

router.post("/", isValidUrl, async (req, res) => {
    const { url } = req.body;

    try {
        let qr = await QRCode.toDataURL(url, {
            width: 600,
            margin: 2,
            errorCorrectionLevel: "M",
            color: { dark: "#0f172a", light: "#ffffff" },
        });
        res.json({ url, qr });
    } catch (err) {
        res.status(500).json({ message: "could not generate qr" });
    }
});

module.exports = router;
