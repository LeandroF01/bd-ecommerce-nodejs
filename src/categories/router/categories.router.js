const router = require("express").Router();
const passport = require("passport");
const categoryServices = require("../services/categories.services");

const adminMiddleware = require("../../middlewares/role.middleware");

require("../../middlewares/auth.middleware")(passport);

router
	.route("/")
	.get(categoryServices.getAllCategories)
	.post(
		passport.authenticate("jwt", { session: false }),
		adminMiddleware,
		categoryServices.postCategory
	);

router
	.route("/:id")
	.get(categoryServices.getCategoryById)
	.delete(
		passport.authenticate("jwt", { session: false }),
		adminMiddleware,
		categoryServices.deleteCategory
	);

module.exports = router;
