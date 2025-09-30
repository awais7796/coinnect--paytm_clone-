import express from "express";
import cors from "cors";
import connectDb from "./db.js";
import bodyParser from "body-parser";
const app = express();
const router = express.Router();
const PORT = 3000;

// const authMiddleware=require("./middlewares/auth.middleware.js")

//importing router
import rootRouter from "./router/index.js";

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routing
// app.use("/api/v1", rootRouter);
app.use("/api/v1/", rootRouter);

app.listen(PORT, (req, res) => {
  console.log(`server is running on post ${PORT}`);
});
