import db from "../models";
import { v4 as generateId } from "uuid";

require("dotenv").config();

export const createContractService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      if (body?.room) {
        await db.Room.update(
          { roomStatus: "Đã cho thuê" },
          { where: { id: body?.room } }
        );
      }

      await db.Renter.update(
        { isRented: "1" },
        {
          where: { id: body?.customer },
        }
      );

      await db.Contract.create({
        id: generateId(),
        roomId: body?.room,
        customerId: body?.customer,
        categoryCode: body?.categoryCode,
        startDate: body?.startDate,
        endDate: body?.endDate,
        depositAmount: +body?.depositAmount,
        waterCost: +body?.waterCost,
        electrictCost: +body?.electrictCost,
        contractStatus: "Chưa thanh toán",
      });

      resolve({
        err: 0,
        msg: "Tạo hợp đồng thành công!",
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });

export const getContractService = ({ postId, isConfirmed, ...query }) =>
  new Promise(async (resolve, reject) => {
    if (postId) query.postId = postId;
    if (isConfirmed) query.isConfirmed = isConfirmed;

    try {
      const response = await db.Renter.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get contract successfully" : "Get contract failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
