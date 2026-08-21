import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const latin = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-latin" });

export const metadata: Metadata = {
  title: "Uswah Dashboard",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: next-themes writes the theme class on <html>
    // before hydration, which is the point.
    <html lang="en" suppressHydrationWarning>
      <body className={`${latin.variable} bg-background font-sans text-foreground antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
