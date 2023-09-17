import db from "../models";
import bcrypt from "bcryptjs";
import { where } from "sequelize";
import { stringify, v4 } from "uuid";

import chothuecanho from "../../data/chothuecanho.json";
import chothuematbang from "../../data/chothuematbang.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import nhachothue from "../../data/nhachothue.json";

import generateCode from "../ultils/generateCode";
import { dataPrices, dataAcreages } from "../ultils/data";
import {
  extractPriceFromString,
  extractNumberFromString,
} from "../ultils/common";

require("dotenv").config();

const dataBody = [
  {
    body: chothuephongtro.body,
    code: "CTPT",
  },
  {
    body: chothuematbang.body,
    code: "CTMB",
  },
  {
    body: chothuecanho.body,
    code: "CTCH",
  },
  {
    body: nhachothue.body,
    code: "NCT",
  },
];

// Hàm băm password
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

// Chen data vao db
export const insertService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const labelCodes = [];
      const provinceCodes = [];

      dataBody.forEach((data) => {
        data.body.forEach(async (item) => {
          let postId = v4();
          let labelCode = generateCode(item?.header?.class?.classType).trim();
          labelCodes?.every((item) => item?.code !== labelCode) &&
            labelCodes.push({
              code: labelCode,
              value: item?.header?.class?.classType?.trim(),
            });
          let provinceCode = generateCode(
            item?.header?.address?.split(",")?.slice(-1)[0]
          ).trim();
          provinceCodes?.every((item) => item?.code !== provinceCode) &&
            provinceCodes.push({
              code: provinceCode,
              value: item?.header?.address?.split(",")?.slice(-1)[0].trim(),
            });
          let attributesId = v4();
          let userId = v4();
          let imagesId = v4();
          let overviewId = v4();
          let currentAcreage = extractNumberFromString(
            item?.header?.attributes?.acreage
          );
          let currenPrice = extractPriceFromString(
            item?.header?.attributes?.price
          );

          await db.Post.create({
            id: postId,
            title: item?.header?.title,
            star: item?.header?.star,
            labelCode,
            address: item?.header?.address,
            attributesId,
            categoryCode: data.code,
            acreageCode: dataAcreages.find(
              (acreage) =>
                acreage.max > currentAcreage && currentAcreage >= acreage.min
            )?.code,
            priceCode: dataPrices.find(
              (price) => price.max > currenPrice && currenPrice >= price.min
            )?.code,
            description: JSON.stringify(item?.mainContent?.description),
            userId,
            overviewId,
            imagesId,
            provinceCode,
          });

          await db.Attribute.create({
            id: attributesId,
            price: item?.header?.attributes?.price,
            acreage: item?.header?.attributes?.acreage,
            published: item?.header?.attributes?.published,
            hashtag: item?.header?.attributes?.hashtag,
          });

          await db.Image.create({
            id: imagesId,
            image: JSON.stringify(item?.images),
          });

          await db.Overview.create({
            id: overviewId,
            code: item?.overview?.content.find((i) => i.name === "Mã tin:")
              ?.content,
            area: item?.overview?.content.find((i) => i.name === "Khu vực")
              ?.content,
            type: item?.overview?.content.find(
              (i) => i.name === "Loại tin rao:"
            )?.content,
            target: item?.overview?.content.find(
              (i) => i.name === "Đối tượng thuê:"
            )?.content,
            bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")
              ?.content,
            created: item?.overview?.content.find(
              (i) => i.name === "Ngày đăng:"
            )?.content,
            expire: item?.overview?.content.find(
              (i) => i.name === "Ngày hết hạn:"
            )?.content,
          });

          await db.User.create({
            id: userId,
            name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
              ?.content,
            password: hashPassword("123456"),
            phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")
              ?.content,
            zalo: item?.contact?.content.find((i) => i.name === "Zalo")
              ?.content,
          });
        });
      });

      labelCodes?.forEach(async (item) => {
        await db.Label.create(item);
      });
      provinceCodes?.forEach(async (item) => {
        await db.Province.create(item);
      });

      resolve("Done insert");
    } catch (error) {
      reject(error);
    }
  });

export const insertPricesAndAcreages = () =>
  new Promise((resolve, reject) => {
    try {
      dataPrices.forEach(async (price, index) => {
        await db.Price.create({
          order: index,
          code: price.code,
          value: price.value,
        });
      });

      dataAcreages.forEach(async (acreage, index) => {
        await db.Acreage.create({
          order: index,
          code: acreage.code,
          value: acreage.value,
        });
      });
      resolve("Done insert");
    } catch (error) {}
  });
