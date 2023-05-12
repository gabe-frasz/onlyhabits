import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import { Toaster } from "@/components/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OnlyHabits | Building better habits for a better you",
  description:
    "Welcome to OnlyHabits - the ultimate habit-building tool for a better you! Discover the secret to building better habits with us and start your transformation now!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-base-300 text-base-content ${inter.className}`}>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          {children}
        </ClerkProvider>

        <Toaster />

        <Script
          async
          src="https://umami-bice.vercel.app/script.js"
          data-website-id="c63cecab-ca3e-49e6-8f9c-caf0621cb987"
        />
      </body>
    </html>
  );
}
