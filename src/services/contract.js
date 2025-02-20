import db from "../models";
import { v4 as generateId } from "uuid";

require("dotenv").config();

export const createContractService = (userId, body) =>
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
        userId,
        customerId: body?.customer,
        categoryCode: body?.categoryCode,
        startDate: body?.startDate,
        endDate: body?.endDate,
        depositAmount: +body?.depositAmount,
        waterCost: +body?.waterCost || 0,
        electrictCost: +body?.electrictCost || 0,
        contractStatus: "Đang hoạt động",
      });

      resolve({
        err: 0,
        msg: "Tạo hợp đồng thành công!",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getContractService = (
  userId,
  { isConfirmed, isRented, ...query }
) =>
  new Promise(async (resolve, reject) => {
    if (isConfirmed) query.isConfirmed = isConfirmed;
    if (isRented) query.isRented = isRented;

    try {
      const response = await db.Contract.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
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
          {
            model: db.Room,
            as: "room",
          },
        ],
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
