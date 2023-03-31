const { DataTypes } = require("sequelize");

const db = require("../utils/database");
const Products = require("./products.models");
const User = require("./users.models");

const ShoppingCart = db.define("shoppingcart", {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
	},
	productsId: {
		type: DataTypes.UUID,
		allowNull: false,
		field: "products_id",
		references: {
			key: "id",
			model: Products,
		},
	},
	quantity: { type: DataTypes.INTEGER, allowNull: false },
	buyerId: {
		type: DataTypes.UUID,
		allowNull: false,
		field: "buyer_id",
		references: {
			key: "id",
			model: User,
		},
	},
});

module.exports = ShoppingCart;
