import express from "express";
const router = express.Router();
import { Account } from "../models/account.schema.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import mongoose from "mongoose";

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

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  });
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    res.status(400).json({
      msg: "sender doesnt exist",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  });
  if (!toAccount) {
    await session.abortTransaction();
    res.status(400).json({
      msg: "rciever doesnot exist",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    },
    { session }
  );

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    },
    { session }
  );

  await session.commitTransaction();
  res.json({
    msg: "transaction done",
  });
});
export default router;
