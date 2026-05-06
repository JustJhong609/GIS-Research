import type { Metadata } from "next";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GIS Research Repository",
  description: "QGIS Implementation Manual & Dataset Guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${syne.variable} ${spaceMono.variable} font-display antialiased`}>
        <div className="grid-bg" />
        {children}
      </body>
    </html>
  );
}
