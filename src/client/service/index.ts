import { IEndpoint, InferInputs, InferOutputs } from "@/shared/interfaces";
import axios from "axios";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { z } from "zod";

export const getAxios =
  (baseURL: string) =>
  <P extends Record<string, any>, Q, R, B>(
    endpoint: IEndpoint<P, Q, R, B>,
    mocker: MockData<typeof endpoint> | null = null,
  ): ((
    args: InferInputs<typeof endpoint>,
    overrides?: IGetAxiosOverrides,
  ) => Promise<InferOutputs<typeof endpoint>>) => {
    const {
      paramSchema,
      path,
      responseSchema,
      bodySchema,
      querySchema,
      method,
    } = endpoint;

    if (mocker !== null)
      return (
        args: {
          param: z.infer<typeof paramSchema>;
          body: z.infer<typeof bodySchema>;
          query: z.infer<typeof querySchema>;
        },
        _overrides?: IGetAxiosOverrides,
      ) => {
        if (mocker instanceof Function) return Promise.resolve(mocker(args));
        return Promise.resolve(mocker);
      };

    return (
      args: {
        param: z.infer<typeof paramSchema>;
        body: z.infer<typeof bodySchema>;
        query: z.infer<typeof querySchema>;
      },
      overrides?: IGetAxiosOverrides,
    ) => {
      const cookies = !!overrides?.context
        ? overrides.context.req.cookies
        : null;

      let cookieHeader = "";
      if (!!cookies) {
        for (const key in cookies) {
          cookieHeader += `${key}=${cookies[key]}; `;
        }
      }
      const param = paramSchema.parse(args.param || {});
      const body = bodySchema.parse(args.body || {});
      const query = querySchema.parse(args.query || {});
      let url = path;
      if (param)
        Object.keys(param || {}).forEach((key) => {
          url = url.replace(`:${key}`, param[key]);
        });
      if (!!overrides?.url) url = overrides.url;

      const parsedParams: any = query;

      Object.keys(query as any).forEach(
        (key) => (parsedParams[key] = JSON.stringify((query as any)[key])),
      );

      return new Promise<InferOutputs<typeof endpoint>>((resolve, reject) =>
        axios
          .create({
            baseURL: `${
              !!overrides?.context && !!overrides.context.req.headers.host
                ? `http://${overrides.context.req.headers.host}`
                : ""
            }${baseURL}`,
            withCredentials: true,
            headers: {
              ...(!!cookieHeader ? { Cookie: cookieHeader } : {}),
              ...(!!overrides?.headers ? overrides.headers : {}),
            },
          })({
            method,
            data: body,
            params: query,
            url,
          })
          .then((res) => {
            if (overrides?.context && res?.headers?.["set-cookie"])
              overrides.context.res.setHeader(
                "set-cookie",
                res.headers["set-cookie"],
              );
            return res.data;
          })
          .then(responseSchema.parse)
          .then(resolve)
          .catch((reason) => {
            if (overrides?.context && reason?.response?.headers?.["set-cookie"])
              overrides.context.res.setHeader(
                "set-cookie",
                reason.response.headers["set-cookie"],
              );
            reject(reason);
          }),
      );
    };
  };

export type MockData<T> =
  | InferOutputs<T>
  | ((args: InferInputs<T>) => InferOutputs<T>);

export type IGetAxiosOverrides = {
  url?: string;
  headers?: Record<string, any>;
  context?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
};

export const defaultServiceArgs = {
  param: {},
  query: {},
  body: {},
} as const;

const service = getAxios("/api/");

export default service;
