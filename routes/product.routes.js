const { Router } = require("express");
const { check} = require("express-validator");
const prodController = require("../controllers/product.controller");
const {
	ErrorHandler,
	validateJWT,
	validateAdminRole,
	validateRoles,
} = require("../middlewares");
const { productExist, categoryExist } = require("../helpers/custom-validators");

const router = Router();

router.get('/', [
    validateJWT,
    ErrorHandler
], prodController.getProducts);

router.get('/paginated', [
    validateJWT,
    ErrorHandler
], prodController.getProductsPaginated);

router.get('/:id', [
    validateJWT,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(productExist),
    ErrorHandler
], prodController.getOneProduct);

router.post('/', [
    validateJWT,
    check("name", "name is required").not().isEmpty(),
    check("category", "Invalid id category id").isMongoId(),
    check("category").custom(categoryExist),
    ErrorHandler
], prodController.createProduct);

router.put('/:id', [
    validateJWT,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(productExist),
    check("name", "name is required").not().isEmpty(),
    check("category", "Invalid id category id").isMongoId(),
    check("category").custom(categoryExist),
    ErrorHandler
], prodController.updateProduct);

router.delete('/:id', [
    validateJWT,
    validateRoles("ADMIN_ROLE"),
    validateAdminRole,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(productExist),
    ErrorHandler
], prodController.deleteProduct);



module.exports = router;