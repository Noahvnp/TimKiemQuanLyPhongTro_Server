import express from "express";
require("dotenv").config();
import cors from "cors";
import initRoutes from "./src/routes";
import connectDB from "./src/config/connectDB";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
connectDB();
app.use("/", (req, res) => {
  res.send("Welcome to the");
});

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Server listening on port: ${listener.address().port}`);
});
