import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js WebSockets",
  description: "WebSocket chat application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${nunito.variable} antialiased m-0`}
        >
          <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
            {children}
          </div>
        </body>
      </html>
  );
}
