import z from "zod";

const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

const signUpBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  name: z.string(),
  address: z.string(),
});

const refreshTokenBodySchema = z.object({
  refreshToken: z.string(),
});

const refreshTokenResponseSchema = loginResponseSchema;

export const login = {
  body: loginBodySchema,
  response: loginResponseSchema,
};
export const signUp = {
  body: signUpBodySchema,
  response: z.void(),
};

export const refreshToken = {
  body: refreshTokenBodySchema,
  response: refreshTokenResponseSchema,
};
