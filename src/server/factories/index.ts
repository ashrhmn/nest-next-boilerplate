import {
  IContext,
  IEndpoint,
  InferInputs,
  InferOutputsBeforeTransform,
  InferOutputsPromiseBeforeTransform,
} from "@/shared/interfaces";
import { BadRequestException } from "@nestjs/common";

export const createController = <P, Q, R, B>(
  {
    paramSchema,
    bodySchema,
    querySchema,
    responseSchema,
  }: IEndpoint<P, Q, R, B>,
  context: IContext,
  fn: (args: { param: P; query: Q; body: B }, context: IContext) => R,
): InferOutputsBeforeTransform<IEndpoint<P, Q, R, B>> => {
  try {
    const { req } = context;
    const param = paramSchema.parse(req.params);
    const body = bodySchema.parse(req.body);
    const query = querySchema.parse(req.query);
    const data = fn({ param, body, query }, context);
    return responseSchema.parse(data);
  } catch (error) {
    throw new BadRequestException(error);
  }
};

export const createAsyncController = async <P, Q, R, B>(
  {
    paramSchema,
    bodySchema,
    querySchema,
    responseSchema,
  }: IEndpoint<P, Q, R, B>,
  context: IContext,
  fn: (args: { param: P; query: Q; body: B }, context: IContext) => Promise<R>,
): InferOutputsPromiseBeforeTransform<IEndpoint<P, Q, R, B>> => {
  try {
    const { req } = context;
    const param = paramSchema.parse(req.params);
    const body = bodySchema.parse(req.body);
    const query = querySchema.parse(req.query);
    const data = await fn({ param, body, query }, context);
    return responseSchema.parse(data);
  } catch (error) {
    throw new BadRequestException(error);
  }
};

export const createService = <IEndpoint>(
  fn: (
    input: InferInputs<IEndpoint>,
    context: IContext,
  ) => InferOutputsBeforeTransform<IEndpoint>,
) => {
  return (input: InferInputs<IEndpoint>, context: IContext) =>
    fn(input, context);
};

export const createAsyncService = <IEndpoint>(
  fn: (
    input: InferInputs<IEndpoint>,
    context: IContext,
  ) => InferOutputsPromiseBeforeTransform<IEndpoint>,
) => {
  return async (input: InferInputs<IEndpoint>, context: IContext) =>
    await fn(input, context);
};
