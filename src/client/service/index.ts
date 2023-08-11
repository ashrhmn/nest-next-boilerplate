import { getAxios } from "@ashrhmn/z-rest-client";

const service = getAxios(
  ((process.env.NEXT_PUBLIC_BASE_URL || "") + "/api").replace("//api", "/api"),
);

export default service;
