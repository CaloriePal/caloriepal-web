import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);
  const response = NextResponse.redirect(`${origin}/`);

  return response;
}
