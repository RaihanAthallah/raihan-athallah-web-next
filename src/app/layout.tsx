import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raihan Athallah",
  description: "Raihan Athallah's Profile Website",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
