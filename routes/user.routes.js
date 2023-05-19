const { Router } = require("express");
const { check } = require("express-validator");
const {
	getUsers,
	getUsersPaginated,
	getOneUser,
	updateUser,
	deleteUser,
	createUser,
} = require("../controllers/user.controller");
const {
	roleIsSupported,
	emailAlreadyUsed,
	userExist,
} = require("../helpers/custom-validators");
const {
	validateJWT,
	validateAdminRole,
	validateRoles,
	ErrorHandler,
} = require("../middlewares");

const router = Router();

router.get("/", [validateJWT], getUsers);

router.get("/paginated", [validateJWT, ErrorHandler], getUsersPaginated);

router.get("/:id", [validateJWT], getOneUser);

router.post(
	"/",
	[
		validateJWT,
		check("name", "name is required").not().isEmpty(),
		check(
			"password",
			"password is required, and must have at least 8 caracters"
		).isLength({ min: 8 }),
		check("email", "email has invalid structure")
			.isEmail()
			.custom(emailAlreadyUsed),
		check("role").custom(roleIsSupported),
		ErrorHandler,
	],
	createUser
);

router.put(
	"/:id",
	[
		validateJWT,
		check("id", "Invalid id").isMongoId(),
		check("id").custom(userExist),
		check("role").custom(roleIsSupported),
		ErrorHandler,
	],
	updateUser
);

router.delete(
	"/:id",
	[
		validateJWT,
		validateAdminRole,
		validateRoles("ADMIN_ROLE"),
		check("id", "Invalid id").isMongoId(),
		check("id").custom(userExist),
		ErrorHandler,
	],
	deleteUser
);

module.exports = router;
