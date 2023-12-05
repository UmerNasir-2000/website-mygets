'use client';

import { AuthProvider } from "@propelauth/react";
import { Poppins } from "next/font/google";
import type { PropsWithChildren } from "react";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] })

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <AuthProvider authUrl="https://505027270.propelauthtest.com">{children}</AuthProvider>
      </body>
    </html>
  )
}
