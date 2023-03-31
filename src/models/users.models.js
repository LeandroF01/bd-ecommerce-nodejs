const db = require("../utils/database");

const { DataTypes } = require("sequelize");

const Users = db.define("users", {
	id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
	firstName: { type: DataTypes.STRING, allowNull: false, field: "first_name" },
	lastName: { type: DataTypes.STRING, allowNull: false, field: "last_name" },
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
	password: { type: DataTypes.STRING, allowNull: false },
	role: { type: DataTypes.STRING, allowNull: false, defaultValue: "normal" },
	phone: { type: DataTypes.STRING, allowNull: false },
	status: { type: DataTypes.STRING, allowNull: false, defaultValue: "active" },
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		field: "is_active",
		defaultValue: false,
	},
});

module.exports = Users;
