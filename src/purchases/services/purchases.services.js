const purchasesControllers = require("../controllers/purchases.controllers");

const getAllPurchases = (req, res) => {
	purchasesControllers
		.getAllPurchases()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(400).json({ message: err.message });
		});
};

const getPurchasesById = (req, res) => {
	const id = req.params.purchases_id;
	purchasesControllers
		.getPurchasesById(id)
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

const postPurchases = (req, res) => {
	const { shoppingCartId } = req.body;

	if (shoppingCartId) {
		purchasesControllers
			.createPurchases({
				shoppingCartId,
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
				shoppingCartId: "number",
			},
		});
	}
};

const patchPurchases = (req, res) => {
	const { shoppingCartId } = req.body;
	const id = req.params.purchases_id;
	purchasesControllers
		.updatePurchases(id, {
			shoppingCartId,
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

const deletePurchases = (req, res) => {
	const id = req.params.purchases_id;

	purchasesControllers
		.deletePurchases(id)
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

const postPurchasesToUser = (req, res) => {
	const userId = req.user.id;
	const { amount } = req.body;
	const shoppingCartId = req.params.purchases_id;

	if (amount) {
		purchasesControllers
			.addPurchasesToUser({ userId, shoppingCartId, amount })
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
	getAllPurchases,
	getPurchasesById,
	postPurchases,
	patchPurchases,
	deletePurchases,
	postPurchasesToUser,
};
