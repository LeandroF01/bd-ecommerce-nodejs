const shoppingCartControllers = require("../controllers/shoppingCart.controllers");

const getAllShoppingCart = (req, res) => {
	shoppingCartControllers
		.getAllShoppingCart()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(400).json({ message: err.message });
		});
};

const getShoppingCartById = (req, res) => {
	const id = req.params.shopping_cart_id;
	shoppingCartControllers
		.getShoppingCartById(id)
		.then((data) => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(404).json({ message: "Invalid ID", id });
			}
		})
		.catch((err) => {
			res.status(400).json({ message: err.message });
		});
};

const postShoppingCart = (req, res) => {
	const { productsId, quantity, buyerId } = req.body;

	if (productsId && buyerId) {
		shoppingCartControllers
			.createShoppingCart({
				productsId,
				quantity,
				buyerId,
			})
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				res.status(400).json({ message: err.message });
			});
	} else {
		res.status(400).json({
			message: "Missing Data",
			fields: {
				productsId: "number",
				quantity: "number",
				buyerId: "number",
			},
		});
	}
};

const patchShoppingCart = (req, res) => {
	const { productsId, quantity, buyerId } = req.body;
	const id = req.params.shopping_cart_id;
	shoppingCartControllers
		.updateShoppingCart(id, {
			productsId,
			quantity,
			buyerId,
		})
		.then((data) => {
			if (data[0]) {
				res
					.status(200)
					.json({ message: `Product with ID: ${id} edited succesfully` });
			} else {
				res.status(404).json({ message: "Invalid ID", id });
			}
		})
		.catch((err) => {
			res.status(400).json({ message: err.message });
		});
};

const deleteShoppingCart = (req, res) => {
	const id = req.params.shopping_cart_id;

	shoppingCartControllers
		.deleteShoppingCart(id)
		.then((data) => {
			if (data) {
				res.status(204).json();
			} else {
				res.status(404).json({ message: "Invalid ID", id });
			}
		})
		.catch((err) => {
			res.status(400).json({ message: err.message });
		});
};

const postShoppingCartToUser = (req, res) => {
	const userId = req.user.id;
	const { amount } = req.body;
	const productId = req.params.shopping_cart_id;

	if (amount) {
		shoppingCartControllers
			.addShoppingCartToUser({ userId, productId, amount })
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				res.status(400).json({ message: err.message });
			});
	} else {
		res.status(400).json({
			message: "Missing Data",
			fields: {
				amount: "string",
			},
		});
	}
};

module.exports = {
	getAllShoppingCart,
	getShoppingCartById,
	postShoppingCart,
	patchShoppingCart,
	deleteShoppingCart,
	postShoppingCartToUser,
};
