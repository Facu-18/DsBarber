import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdminAuthenticated = request.cookies.get('ds_admin_auth')?.value === 'true'

  if (!isAdminAuthenticated) {
    return NextResponse.redirect(new URL('/admin-login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin-panel-ds/:path*'], // protege todo lo que esté debajo
}
