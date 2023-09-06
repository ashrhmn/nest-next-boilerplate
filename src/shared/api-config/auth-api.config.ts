import { schema } from "@/shared/schema";
import {
  IApiConfigSatisfier,
  defaultApiConfig,
} from "@deepchain-labs/z-rest-common";

export const authApiConfig = {
  login: {
    ...defaultApiConfig,
    method: "POST",
    path: "/auth/login",
    bodySchema: schema.auth.login.body,
    responseSchema: schema.auth.login.response,
  },
  signUp: {
    ...defaultApiConfig,
    method: "POST",
    path: "/auth/sign-up",
    bodySchema: schema.auth.signUp.body,
    responseSchema: schema.auth.signUp.response,
  },
  refreshToken: {
    ...defaultApiConfig,
    method: "POST",
    path: "/auth/refresh-token",
    bodySchema: schema.auth.refreshToken.body,
    responseSchema: schema.auth.refreshToken.response,
  },
} as const satisfies IApiConfigSatisfier;
