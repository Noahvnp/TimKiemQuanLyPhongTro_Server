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
      paymentName: DataTypes.STRING,
      paymentDate: DataTypes.DATE,
      amount: DataTypes.FLOAT,
      paymentMethod: DataTypes.STRING,
      note: DataTypes.STRING,
      paymentForMonth: DataTypes.STRING,
      electricIndex_old: DataTypes.FLOAT,
      electricIndex_new: DataTypes.FLOAT,
      waterIndex_old: DataTypes.FLOAT,
      waterIndex_new: DataTypes.FLOAT,
      paymentStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );

  Payment.beforeUpdate((payment, options) => {
    try {
      if (payment.changed("paymentMethod")) {
        // Nếu paymentMethod thay đổi
        const newPaymentMethod = payment.getDataValue("paymentMethod").trim();
        // Kiểm tra loại thanh toán và cập nhật paymentStatus
        if (newPaymentMethod === "Thanh toán trực tiếp") {
          payment.paymentStatus = "Chờ xác nhận";
        }
        // else if (newPaymentMethod === "Thanh toán online") {
        //   payment.paymentStatus = "Chờ bên thứ 3 xác nhận";
        // }
      }
    } catch (error) {
      console.error("Lỗi khi gán giá trị cho paymentStatus:", error);
    }
  });

  return Payment;
};
