"use client";

import { useCallback, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: { label: "Theme" },
  ar: { label: "المظهر" },
  tr: { label: "Tema" },
} as const;

const DURATION = 420;

/**
 * Light/dark toggle that reveals the new theme with a circular wipe from the button,
 * via the View Transitions API. Adapted from MagicUI's AnimatedThemeToggler, cut down
 * to the one shape we use — the square/star/hexagon variants were dead weight.
 *
 * Two details from that implementation are load-bearing and kept verbatim in spirit:
 * clip-path coordinates are percentages, because Chrome renders absolute px unscaled on
 * fractional display scales; and the collapsed clip is pinned in CSS before the
 * transition starts, or Firefox paints one unclipped frame.
 *
 * next-themes stays the owner of the theme: this only asks it to change.
 */
export function ThemeToggle({ locale }: { locale: Locale }) {
  const { resolvedTheme, setTheme } = useTheme();
  const button = useRef<HTMLButtonElement>(null);
  const anim = useRef<Animation | null>(null);
  const isDark = resolvedTheme === "dark";

  // A transition left running on unmount would keep the pseudo-element pinned.
  useEffect(
    () => () => {
      anim.current?.cancel();
      const root = document.documentElement;
      if (root.dataset.themeWipe !== "active") return;
      delete root.dataset.themeWipe;
      root.style.removeProperty("--theme-wipe-duration");
      root.style.removeProperty("--theme-wipe-from");
    },
    [],
  );

  const toggle = useCallback(() => {
    const next = isDark ? "light" : "dark";
    const root = document.documentElement;
    const el = button.current;

    // No View Transitions, or the reader asked for less motion: just switch.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduced || typeof document.startViewTransition !== "function") {
      setTheme(next);
      return;
    }
    if (root.dataset.themeWipe === "active") return;

    // innerWidth/innerHeight, not visualViewport: percentages resolve against the
    // snapshot reference box, which includes a classic scrollbar.
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { top, left, width, height } = el.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));

    const at = `${(x / vw) * 100}% ${(y / vh) * 100}%`;
    // circle() percentage radii resolve against hypot(w, h) / √2 of the reference box.
    const end = (radius / (Math.hypot(vw, vh) / Math.SQRT2)) * 100;
    const clipPath = [`circle(0% at ${at})`, `circle(${end}% at ${at})`];

    root.dataset.themeWipe = "active";
    root.style.setProperty("--theme-wipe-duration", `${DURATION}ms`);
    root.style.setProperty("--theme-wipe-from", clipPath[0]);

    const cleanup = () => {
      delete root.dataset.themeWipe;
      root.style.removeProperty("--theme-wipe-duration");
      root.style.removeProperty("--theme-wipe-from");
      anim.current?.cancel();
      anim.current = null;
    };

    const vt = document.startViewTransition(() => flushSync(() => setTheme(next)));
    vt.finished.finally(cleanup).catch(() => {});
    vt.ready
      .then(() => {
        anim.current = root.animate(
          { clipPath },
          {
            duration: DURATION,
            easing: "ease-in-out",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  }, [isDark, setTheme]);

  return (
    <button
      type="button"
      ref={button}
      onClick={toggle}
      className="theme-toggle"
      aria-pressed={isDark}
    >
      {/* Both icons ship and the class on <html> picks one, so there is no mount effect
          and no hydration mismatch from reading the theme during render. */}
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
      <span className="sr-only">{copy[locale].label}</span>
    </button>
  );
}
