import React, { useEffect, useState } from "react";

export default function Home() {
  const [clock, setClock] = useState<any>(undefined);

  useEffect(() => {
    fetch("/api/alpaca/clock")
      .then((res) => res.json())
      .then(setClock)
      .catch(() => setClock(null));
  }, []);
  return (
    <>
      <h1 className="text-4xl text-center font-bold">Hello World</h1>
      <pre>{JSON.stringify(clock, null, 2)}</pre>
    </>
  );
}
