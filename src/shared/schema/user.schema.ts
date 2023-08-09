import {
  paginationMetaSchema,
  paginationQuerySchema,
} from "@/shared/schema/common.schema";
import z from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable().optional(),
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
  query: paginationQuerySchema,
};

export const getUserById = {
  response: userSchema,
  param: z.object({ id: z.string() }),
};

export const createUser = {
  response: userSchema,
  body: z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6, "Must have at least 6 chars"),
  }),
};
