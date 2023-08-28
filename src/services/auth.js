import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
require("dotenv").config();

// Hàm băm password
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

// Đăng kí tài khoản
export const registerService = ({ name, phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
          phone,
          name,
          password: hashPassword(password),
          id: v4(),
        },
      });
      //   response[0] === trả về user sau khi tìm
      //   response[1] === điều kiện where của response
      /*   Toán tử sử dụng khi sai thì lấy vế đầu gán cho token,
            ngược lại thì lấy vế sau gán cho token */
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Register success"
          : "Phone number has already been registered",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });

// Đăng nhập tài khoản
export const loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { phone },
        raw: true,
      });
      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: response.id, phone: response.phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login success"
          : response
          ? "Password is wrong!"
          : "Phone number not found!",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
