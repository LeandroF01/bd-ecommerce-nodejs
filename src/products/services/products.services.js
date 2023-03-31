const productsControllers = require("../controllers/products.controllers");

const getAllProducts = (req, res) => {
	productsControllers
		.getAllProducts()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(400).json({ message: err.message });
		});
};

const getProductsById = (req, res) => {
	const id = req.params.product_id;
	productsControllers
		.getProductsById(id)
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

const postProducts = (req, res) => {
	const { title, description, images, brand, price, categoriesId } = req.body;

	if (title && categoriesId) {
		productsControllers
			.createProducts({
				title,
				description,
				images,
				brand,
				price,
				categoriesId,
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
				title: "string",
				description: "string",
				images: "string",
				brand: "string",
				price: "number",
				categoriesId: "number",
			},
		});
	}
};

const patchProducts = (req, res) => {
	const { title, description, images, brand, price, categoriesId } = req.body;
	const id = req.params.product_id;
	productsControllers
		.updateProducts(id, {
			title,
			description,
			images,
			brand,
			price,
			categoriesId,
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

const deleteProducts = (req, res) => {
	const id = req.params.product_id;

	productsControllers
		.deleteProducts(id)
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

const postProductsToUser = (req, res) => {
	const userId = req.user.id;
	const { amount } = req.body;
	const productId = req.params.product_id;

	if (amount) {
		productsControllers
			.addProductsToUser({ userId, productId, amount })
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
	getAllProducts,
	getProductsById,
	postProducts,
	patchProducts,
	deleteProducts,
	postProductsToUser,
};
