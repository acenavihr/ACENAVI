import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const outfit = Outfit({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit"
})

export const metadata: Metadata = {
  title: "Navi - AI-Powered People Support",
  description: "Clarity at work. Before friction builds.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={outfit.variable}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}