import db from "../models";
const { Op, where } = require("sequelize");

import { v4 as generateId } from "uuid";
import moment from "moment";

import generateCode from "../ultils/generateCode";
import generateDate from "../ultils/generateDate";

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

export const getPostsLimitService = (
  page,
  query,
  { priceNumber, acreageNumber }
) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = page || +page > 1 ? +page - 1 : 0;
      let queries = { ...query };
      if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber };
      if (acreageNumber)
        queries.acreageNumber = { [Op.between]: acreageNumber };

      const response = await db.Post.findAndCountAll({
        where: queries,
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

export const getLatestPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
        ],
        attributes: ["id", "title", "star", "createdAt"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Get latest posts successfully"
          : "Get latest posts failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const createNewPostService = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const attributesId = generateId();
      const imagesId = generateId();
      const overviewId = generateId();
      const labelCode = generateCode(body?.label);
      const provinceCode = body?.province?.includes("Thành phố")
        ? generateCode(body?.province?.replace("Thành phố ", ""))
        : generateCode(body?.province?.replace("Tỉnh ", ""));
      const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
      const currentDate = generateDate();

      await db.Post.create({
        id: generateId(),
        title: body?.title,
        labelCode,
        address: body?.address || null,
        attributesId,
        categoryCode: body?.categoryCode || null,
        acreageCode: body?.acreageCode || null,
        priceCode: body?.priceCode || null,
        description: JSON.stringify(body?.description) || null,
        userId,
        overviewId,
        imagesId,
        provinceCode: provinceCode || null,
        priceNumber: body?.priceNumber || null,
        acreageNumber: body?.acreageNumber || null,
      });

      await db.Attribute.create({
        id: attributesId,
        price:
          +body?.priceNumber < 1
            ? `${+body?.priceNumber * 100000} đồng/tháng`
            : `${body?.priceNumber} triệu/tháng`,
        acreage: `${body?.acreageNumber} m2`,
        published: moment().format("DD/MM/YYYY"),
        hashtag,
      });

      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(body?.images),
      });

      await db.Overview.create({
        id: overviewId,
        code: hashtag,
        acreage: body?.label,
        type: body?.categoryCode || "",
        target: body?.target,
        bonus: "Tin thường",
        created: currentDate.today,
        expire: currentDate.expireDay,
      });

      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố ", "") },
            { value: body?.province?.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: provinceCode,
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });

      await db.Label.findOrCreate({
        where: { code: labelCode },
        defaults: {
          code: labelCode,
          value: body?.label,
        },
      });

      resolve({
        err: 0,
        msg: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostsLimitAdminService = (page, userId, query) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = page || +page > 1 ? +page - 1 : 0;
      let queries = { ...query, userId };

      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        order: [["createdAt", "DESC"]],
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
          {
            model: db.Overview,
            as: "overviews",
          },
        ],
        // attributes: ["id", "title", "star", "address", "description"],
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

export const updatePostAdminService = ({
  postId,
  attributesId,
  overviewId,
  imagesId,
  ...body
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const labelCode = generateCode(body?.label);
      const provinceCode = body?.province?.includes("Thành phố")
        ? generateCode(body?.province?.replace("Thành phố ", ""))
        : generateCode(body?.province?.replace("Tỉnh ", ""));

      await db.Post.update(
        {
          title: body?.title,
          labelCode,
          address: body?.address || null,
          categoryCode: body?.categoryCode || null,
          acreageCode: body?.acreageCode || null,
          priceCode: body?.priceCode || null,
          description: JSON.stringify(body?.description) || null,
          provinceCode: provinceCode || null,
          priceNumber: body?.priceNumber || null,
          acreageNumber: body?.acreageNumber || null,
        },
        { where: { id: postId } }
      );

      await db.Attribute.update(
        {
          price:
            +body?.priceNumber < 1
              ? `${+body?.priceNumber * 100000} đồng/tháng`
              : `${body?.priceNumber} triệu/tháng`,
          acreage: `${body?.acreageNumber} m2`,
        },
        { where: { id: attributesId } }
      );

      await db.Image.update(
        {
          image: JSON.stringify(body?.images),
        },
        { where: { id: imagesId } }
      );

      await db.Overview.update(
        {
          acreage: body?.label,
          type: body?.categoryCode || "",
          target: body?.target,
        },
        { where: { id: overviewId } }
      );

      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố ", "") },
            { value: body?.province?.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: provinceCode,
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });

      await db.Label.findOrCreate({
        where: { code: labelCode },
        defaults: {
          code: labelCode,
          value: body?.label,
        },
      });

      resolve({
        err: 0,
        msg: "Update post successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
