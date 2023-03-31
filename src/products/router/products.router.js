const router = require("express").Router();
const passport = require("passport");

const ProductsServices = require("../services/products.services");
require("../../middlewares/auth.middleware")(passport);

router
	.route("/")
	.get(ProductsServices.getAllProducts)
	.post(
		passport.authenticate("jwt", { session: false }),
		ProductsServices.postProducts
	);

router
	.route("/:product_id")
	.get(ProductsServices.getProductsById)
	.patch(
		passport.authenticate("jwt", { session: false }),

		ProductsServices.patchProducts
	)
	.delete(
		passport.authenticate("jwt", { session: false }),

		ProductsServices.deleteProducts
	);

module.exports = router;
