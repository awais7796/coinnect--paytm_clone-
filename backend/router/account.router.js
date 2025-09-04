const express = require("express");
const router = express.Router();
const { Account } = require("../models/account.schema");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = Account.findOne({
      //here userID is explecitly added from the jwt.sign and middlewares
      userId: req.userId,
    });

    res.status(200).json({
      msg: `your balance is ${account.balance}`,
    });
  } catch (error) {
    res.status(404).json({
      msg: "error in get balance in account",
    });
  }
});

module.exports = router;
