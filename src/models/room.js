"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Post, {
        foreignKey: "postId",
        targetKey: "id",
        as: "post",
      });
    }
  }
  Room.init(
    {
      roomName: DataTypes.STRING,
      roomType: DataTypes.STRING,
      monthlyRent: DataTypes.FLOAT,
      roomStatus: DataTypes.STRING,
      postId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
