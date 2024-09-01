const jwt = require("jsonwebtoken");

const createToken = user => {
    const payload = {
        id: user.id,
        username: user.username,
    };
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "2160h" });
};

module.exports = {
    createToken,
};
