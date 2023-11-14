import db from "../models";
import { v4 as generateId } from "uuid";

require("dotenv").config();

// Đăng kí thuê
export const rentalSerivce = (body, userId, postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Renter.findOrCreate({
        where: { phone: body?.phone, postId, userId },
        defaults: {
          id: generateId(),
          name: body?.name,
          phone: body?.phone,
          work: body?.work,
          yearOfBirth: body?.yearOfBirth,
          cccd: body?.cccd,
          resident: body?.resident,
          hometown: body?.homnetown,
          gmail: body?.gmail,
          postId,
          userId,
        },
      });

      resolve({
        //Hàm findOrCreate trả về mảng gồm ptử 0 là các obj của model, ptử 1 là giá trị boolean trả về kết quả có tạo mới hay không
        err: response[1] ? 0 : 2,
        msg: response[1]
          ? "Đăng kí thuê thành công!"
          : "Thông tin này đã tồn tại!",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getRentersService = ({
  postId,
  isConfirmed,
  isRented,
  ...query
}) =>
  new Promise(async (resolve, reject) => {
    if (postId) query.postId = postId;
    if (isConfirmed) query.isConfirmed = isConfirmed;
    if (isRented) query.isRented = isRented;

    try {
      const response = await db.Renter.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Get all renters successfully"
          : "Get all renters failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const acceptRenterService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Renter.update(
        { isConfirmed: "1" },
        {
          where: { id },
        }
      );
      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg:
          response[0] > 0
            ? "Accept renter successfully"
            : "Failed to Accept renter",
      });
    } catch (error) {
      reject(error);
    }
  });
