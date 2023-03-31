const uuid = require("uuid");
const sequelize = require("sequelize");

const Purchases = require("../../models/purchases.models");
const ShoppingCart = require("../../models/shoppingCart.models");
const Products = require("../../models/products.models");

const getAllPurchases = async () => {
	const data = await Purchases.findAll({
		attributes: {
			exclude: ["buyProductsId"],
		},
		include: [
			{
				model: ShoppingCart,
				attributes: ["quantity"],
				include: {
					model: Products,
					attributes: null,
				},
			},
		],
	});
	return data;
};

const getPurchasesById = async (id) => {
	const data = await Purchases.findOne({
		where: {
			id,
		},
		attributes: {
			exclude: ["buyProductsId"],
		},
		include: [
			{
				model: ShoppingCart,
				attributes: ["title", "images", "brand", "price", "userId"],
			},
		],
	});
	return data;
};

const createPurchases = async (data) => {
	// Encuentra el carrito de compras y sus detalles
	// Encuentra el carrito de compras y sus detalles
	const shoppingCart = await ShoppingCart.findOne({
		where: { id: data.shoppingCartId },
		include: { all: true },
	});

	// Crea una entrada en la tabla de compras con los datos del carrito de compras
	const purchase = await Purchases.create({
		id: uuid.v4(),
		shoppingCartId: data.shoppingCartId,
		// totalPrice: shoppingCart.totalPrice,
	});

	// Elimina el carrito de compras
	await shoppingCart.destroy();
	// Confirma la transacción

	console.log("La compra se ha completado con éxito");
	return purchase;

	// const response = await Purchases.create({
	// 	id: uuid.v4(),
	// 	shoppingCartId: data.shoppingCartId,
	// });
	// return response;
};

const updatePurchases = async (id, data) => {
	const response = await Purchases.update(data, {
		where: {
			id,
		},
	});
	return response;
};

const deletePurchases = async (id) => {
	const data = await Purchases.destroy({
		where: {
			id,
		},
	});
	return data;
};

module.exports = {
	getAllPurchases,
	getPurchasesById,
	createPurchases,
	updatePurchases,
	deletePurchases,
};
