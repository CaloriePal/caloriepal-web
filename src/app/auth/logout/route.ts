import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);
  const response = NextResponse.redirect(`${origin}/`);

  const cookieStore = await cookies();
  cookieStore
    .getAll()
    .filter(c => c.name.startsWith('sb-'))
    .forEach(c => response.cookies.delete(c.name));

  return response;
}
