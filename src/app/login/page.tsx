'use client';

import { Suspense } from 'react';
import { GoogleSignInButton } from '@components';
import { useSearchParams } from 'next/navigation';

function LoginContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return (
        <>
            {error && (
                <p className="text-red-400 text-sm">Authentication failed. Please try again.</p>
            )}
            <GoogleSignInButton />
        </>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-3xl font-bold text-white">CaloriePal</h1>
                <Suspense>
                    <LoginContent />
                </Suspense>
            </div>
        </div>
    );
}