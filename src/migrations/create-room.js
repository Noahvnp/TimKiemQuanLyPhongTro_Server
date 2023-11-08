"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        allowNull: false,
      },
      postId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rooms");
  },
};
