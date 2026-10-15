"use client";

import type React from "react";
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextThemes,
} from "next-themes";

export type Theme = "light" | "dark";

/**
 * Fonte única de verdade do tema: aplica a classe `dark` no <html> antes da
 * primeira pintura (sem flash), persiste a escolha em localStorage e funciona
 * igual na área privada e no site público.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="light"
    enableSystem={false}
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
);

export const useTheme = () => {
  const { theme, resolvedTheme, setTheme } = useNextThemes();
  const current = (resolvedTheme ?? theme ?? "light") as Theme;

  return {
    theme: current,
    setTheme: (value: Theme) => setTheme(value),
    toggleTheme: () => setTheme(current === "dark" ? "light" : "dark"),
  };
};
