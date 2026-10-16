import { useEffect, type ReactNode } from "react";

// The site always follows the device's light/dark setting,
// and switches live if the user changes it while the page is open.
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const root = document.documentElement;
      root.classList.toggle("dark", media.matches);
      root.classList.toggle("light", !media.matches);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return <>{children}</>;
}