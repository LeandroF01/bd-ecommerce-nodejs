const { DataTypes } = require("sequelize");

const db = require("../utils/database");

const Categories = db.define(
	"categories",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		//? Evita que sequelize cree la columna de createdAt y updatedAt
		timestamps: false,
	}
);

module.exports = Categories;
