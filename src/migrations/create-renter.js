"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Renters", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      work: {
        type: Sequelize.STRING,
      },
      yearOfBirth: {
        type: Sequelize.INTEGER,
      },
      gmail: {
        type: Sequelize.STRING,
      },
      cccd: {
        type: Sequelize.STRING,
      },
      resident: {
        type: Sequelize.STRING,
      },
      hometown: {
        type: Sequelize.STRING,
      },
      postId: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
      },
      isConfirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isRented: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("Renters");
  },
};
