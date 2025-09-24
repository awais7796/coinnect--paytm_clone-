import zod from "zod";

export const signupBody = zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

export const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});
