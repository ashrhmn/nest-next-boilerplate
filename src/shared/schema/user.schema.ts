import { paginationMetaSchema } from "@/shared/schema/common.schema";
import z from "zod";

export const userSchema = z.object({
  // id: z.string().uuid(),
  id: z.string(),
  // name: z.string(),
  email: z.string().email(),
  password: z.string(),
  // address: z.string(),
  // createdAt: z.string(),
  // updatedAt: z.string(),
});

const getAllUsersResponseSchema = z.object({
  data: z.array(userSchema),
  meta: paginationMetaSchema,
});

export const getAllUsers = {
  response: getAllUsersResponseSchema,
};

export const getUserById = {
  response: userSchema,
  param: z.object({ id: z.string() }),
};
