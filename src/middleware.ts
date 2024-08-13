import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path.includes('public');

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/public/login', request.nextUrl))
  }
    
}

// Run everywhere, except basic paths like next files
export const config = {
 matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
