import { RefObject, useEffect } from "react";

type IUseOutsideClick<T extends HTMLElement> = {
  ref: RefObject<T>;
  callback: () => void;
};

const useOutsideClick = <T extends HTMLElement>(
  data: IUseOutsideClick<T>[],
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) =>
      data.forEach(
        ({ callback, ref }) =>
          ref.current &&
          !ref.current.contains(event.target as Node) &&
          callback(),
      );
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [data]);
  return {};
};

export default useOutsideClick;
