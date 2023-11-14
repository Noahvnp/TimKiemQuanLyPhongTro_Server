"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      roomName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      roomType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      monthlyRent: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      roomStatus: {
        type: Sequelize.STRING,
      },
      postId: {
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
    await queryInterface.dropTable("Rooms");
  },
};
