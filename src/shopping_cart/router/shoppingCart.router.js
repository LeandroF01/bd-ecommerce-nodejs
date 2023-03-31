const router = require("express").Router();
const passport = require("passport");
const adminMiddleware = require("../../middlewares/role.middleware");

const shoppingCartServices = require("../services/shoppingCart.services");
require("../../middlewares/auth.middleware")(passport);

router
	.route("/")
	.get(shoppingCartServices.getAllShoppingCart)
	.post(
		passport.authenticate("jwt", { session: false }),
		adminMiddleware,
		shoppingCartServices.postShoppingCart
	);

router
	.route("/:shopping_id")
	.get(shoppingCartServices.getShoppingCartById)
	.patch(
		passport.authenticate("jwt", { session: false }),
		adminMiddleware,
		shoppingCartServices.patchShoppingCart
	)
	.delete(
		passport.authenticate("jwt", { session: false }),
		adminMiddleware,
		shoppingCartServices.deleteShoppingCart
	);

router.post(
	"/:shopping_id/add_to_user",
	passport.authenticate("jwt", { session: false }),
	shoppingCartServices.postShoppingCartToUser
);

module.exports = router;
