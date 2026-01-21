import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Let the request pass through first
  const response = NextResponse.next()
  
  // Add cache headers for all HTML pages
  if (request.nextUrl.pathname.match(/^\/(?!api|_next\/|images\/)/)) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    )
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}