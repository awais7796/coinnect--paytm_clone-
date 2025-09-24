import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.body.authorization;

  if (!authHeader || !authHeader.startWith("Bearer")) {
    res.status(404).json({
      msg: "err in authHeader",
    });
  }

  const token = authHeader.split("")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(404).json({
      msg: "err in jwt token verification",
    });
  }
};
export default authMiddleware;
