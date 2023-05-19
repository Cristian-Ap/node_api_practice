const { Router } = require("express");
const { check} = require("express-validator");
const { ErrorHandler } = require("../middlewares/error-handler");
const { authUser } = require("../controllers/auth.controller");

const router = Router();

router.post("/login",[
    check('email', 'email is required and must be a valid email').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    ErrorHandler
], authUser);

module.exports = router;