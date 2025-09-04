const express = require("express");
const app = express();
const router = express.Router();
const PORT = 3000;
const cors = require("cors");
// const authMiddleware=require("./middlewares/auth.middleware.js")

//importing router
// const rootRouter = require("./router/index.js");
const userRouter = require("./router/user.router.js");
const accountRouter = require("./router/account.router.js");

app.use(cors());
app.use(express.json());

//routing
// app.use("/api/v1", rootRouter);
app.use("/api/v1/user", userRouter);
app.user("/api/v1/account", accountRouter);

app.listen(PORT, (req, res) => {
  console.log(`server is running on post ${PORT}`);
});
