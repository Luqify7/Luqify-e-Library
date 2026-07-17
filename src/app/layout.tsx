import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import LT7Widget from "@/components/LT7Widget";

export const metadata: Metadata = {
  title: "Luqify e-Library",
  description: "Digital academic library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>

          {children}

          <LT7Widget />

        </ThemeProvider>
      </body>
    </html>
  );
}