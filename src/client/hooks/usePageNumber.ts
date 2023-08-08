import { useRouter } from "next/router";
import { useMemo } from "react";

const usePageNumber = (itemsPerPage = 5) => {
  const router = useRouter();
  const page = useMemo(
    () => (typeof router.query.page === "string" ? +router.query.page || 1 : 1),
    [router.query.page],
  );
  const offset = useMemo(() => (page - 1) * itemsPerPage, [page, itemsPerPage]);
  return { page, limit: itemsPerPage, offset };
};

export default usePageNumber;
