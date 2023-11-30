import authRouter from "./auth";
import insertRouter from "./insert";
import categoryRouter from "./category";
import postRouter from "./post";
import priceRouter from "./price";
import acreageRouter from "./acreage";
import provinceRouter from "./province";
import userRouter from "./user";
import rentalRouter from "./rental";
import roomRouter from "./room";
import contractouter from "./contract";
import paymentRouter from "./payment";
import overviewRouter from "./overview";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/price", priceRouter);
  app.use("/api/v1/acreage", acreageRouter);
  app.use("/api/v1/province", provinceRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/rental", rentalRouter);
  app.use("/api/v1/room", roomRouter);
  app.use("/api/v1/contract", contractouter);
  app.use("/api/v1/payment", paymentRouter);
  app.use("/api/v1/overview", overviewRouter);

  return app.use("/", (req, res) => {
    console.log("Server started");
  });
};

export default initRoutes;
