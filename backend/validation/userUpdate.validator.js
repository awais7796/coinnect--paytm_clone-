const zod = require("zod");

const updateBody = zod.object({
  username: zod.string().optional(),
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

module.exports = updateBody;
