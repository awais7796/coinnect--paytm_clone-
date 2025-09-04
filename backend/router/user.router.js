const express = require("express");
const router = express.Router();
const { User } = require("../models/user.schema");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middlewares/auth.middleware");
const { signupBody, signinBody } = require("../validation/user.validator");
const { updateBody } = require("../validation/userUpdate.validator");
const { Account } = require("../models/account.schema");

router.post("/signup", async (req, res) => {
  //desctructuring  needed
  // safeparse return an object which i sgetting saved in success object and
  // ojects are always trusthy value so if block is not actuallu running it is just bypassing stiff

  const success = signupBody.safeParse(req.body);
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
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
  return res.status(200).json({
    message: `user created ${token}`,
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
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.status(200).json({
    user: users.map((user) => ({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    })),
  });
});

module.exports = router;
