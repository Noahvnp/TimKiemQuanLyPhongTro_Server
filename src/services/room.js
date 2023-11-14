import db from "../models";
import { v4 as generateId } from "uuid";

require("dotenv").config();

export const createRoomService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Room.findOrCreate({
        where: { roomName: body?.roomName },
        defaults: {
          id: generateId(),
          roomName: body?.roomName,
          roomType: body?.roomType,
          monthlyRent: +body?.monthlyRent,
          roomStatus: "Trống",
          postId: body?.postId,
        },
      });

      resolve({
        //Hàm findOrCreate trả về mảng gồm ptử 0 là các obj của model, ptử 1 là giá trị boolean trả về kết quả có tạo mới hay không
        err: response[1] ? 0 : 2,
        msg: response[1]
          ? "Tạo phòng mới thành công!"
          : "Phòng này đã tồn tại!",
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });

export const getRoomService = ({ postId, roomStatus, ...query }) =>
  new Promise(async (resolve, reject) => {
    if (postId) query.postId = postId;
    if (roomStatus) query.roomStatus = roomStatus;

    try {
      const response = await db.Room.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get all rooms successfully" : "Get all rooms failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
