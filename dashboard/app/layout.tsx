import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const latin = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-latin" });

export const metadata: Metadata = {
  title: "Uswah Dashboard",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${latin.variable} bg-background font-sans text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
