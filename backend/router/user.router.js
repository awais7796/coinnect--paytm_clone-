const express = require("express");
const router = express.Router();
const { signupBody, signinBody } = require("../validation/user.validator");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

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
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { signupBody, signinBody } = require("../validation/user.validator");
// const { User } = require("../db");
// const jwt = require("jsonwebtoken");

// router.post("/signup", async (req, res) => {
//     const parsed = signupBody.safeParse(req.body);

//     if (!parsed.success) {
//         return res.status(411).json({
//             message: "Incorrect inputs"
//         });
//     }

//     const existedUser = await User.findOne({
//         username: req.body.username
//     });

//     if (existedUser) {
//         return res.status(411).json({
//             message: "Email already taken / Incorrect inputs"
//         });
//     }

//     const newUser = await User.create({
//         username: req.body.username,
//         password: req.body.password,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName
//     });

//     const token = jwt.sign({ userId: newUser._id }, "SECRET123");
//     return res.status(200).json({
//         message: `user created`,
//         token
//     });
// });

// module.exports = router;
