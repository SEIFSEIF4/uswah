"use client";

import { ThemeProvider as NextThemes } from "next-themes";

/**
 * next-themes owns the theme now: it writes `.dark` on <html>, persists the choice, and
 * injects its own blocking script so there is no flash. That replaced the hand-rolled
 * script and the `[data-theme]` selectors, which were a second source of truth.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemes>
  );
}
