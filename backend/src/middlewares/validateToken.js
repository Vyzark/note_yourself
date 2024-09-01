const jwt = require("jsonwebtoken");

const INVALID_ACCESS = "Invalid access token. Login to continue.";

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: INVALID_ACCESS });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY);
        req.user = payload

        next();

    } catch (error) {
        return res.status(401).json({ message: INVALID_ACCESS });
    }
};

module.exports = validateToken;
