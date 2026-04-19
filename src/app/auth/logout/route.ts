import { createServerSupabaseClient } from '@utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
    const { origin } = new URL(request.url);
    return NextResponse.redirect(`${origin}/`);
}
