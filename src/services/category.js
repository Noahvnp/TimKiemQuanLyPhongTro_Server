import db from "../models";

// GET ALL CATEGORY
export const getAllCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Get all categories successfully"
          : "Categories not found",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
