import express from "express";
const router = express.Router();
import { Account } from "../models/account.schema.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import mongoose from "mongoose";

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    // Find the authenticated user's account by the user id injected by the auth middleware
    const account = await Account.findOne({
      userId: req.userId,
    });

    // If somehow the account is missing, surface a clear error
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Return a numeric balance the frontend can consume directly
    return res.status(200).json({ balance: account.balance });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch balance" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction(); // start the transaction

    const { amount, to } = req.body;
    const transferAmount = Number(amount); // ensure it's a number

    // Fetch sender account
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < transferAmount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Fetch receiver account
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid account" });
    }

    // Deduct from sender
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -transferAmount } },
      { session } // ✅ session must be in options
    );

    // Add to receiver
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: transferAmount } },
      { session } // ✅ session must be in options
    );

    // Commit transaction
    await session.commitTransaction();

    // Option A: compute the new balance locally to avoid an extra DB roundtrip
    // This is safe here because we know we successfully deducted transferAmount above
    const updatedSenderBalance = account.balance - transferAmount;

    // Option B (more authoritative): re-read the balance from DB after commit
    // const refreshed = await Account.findOne({ userId: req.userId });
    // const updatedSenderBalance = refreshed?.balance ?? account.balance - transferAmount;

    // Return the updated sender balance so the client can update UI instantly
    return res.status(200).json({
      message: "Transfer successful",
      balance: updatedSenderBalance,
    });
  } catch (err) {
    await session.abortTransaction(); // rollback if error occurs
    console.error(err);
    return res.status(500).json({ message: "Transfer failed" });
  } finally {
    session.endSession(); // always end session
  }
});

export default router;
