const jwt = require('jsonwebtoken');
const key = require('../routes/key');

const getToken = async(payload) => {
    const token = jwt.sign(payload, key.PRIVATE_KEY, key.signOptions);
    return token;
}

const verifyToken = async(token) => {
    return jwt.verify(token, key.PRIVATE_KEY, key.signOptions);
}

const getTokenFromHeader = async(req) => {
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
        verifyToken(pure_token) === null ? res.status(111) : next();
    }
    res.status(111);
}

module.exports = { getToken, verifyToken, authorizated };