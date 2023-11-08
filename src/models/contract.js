"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contract.init(
    {
      roomId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      depositAmount: DataTypes.FLOAT,
      contractStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Contract",
    }
  );
  return Contract;
};
