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
		await queryInterface.removeColumn("purchases", "buyer_id");
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.addColumn("purchases", "buyer_id", {
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				key: "id",
				model: "users",
			},
		});
	},
};
