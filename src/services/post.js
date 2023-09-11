import db from "../models";

export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "phone", "zalo", "avatar"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get all posts successfully" : "Get all posts failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostsLimitService = (page, query) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = page || +page > 1 ? +page - 1 : 0;
      const response = await db.Post.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "phone", "zalo", "avatar"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Get posts limit successfully"
          : "Get posts limit failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
