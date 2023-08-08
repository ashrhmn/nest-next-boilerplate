import { IApiConfigSatisfier, defaultApiConfig } from "@/shared/interfaces";
import { schema } from "@/shared/schema";

export const userApiConfig = {
  getAll: {
    ...defaultApiConfig,
    method: "GET",
    path: "/users",
    responseSchema: schema.user.getAllUsers.response,
  },
  getById: {
    ...defaultApiConfig,
    method: "GET",
    path: "/users/:id",
    responseSchema: schema.user.getUserById.response,
    paramSchema: schema.user.getUserById.param,
  },
} as const satisfies IApiConfigSatisfier;
