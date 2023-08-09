import { useRouter } from "next/router";
import { useCallback } from "react";

export default function useUpdatePageQuery() {
  const router = useRouter();
  const updateQuery = useCallback((key: string, val: string) => {
    router.push({
      query: { ...router.query, [key]: val },
      pathname: router.pathname,
    });
  }, []);
  return updateQuery;
}
