"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Renter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Renter.belongsTo(models.Post, {
        foreignKey: "postId",
        targetKey: "id",
        as: "renterPost",
      });

      Renter.hasMany(models.Contract, {
        foreignKey: "id",
        as: "renter",
      });
    }
  }
  Renter.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      work: DataTypes.STRING,
      yearOfBirth: DataTypes.INTEGER,
      cccd: DataTypes.STRING,
      resident: DataTypes.STRING,
      hometown: DataTypes.STRING,
      gmail: DataTypes.STRING,
      postId: DataTypes.STRING,
      userId: DataTypes.STRING,
      isConfirmed: DataTypes.BOOLEAN,
      isRented: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Renter",
    }
  );
  return Renter;
};
