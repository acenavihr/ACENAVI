import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const outfit = Outfit({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit"
})

export const metadata: Metadata = {
  title: "ACENAVI - AI-Powered People Support",
  description: "Clarity at work. Before friction builds.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        {/* Calendly CSS */}
        <link 
          href="https://assets.calendly.com/assets/external/widget.css" 
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        
        {/* Calendly JS - Load after body */}
        <Script 
          src="https://assets.calendly.com/assets/external/widget.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}