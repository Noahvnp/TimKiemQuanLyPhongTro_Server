import db from "../models";
import { v4 as generateId } from "uuid";
const { Op, where } = require("sequelize");

require("dotenv").config();

export const createPaymentService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Payment.findOrCreate({
        where: { contractId: body?.contractId, paymentDate: body?.dateBill },
        defaults: {
          id: generateId(),
          contractId: body?.contractId,
          paymentName: body?.billName,
          paymentForMonth: body?.dateBill,
          amount: +body?.amount,
          paymentDate: null,
          // paymentMethod
          electricIndex_old: +body?.electricIndex_old,
          electricIndex_new: +body?.electricIndex_new,
          waterIndex_old: +body?.waterIndex_old,
          waterIndex_new: +body?.waterIndex_new,
          paymentStatus: "Chưa thanh toán",
          note: body?.notes,
        },
      });

      resolve({
        //Hàm findOrCreate trả về mảng gồm ptử 0 là các obj của model, ptử 1 là giá trị boolean trả về kết quả có tạo mới hay không
        err: response[1] ? 0 : 2,
        msg: response[1]
          ? "Tạo hóa đơn thành công!"
          : "Hóa đơn này đã tồn tại!",
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });

export const getPaymentService = (
  userId,
  { contractId, paymentStatus, ...query }
) =>
  new Promise(async (resolve, reject) => {
    if (contractId) query.contractId = contractId;

    if (paymentStatus) query.paymentStatus = paymentStatus;
    else query.paymentStatus = { [Op.ne]: "Đã thanh toán" };

    try {
      const response = await db.Payment.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
        include: [
          {
            model: db.Contract,
            as: "contract",
            where: { userId },
            include: [
              {
                model: db.Renter,
                as: "renter",
                where: { isConfirmed: 1, isRented: 1 },
                include: [
                  {
                    model: db.Post,
                    as: "renterPost",
                    where: { userId },
                  },
                ],
              },
            ],
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Get all payment successfully"
          : "Get all payment failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getYourPaymentService = (
  userId,
  { contractId, paymentStatus, ...query }
) =>
  new Promise(async (resolve, reject) => {
    if (contractId) query.contractId = contractId;

    if (paymentStatus) query.paymentStatus = paymentStatus;
    else query.paymentStatus = { [Op.ne]: "Đã thanh toán" };

    try {
      const response = await db.Payment.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
        include: [
          {
            model: db.Contract,
            as: "contract",
            required: true,
            where: {
              // Điều kiện lọc, chỉ lấy các Contract có id không phải là null
              id: {
                [Op.ne]: null,
              },
            },
            include: [
              {
                model: db.Renter,
                as: "renter",
                where: { isConfirmed: 1, isRented: 1, userId },
              },
            ],
          },
        ],
      });

      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Get your payment successfully"
          : "Get your payment failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const acceptPaymentservice = ({ paymentId, paymentMethod, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const paymentInstance = await db.Payment.findByPk(paymentId);
      if (paymentMethod) {
        await paymentInstance.update({
          paymentMethod,
          paymentStatus: "Đã thanh toán",
          paymentDate: new Date(),
        });
      } else
        await paymentInstance.update({
          paymentStatus: "Đã thanh toán",
          paymentDate: new Date(),
        });
      resolve({
        err: 0,
        msg: "Xác nhận thanh toán thành công!",
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateYourPaymentService = ({
  paymentId,
  paymentMethod,
  ...query
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const paymentInstance = await db.Payment.findByPk(paymentId);
      await paymentInstance.update({ paymentMethod: paymentMethod });

      resolve({
        err: 0,
        msg: "Tạo hình thức thanh toán thành công!",
      });
    } catch (error) {
      reject(error);
    }
  });
