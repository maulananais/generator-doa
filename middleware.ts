import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is trying to access dashboard without API key
  if (request.nextUrl.pathname === '/dashboard') {
    // In middleware, we can't access localStorage, so we'll let the client-side handle this
    // This is just for demonstration - the real protection happens in ApiKeyGuard component
    return NextResponse.next();
  }

  // Redirect root to login page
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard']
};
