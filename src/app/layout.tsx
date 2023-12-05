import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import type { PropsWithChildren } from 'react'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600','700'] })

export const metadata: Metadata = {
  title: 'MyGETS',
}

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
