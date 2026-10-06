const isValidUrl = (req, res, next) => {
    let { url } = req.body;

    if (!url || typeof url !== "string") {
        return res.status(400).json({ message: "link is required" });
    }

    url = url.trim();

    // add https if user forgot the protocol
    if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
    }

    try {
        let parsed = new URL(url);
        if (!parsed.hostname.includes(".")) {
            return res.status(400).json({ message: "enter a valid link" });
        }
        req.body.url = parsed.href;
    } catch (err) {
        return res.status(400).json({ message: "enter a valid link" });
    }

    next();
};

module.exports = { isValidUrl };
