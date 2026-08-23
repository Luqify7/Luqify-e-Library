import type { Metadata, Viewport } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import LT7Widget from "@/components/LT7Widget";
import "./globals.css";

export const metadata: Metadata = {
title: "Luqify e-Library",
description: "Digital academic library",
applicationName: "Luqify e-Library",
manifest: "/manifest.webmanifest",
icons: {
icon: "/images/lt7-icon.png",
apple: "/images/lt7-icon.png",
},
};

export const viewport: Viewport = {
width: "device-width",
initialScale: 1,
viewportFit: "cover",
themeColor: "#3B2412",
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return ( <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth"> <body> <ThemeProvider>
{children} <LT7Widget /> </ThemeProvider> </body> </html>
);
}
