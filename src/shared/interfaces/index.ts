import { Request } from "express";
import { z, ZodType } from "zod";

export type IEndpoint<P, Q, R, B> = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  paramSchema: z.ZodSchema<P>;
  responseSchema: z.ZodSchema<R>;
  bodySchema: z.ZodSchema<B>;
  querySchema: z.ZodSchema<Q>;
};

type PickSchemaType<IEndpoint, key> = key extends keyof IEndpoint
  ? IEndpoint[key] extends ZodType<any, any, any>
    ? z.infer<IEndpoint[key]>
    : never
  : never;

type PickSchemaTypeBeforeTransform<IEndpoint, key> = key extends keyof IEndpoint
  ? IEndpoint[key] extends ZodType<any, any, any>
    ? z.input<IEndpoint[key]>
    : never
  : never;

export type InferInputs<IEndpoint> = {
  param: PickSchemaType<IEndpoint, "paramSchema">;
  query: PickSchemaType<IEndpoint, "querySchema">;
  body: PickSchemaType<IEndpoint, "bodySchema">;
};

export type InferOutputs<IEndpoint> = PickSchemaType<
  IEndpoint,
  "responseSchema"
>;

export type InferOutputsPromise<IEndpoint> = Promise<InferOutputs<IEndpoint>>;

export type InferOutputsBeforeTransform<IEndpoint> =
  PickSchemaTypeBeforeTransform<IEndpoint, "responseSchema">;

export type InferOutputsPromiseBeforeTransform<IEndpoint> = Promise<
  InferOutputsBeforeTransform<IEndpoint>
>;

export type IAuthUser = {
  id: string;
  email: string;
  role: string[];
};

export type IContextRequest = Request & {
  user?: IAuthUser;
};

export type IContext = {
  req: IContextRequest;
  res: Response;
  user?: IAuthUser;
};

export type IApiConfigSatisfier = Record<string, IEndpoint<any, any, any, any>>;

export const defaultApiConfig = {
  paramSchema: z.object({}),
  bodySchema: z.object({}),
  responseSchema: z.unknown(),
  querySchema: z.object({}),
  method: "GET",
} as const;
