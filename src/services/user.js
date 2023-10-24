import db from "../models";

// GET CURRENT USER
export const getOne = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: { exclude: ["password"] },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get one user successfully" : "Failed to get one user",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

// UPDATE USER
export const updateUser = (payload, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(payload, {
        where: { id },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg:
          response[0] > 0
            ? "Update user successfully"
            : "Failed to Update user",
      });
    } catch (error) {
      reject(error);
    }
  });
