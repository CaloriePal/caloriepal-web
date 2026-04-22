import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PATHS = [
  '/dashboard', '/quests', '/nutrition', '/workouts',
  '/settings', '/shop', '/achievements', '/progress', '/leaderboard',
];

export function middleware(request: NextRequest) {
  const isProtected = PROTECTED_PATHS.some(p =>
    request.nextUrl.pathname.startsWith(p)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.getAll().some(
    c => c.name.includes('-auth-token') && !c.name.includes('code-verifier') && c.value
  );

  if (!hasSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
