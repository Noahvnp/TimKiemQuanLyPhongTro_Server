"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      contractId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentDate: {
        type: Sequelize.DATE,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
      },
      paymentForMonth: {
        type: Sequelize.STRING,
      },
      electricIndex_old: {
        type: Sequelize.FLOAT,
      },
      electricIndex_new: {
        type: Sequelize.FLOAT,
      },
      waterIndex_old: {
        type: Sequelize.FLOAT,
      },
      waterIndex_new: {
        type: Sequelize.FLOAT,
      },
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Payments");
  },
};
