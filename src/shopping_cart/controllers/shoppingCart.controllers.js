const uuid = require("uuid");

const ShoppingCart = require("../../models/shoppingCart.models");
const Users = require("../../models/users.models");
const Products = require("../../models/products.models");

const getAllShoppingCart = async () => {
	const data = await ShoppingCart.findAll({
		attributes: {
			exclude: ["productsId", "buyerId"],
		},
		include: [
			{
				model: Products,
				attributes: ["title", "images", "brand", "price"],
			},
			{
				model: Users,
				attributes: ["id", "firstName", "lastName"],
			},
		],
	});
	return data;
};

const getShoppingCartById = async (id) => {
	const data = await ShoppingCart.findOne({
		where: {
			id,
		},
		attributes: {
			exclude: ["productsId", "buyerId"],
		},
		include: [
			{
				model: Products,
				attributes: ["title", "images", "brand", "price"],
			},
			{
				model: Users,
				attributes: ["id", "firstName", "lastName"],
			},
		],
	});
	return data;
};

const createShoppingCart = async (data) => {
	const response = await ShoppingCart.create({
		id: uuid.v4(),
		productsId: data.productsId,
		quantity: data.quantity,
		buyerId: data.buyerId,
	});
	return response;
};

const updateShoppingCart = async (id, data) => {
	const response = await ShoppingCart.update(data, {
		where: {
			id,
		},
	});
	return response;
};

const deleteShoppingCart = async (id) => {
	const data = await ShoppingCart.destroy({
		where: {
			id,
		},
	});
	return data;
};

module.exports = {
	getAllShoppingCart,
	getShoppingCartById,
	createShoppingCart,
	updateShoppingCart,
	deleteShoppingCart,
};
