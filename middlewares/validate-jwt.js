const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res, next) => {
    // get the token
    const token = req.headers['authorization']?.split(' ')

    // validate token exists
    if (!token || !token[1]) {
        return res.status(401).json({
            msg: 'missing token'
        })
    }

    try {
        const payload = jwt.verify(token[1], process.env.TOKEN_KEY);
        const userAuth = await User.findById(payload.id);

        if (!userAuth) res.status(401).json({
            msg: 'user in token not found'
        })

        if (!userAuth.status) return res.status(401).json({
            msg: 'user status in token invalid'
        })

        req.tokenPayload = payload;
        req.userAuthInfo = userAuth;

    } catch (error) {
        return res.status(401).json({
            msg: 'invalid token '+ error
        })
    }

    next();
}

module.exports = {
    validateJWT
};