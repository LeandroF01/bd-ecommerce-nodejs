const Users = require("./users.models");
const Products = require("./products.models");
const Categories = require("./categories.models");
const ShoppingCart = require("./shoppingCart.models");
const Purchases = require("./purchases.models");

const initModels = () => {
	//? hasMany || hasOne llave foranea dentro de parentesis
	//? belongsTo || belongsToMany llave foranea en primer paramentro

	Users.hasMany(ShoppingCart, { foreignKey: "userId" });
	Users.hasMany(Purchases, { foreignKey: "userId" });

	Products.belongsTo(Categories, { foreignKey: "categoriesId" });

	Categories.hasMany(Products, { foreignKey: "categoriesId" });

	ShoppingCart.belongsTo(Products, { foreignKey: "productsId" });
	ShoppingCart.belongsTo(Users, { foreignKey: "userId" });

	Purchases.belongsTo(ShoppingCart, { foreignKey: "shoppingCartId" });
};

module.exports = initModels;
