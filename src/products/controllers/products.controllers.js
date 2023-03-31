const uuid = require("uuid");

const Products = require("../../models/products.models");
const Categories = require("../../models/categories.models");

const getAllProducts = async () => {
	const data = await Products.findAll({
		attributes: {
			exclude: ["categoryId"],
		},
		include: {
			model: Categories,
		},
	});
	return data;
};

const getProductsById = async (id) => {
	const data = await Products.findOne({
		where: {
			id,
		},
		attributes: {
			exclude: ["categoryId"],
		},
		include: [
			{
				model: Categories,
			},
		],
	});
	return data;
};

const createProducts = async (data) => {
	const response = await Products.create({
		id: uuid.v4(),
		title: data.title,
		description: data.description,
		images: data.images,
		brand: data.brand,
		price: data.price,
		categoriesId: data.categoriesId,
	});
	return response;
};

const updateProducts = async (id, data) => {
	const response = await Products.update(data, {
		where: {
			id,
		},
	});
	return response;
};

const deleteProducts = async (id) => {
	const data = await Products.destroy({
		where: {
			id,
		},
	});
	return data;
};

module.exports = {
	getAllProducts,
	getProductsById,
	createProducts,
	updateProducts,
	deleteProducts,
};
