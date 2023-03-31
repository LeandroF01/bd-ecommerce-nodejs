const router = require("express").Router();
const passport = require("passport");
const adminMiddleware = require("../../middlewares/role.middleware");

const purchasesServices = require("../services/purchases.services");
require("../../middlewares/auth.middleware")(passport);

router
	.route("/")
	.get(purchasesServices.getAllPurchases)
	.post(
		passport.authenticate("jwt", { session: false }),
		adminMiddleware,
		purchasesServices.postPurchases
	);

router
	.route("/:purchases_id")
	.get(purchasesServices.getPurchasesById)
	.patch(
		passport.authenticate("jwt", { session: false }),
		adminMiddleware,
		purchasesServices.patchPurchases
	)
	.delete(
		passport.authenticate("jwt", { session: false }),
		adminMiddleware,
		purchasesServices.deletePurchases
	);

router.post(
	"/:purchases_id/add_to_user",
	passport.authenticate("jwt", { session: false }),
	purchasesServices.postPurchasesToUser
);

module.exports = router;
