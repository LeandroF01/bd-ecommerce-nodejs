"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.changeColumn("purchases", "shoppingcart_id", {
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				model: "shoppingcarts",
				key: "id",
				ondelete: "CASCADE", // Agrega la opción ondelete aquí
			},
			field: "shoppingcart_id",
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.changeColumn("purchases", "shoppingcart_id", {
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				model: "shoppingcarts",
				key: "id",
			},
			field: "shoppingcart_id",
		});
	},
};
