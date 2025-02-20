import db from "../models";
const { Op, where } = require("sequelize");

export const getOverview = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      let response = {};
      const posts = await db.Post.count({
        where: { userId },
      });

      const contracts = await db.Contract.count({
        where: { userId },
      });

      response = { posts, contracts };

      const revenue = await db.Payment.findAll({
        where: { paymentStatus: "Đã thanh toán" },
        raw: true,
        nest: true,
        include: [
          {
            model: db.Contract,
            as: "contract",
            where: { userId },
            include: [
              {
                model: db.Renter,
                as: "renter",
                where: { isConfirmed: 1, isRented: 1 },
                include: [
                  {
                    model: db.Post,
                    as: "renterPost",
                    where: { userId },
                  },
                ],
              },
            ],
          },
        ],
      })
        .then((results) => {
          let amount = 0;
          results.map((row) => (amount += row.amount));
          response = { ...response, amount };
        })
        .catch((error) => {
          console.error("Error fetching amounts:", error);
        });

      const renters = await db.Contract.findAll({
        where: { userId },
        include: [
          {
            model: db.Renter,
            as: "renter",
            where: { isConfirmed: 1, isRented: 1 },
            include: [
              {
                model: db.Post,
                as: "renterPost",
                where: { userId },
              },
            ],
          },
        ],
      });

      resolve({ response });
    } catch (error) {
      reject(error);
    }
  });

export const getOverviewAdmin = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      let response = {};
      const posts = await db.Post.count();

      const contracts = await db.Contract.count();

      const users = await db.User.count();

      const renters = await db.Renter.count();

      response = { posts, contracts, users, renters };

      resolve({ response });
    } catch (error) {
      reject(error);
    }
  });
