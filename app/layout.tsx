import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const outfit = Outfit({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  preload: true,
})

export const metadata: Metadata = {
  title: "ACENAVI - AI-Powered People Intelligence",
  description: "Transform your HR operations with ACENAVI. Intelligent AI assistant that provides instant HR guidance, policy support, and employee experience directly in Slack and Microsoft Teams.",
  
  // Favicon
  icons: {
    icon: '/navi_symbol.png',
    shortcut: '/navi_symbol.png',
    apple: '/navi_symbol.png',
  },
  
  // Open Graph (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: 'ACENAVI - AI-Powered People Intelligence',
    description: 'Transform your HR operations with ACENAVI. Intelligent AI assistant that provides instant HR guidance, policy support, and employee experience directly in Slack and Microsoft Teams.',
    url: 'https://acenavi.in',
    siteName: 'ACENAVI',
    images: [
      {
        url: '/acenavi_banner.png',
        width: 1200,
        height: 630,
        alt: 'ACENAVI - AI-Powered People Intelligence',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'ACENAVI - AI-Powered People Intelligence',
    description: 'Transform your HR operations with ACENAVI. Intelligent AI assistant that provides instant HR guidance, policy support, and employee experience directly in Slack and Microsoft Teams.',
    images: ['/acenavi_banner.png'],
  },
  
  // Additional metadata
  keywords: ['HR support', 'AI assistant', 'employee experience', 'Slack integration', 'Microsoft Teams', 'HR automation', 'acenavi', 'ace', 'navi'],
  authors: [{ name: 'ACENAVI' }],
  creator: 'ACENAVI',
  publisher: 'ACENAVI',
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        {/* Critical CSS - Inline for fastest FCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root{--background:#F9FAFE;--foreground:#070404;--accent:#1F44FF}
            body{background-color:var(--background);color:var(--foreground);margin:0;font-family:var(--font-outfit),system-ui,-apple-system,sans-serif}
            *{box-sizing:border-box}
          `
        }} />

        {/* Google Analytics - Load early */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />

        {/* Calendly CSS - Preload for faster loading */}
        <link 
          rel="preload"
          href="https://assets.calendly.com/assets/external/widget.css" 
          as="style"
        />
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