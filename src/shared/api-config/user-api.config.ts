import { schema } from "@/shared/schema";
import {
  IApiConfigSatisfier,
  defaultApiConfig,
} from "@deepchain-labs/z-rest-common";
import z from "zod";

export const userApiConfig = {
  getAll: {
    ...defaultApiConfig,
    method: "GET",
    path: "/users",
    responseSchema: schema.user.getAllUsers.response,
    querySchema: schema.user.getAllUsers.query,
  },
  getById: {
    ...defaultApiConfig,
    method: "GET",
    path: "/users/:id",
    responseSchema: schema.user.getUserById.response,
    paramSchema: schema.user.getUserById.param,
  },
  create: {
    ...defaultApiConfig,
    method: "POST",
    path: "/users",
    responseSchema: schema.user.createUser.response,
    bodySchema: schema.user.createUser.body,
  },
  delete: {
    ...defaultApiConfig,
    method: "DELETE",
    path: "/users/:id",
    paramSchema: schema.user.getUserById.param,
    responseSchema: schema.user.getUserById.response,
  },
  update: {
    ...defaultApiConfig,
    method: "PUT",
    path: "/users/:id",
    paramSchema: schema.user.getUserById.param,
    responseSchema: z.string(),
    bodySchema: schema.user.createUser.body.partial(),
  },
} as const satisfies IApiConfigSatisfier;
