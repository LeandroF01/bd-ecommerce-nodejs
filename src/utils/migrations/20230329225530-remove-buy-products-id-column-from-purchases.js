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
		await queryInterface.removeColumn("purchases", "buy_products_id");
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.addColumn("purchases", "buy_products_id", {
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				model: "shoppingcarts",
				key: "id",
			},
		});
	},
};
