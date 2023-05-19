const { validationResult } = require("express-validator");

const ErrorHandler = ( req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.errors.map((el) => el.msg));
    }
    next();
}

module.exports = {
    ErrorHandler
};