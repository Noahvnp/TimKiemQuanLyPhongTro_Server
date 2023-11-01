import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as generateId } from "uuid";

require("dotenv").config();

// Đăng kí thuê
export const rentalSerivce = (body, userId, postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Renter.create({
        id: generateId(),
        name: body?.name,
        phone: body?.phone,
        cccd: body?.cccd,
        resident: body?.resident,
        homnetown: body?.homnetown,
        gmail: body?.gmail,
        postId,
        userId,
      });

      resolve({
        err: 0,
        msg: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getRentersService = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Renter.findAll({
        where: { postId },
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
