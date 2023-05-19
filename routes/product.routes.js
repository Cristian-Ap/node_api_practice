const { Router } = require("express");
const { check} = require("express-validator");
const prodController = require("../controllers/product.controller");
const {
	ErrorHandler,
	validateJWT,
	validateAdminRole,
	validateRoles,
} = require("../middlewares");
const { categoryExist } = require("../helpers/custom-validators");

const router = Router();

router.get('/', [
    validateJWT,
    ErrorHandler
], prodController.getProducts);

router.post('/', [
    validateJWT,
    check("name", "name is required").not().isEmpty(),
    check("category", "Invalid id category id").isMongoId(),
    check("category").custom(categoryExist),
    ErrorHandler
], prodController.createProduct);

module.exports = router;