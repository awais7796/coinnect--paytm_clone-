import express from "express";
import cors from "cors";
import connectDb from "./db.js";

const app = express();
const router = express.Router();
const PORT = 3000;

// const authMiddleware=require("./middlewares/auth.middleware.js")

//importing router
// const rootRouter = require("./router/index.js");
import userRouter from "./router/user.router.js";
import accountRouter from "./router/account.router.js";

app.use(cors());
app.use(express.json());

//routing
// app.use("/api/v1", rootRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(PORT, (req, res) => {
  console.log(`server is running on post ${PORT}`);
});
