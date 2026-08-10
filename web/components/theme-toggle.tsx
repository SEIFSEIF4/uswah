"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const copy = {
  en: { label: "Theme", light: "Light", dark: "Dark", system: "System" },
  ar: { label: "المظهر", light: "فاتح", dark: "داكن", system: "حسب النظام" },
} as const;

export function ThemeToggle({ locale }: { locale: "en" | "ar" }) {
  const { setTheme } = useTheme();
  const t = copy[locale];

  return (
    <DropdownMenu>
      {/* Base UI takes a rendered element rather than asChild. */}
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted hover:text-foreground"
          />
        }
      >
        {/* Both icons ship; the class on <html> decides which is visible. That avoids a
            mount effect and the hydration mismatch that comes with reading the theme. */}
        <Moon className="size-4 dark:hidden" />
        <Sun className="hidden size-4 dark:block" />
        <span className="sr-only">{t.label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={locale === "ar" ? "start" : "end"}>
        <DropdownMenuItem onClick={() => setTheme("light")}>{t.light}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>{t.dark}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>{t.system}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
