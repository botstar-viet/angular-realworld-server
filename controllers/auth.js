const jwt = require('jsonwebtoken'),
    key = require('../routes/key');

const getToken = (payload) => {
    return jwt.sign(payload, key.PRIVATE_KEY, key.signOptions);
}

const verifyToken = (token) => {
    return jwt.verify(token, key.PRIVATE_KEY, key.signOptions);
}

const getTokenFromHeader = (req) => {
    const token = req.headers.authorization;
    if (token && token.split(' ')[0] === 'Token' ||
        token && token.split(' ')[0] === 'Bearer') {
        return token.split(' ')[1];
    }
    return null;
}

const authorizated = (req, res, next) => {
    const pure_token = getTokenFromHeader(req);
    if (pure_token !== null) {
        verifyToken(pure_token) !== null && next();
    }
    res.status(111).json({ message: `Unauthorized` });
}

module.exports = { getToken, verifyToken, authorizated };