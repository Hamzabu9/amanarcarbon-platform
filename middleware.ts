import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard')
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')

    // Redirect authenticated users away from auth pages
    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Redirect unauthenticated users to sign in
    if (!isAuth && (isDashboardPage || isAdminPage)) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    // Check admin access
    if (isAdminPage && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Allow access to public pages
        if (pathname.startsWith('/api/auth') || 
            pathname.startsWith('/_next') || 
            pathname.startsWith('/static') ||
            pathname === '/' ||
            pathname.startsWith('/about') ||
            pathname.startsWith('/products') ||
            pathname.startsWith('/contact') ||
            pathname.startsWith('/faq') ||
            pathname.startsWith('/calculator') ||
            pathname.startsWith('/insights')) {
          return true
        }

        // Require authentication for protected routes
        if (pathname.startsWith('/dashboard') || 
            pathname.startsWith('/admin') ||
            pathname.startsWith('/api/protected')) {
          return !!token
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/protected/:path*',
    '/auth/:path*'
  ]
}
