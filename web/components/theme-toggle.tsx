"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const label = {
  en: { light: "Light", dark: "Dark" },
  ar: { light: "فاتح", dark: "داكن" },
} as const;

export function ThemeToggle({ locale }: { locale: "en" | "ar" }) {
  // Starts undefined so the first paint matches whatever the inline script in the
  // layout already applied, instead of flashing the wrong icon.
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) ?? current());
  }, []);

  function toggle() {
    const next: Theme = (theme ?? current()) === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      // Named for what it switches to, so a screen reader announces the action.
      aria-label={label[locale][next]}
      title={label[locale][next]}
      className="text-muted transition-colors hover:text-foreground"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="12"
                y1="1.6"
                x2="12"
                y2="4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                transform={`rotate(${deg} 12 12)`}
              />
            ))}
          </>
        ) : (
          <path
            d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

const current = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
