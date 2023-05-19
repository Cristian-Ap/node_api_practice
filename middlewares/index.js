const validateJWT = require("../middlewares/validate-jwt");
const validateRole = require("../middlewares/validate-role");
const ErrorHandler = require("../middlewares/error-handler");

module.exports = {
    ...validateJWT,
    ...validateRole,
    ...ErrorHandler,
}