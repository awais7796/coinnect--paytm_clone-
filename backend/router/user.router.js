import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.schema.js";
import { JWT_SECRET } from "../config.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { signupBody, signinBody } from "../validation/user.validator.js";
import { updateBody } from "../validation/userUpdate.validator.js";
import { Account } from "../models/account.schema.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  //desctructuring  needed
  // safeparse return an object which is getting saved in success object and
  // ojects are always trusthy value so if block is not actuallu running it is just bypassing stiff

  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existedUser = await User.findOne({
    username: req.body.username,
  });
  if (existedUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  // create a new user
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = newUser._id;

  //create a new user and assign them some balance
  await Account.create({
    userId,
    balance: Math.floor(1 + Math.random() * 10000),
  });

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
  return res.status(200).json({
    message: `user created ${token}`,
    token,

    // token needs to be send here for local storage to bypasss it and use it in jwt signin/signup
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      msg: "incorrect inputs",
    });
  }

  // const successed  = signinBody.safeParse(req.body);

  // if (!successed.success) {
  //     return res.status(400).json({
  //         msg: "incorrect inputs"
  //     });
  // }

  const existedUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (existedUser) {
    const token = jwt.sign(
      {
        userId: existedUser._id,
      },
      JWT_SECRET
    );

    res.status(200).json({
      msg: `user is found 
        username:${existedUser.username}
        token:${token}`,
    });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(404).json({
      msg: "inpt incorrect",
    });
  }

  const updateUser = await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );

  res.status(200).json({
    msg: `user updated,
    ${updateUser}`,
  });
});

router.get("/bulk", async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });

    // Send real user data
    res.status(200).json({
      user: users.map((user) => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
