import { useLocation } from "wouter";
import { useEffect } from "react";

export function useScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Smooth scroll to top whenever location changes
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);
}
