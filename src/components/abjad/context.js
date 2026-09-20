import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

export const AbxContext = createContext(null);
export const useAbx = () => useContext(AbxContext);

// useLayoutEffect warns during SSR; fall back to useEffect there.
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// false on the server and on the first client render (so hydration matches), then follows the OS setting.
export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
};
