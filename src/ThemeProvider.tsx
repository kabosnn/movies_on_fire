import { createContext, useState } from "react";

export const ThemeContext = createContext<{
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
}>({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
