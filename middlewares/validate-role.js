const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateAdminRole = async (req, res, next) => {

    if (!req.userAuthInfo) return res.status(401).json({
            msg: "missing user info in token"
        });
    if (req.userAuthInfo.role != 'ADMIN_ROLE') return res.status(401).json({
            msg: "invalid credentials"
        });
    next();
}

const validateRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.userAuthInfo) return res.status(401).json({
            msg: "missing user info in token"
        });
        if (!roles.includes(req.userAuthInfo.role)) return res.status(401).json({
            msg: "invalid credentials"
        });
        next();
    }
}

module.exports = {
    validateAdminRole,
    validateRoles
};