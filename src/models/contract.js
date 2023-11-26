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
      Contract.belongsTo(models.Room, {
        foreignKey: "roomId",
        targetKey: "id",
        as: "room",
      });

      Contract.belongsTo(models.Renter, {
        foreignKey: "customerId",
        targetKey: "id",
        as: "renter",
      });

      Contract.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userCreteContract",
      });

      Contract.hasMany(models.Payment, {
        foreignKey: "contractId",
        as: "contract",
      });
    }
  }
  Contract.init(
    {
      roomId: DataTypes.STRING,
      customerId: DataTypes.STRING,
      userId: DataTypes.STRING,
      categoryCode: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      depositAmount: DataTypes.FLOAT,
      waterCost: DataTypes.FLOAT,
      electrictCost: DataTypes.FLOAT,
      contractStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Contract",
    }
  );
  return Contract;
};
