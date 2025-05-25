import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const adminKey = request.nextUrl.searchParams.get('admin_key')

  if (!adminKey || adminKey !== process.env.NEXT_PUBLIC_ADMIN_KEY) {
    return NextResponse.redirect(new URL('/no-autorizado', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin-panel-ds/:path*'], // protege todo lo que esté debajo
}
