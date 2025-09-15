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
          <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 w-full h-16 bg-background-alt border-b-2 border-zinc-800/70 z-[100]">
              <div className="max-w-[1200px] mx-auto h-full flex items-center px-6">
                <h1 className="m-0 text-2xl">Next.js WebSockets</h1>
              </div>
            </header>
            <main className="flex-1 mt-16 mb-16">
              <div className="max-w-[1200px] mx-auto p-6">
                {children}
              </div>
            </main>
            <footer className="fixed bottom-0 left-0 w-full h-16 bg-background-alt border-t-2 border-zinc-800/70 z-[100]">
              <div className="max-w-[1200px] mx-auto h-full flex items-center justify-center px-6">
                <span className="text-base">
                  Fontes no Github
                </span>
              </div>
            </footer>
          </div>
        </body>
      </html>
  );
}
