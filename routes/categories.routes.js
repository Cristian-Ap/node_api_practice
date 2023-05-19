const { Router } = require("express");
const { check } = require("express-validator");
const {
	ErrorHandler,
	validateJWT,
	validateAdminRole,
	validateRoles,
} = require("../middlewares");
const catController = require("../controllers/categories.controller");
const { categoryExist } = require("../helpers/custom-validators");

const router = Router();

router.get("/", [validateJWT, ErrorHandler], catController.getCategories);

router.get(
	"/paginated",
	[validateJWT, ErrorHandler],
	catController.getCategoriesPaginated
);

router.get(
	"/:id",
	[
		validateJWT,
		check("id", "Invalid id").isMongoId(),
		check("id").custom(categoryExist),
		ErrorHandler,
	],
	catController.getOneCategory
);

router.post(
	"/",
	[
		validateJWT,
		check("name", "name is required").not().isEmpty(),
		ErrorHandler,
	],
	catController.createCategory
);

router.put(
	"/:id",
	[
		validateJWT,
		check("id", "Invalid id").isMongoId(),
		check("id").custom(categoryExist),
		check("name", "name is required").not().isEmpty(),
		ErrorHandler,
	],
	catController.updateCategory
);

router.delete(
	"/:id",
	[
		validateJWT,
		validateRoles("ADMIN_ROLE"),
		validateAdminRole,
		check("id", "Invalid id").isMongoId(),
		check("id").custom(categoryExist),
		ErrorHandler,
	],
	catController.deleteCategory
);

module.exports = router;
