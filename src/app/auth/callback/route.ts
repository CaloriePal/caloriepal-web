import { createServerSupabaseClient } from '@/src/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log('Bearer token:', session?.access_token);

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

      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
