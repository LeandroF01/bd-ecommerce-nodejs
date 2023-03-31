const { DataTypes } = require("sequelize");

const db = require("../utils/database");
const Categories = require("./categories.models");

const Products = db.define(
	"products",
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(2000), // Especifica la longitud máxima de la columna
			allowNull: false,
			validate: {
				len: [1, 2000], // Añade una validación para asegurarse de que el valor de la descripción tenga entre 1 y 2000 caracteres
			},
		},
		images: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		brand: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		categoriesId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: "categories_id",
			references: {
				key: "id",
				model: Categories,
			},
		},
	},

	{
		timestamps: false,
	}
);

module.exports = Products;
