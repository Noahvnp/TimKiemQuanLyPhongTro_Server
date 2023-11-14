"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Contract, {
        foreignKey: "contractId",
        targetKey: "id",
        as: "contract",
      });
    }
  }
  Payment.init(
    {
      contractId: DataTypes.STRING,
      paymentDate: DataTypes.DATE,
      amount: DataTypes.FLOAT,
      paymentMethod: DataTypes.STRING,
      note: DataTypes.STRING,
      paymentStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
