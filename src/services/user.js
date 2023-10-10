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
