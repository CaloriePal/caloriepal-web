import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const redirectTo = NextResponse.redirect(`${origin}/dashboard`);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              redirectTo.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data: { session } } = await supabase.auth.getSession();

      if (session && process.env.NEXT_PUBLIC_API_URL) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sync-profile`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
              email: session.user.email,
              displayName: session.user.user_metadata.full_name ?? session.user.email,
              avatarUrl: session.user.user_metadata.avatar_url ?? null,
            }),
          });
        } catch {
          // Non-fatal: proceed to dashboard even if profile sync fails
        }
      }

      return redirectTo;
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
