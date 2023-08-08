import { IEndpoint } from "@/shared/interfaces";
import { Delete, Get, Post, Put } from "@nestjs/common";

export const InferMethod = <P, Q, R, B>(endpoint: IEndpoint<P, Q, R, B>) => {
  const { method, path } = endpoint;
  switch (method) {
    case "GET":
      return Get(path);
    case "POST":
      return Post(path);
    case "DELETE":
      return Delete(path);
    case "PUT":
      return Put(path);
    default:
      return Get(path);
  }
};
