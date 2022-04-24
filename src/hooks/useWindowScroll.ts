import { useEffect, useState } from "react";

export function useWindowScroll() {
  const [scrollY, setScrollY] = useState(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return scrollY;
}
