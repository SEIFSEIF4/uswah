import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const latin = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-latin" });
const ledger = Newsreader({ subsets: ["latin"], variable: "--font-ledger", weight: ["500", "600"] });

export const metadata: Metadata = {
  title: "Uswah Dashboard",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${latin.variable} ${ledger.variable} bg-background font-sans text-foreground antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
