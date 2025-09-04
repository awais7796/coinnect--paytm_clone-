const zod = require("zod");

const accountSchema = zod.object({
  userId: zod.string(),
  balance: zod.number().min(0, "incorrect Balance"),
});

module.exports = { accountSchema };
