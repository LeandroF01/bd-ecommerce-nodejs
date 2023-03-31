const { DataTypes } = require("sequelize");

const db = require("../utils/database");
const ShoppingCart = require("./shoppingCart.models");

const Purchases = db.define("purchases", {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
	},
	shoppingCartId: {
		type: DataTypes.UUID,
		allowNull: false,
		field: "shoppingcart_id",
		references: {
			key: "id",
			model: ShoppingCart,
		},
		onDelete: "CASCADE", // Esto borra automáticamente las filas relacionadas en `purchases` cuando se borra una fila en `shoppingcarts`
	},
});

module.exports = Purchases;
