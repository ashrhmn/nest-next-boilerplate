import { useEffect, useState } from "react";

const useDateNow = () => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timerId = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return now;
};

export default useDateNow;
