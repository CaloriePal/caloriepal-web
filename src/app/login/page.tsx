'use client';

import { Suspense } from 'react';
import { GoogleSignInButton } from '@components';
import { useSearchParams } from 'next/navigation';

const LoginPage = () => {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface">
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-3xl font-bold text-white">CaloriePal</h1>
                <Suspense>
                    {error && (
                        <p className="text-rose text-sm">Authentication failed. Please try again.</p>
                    )}
                    <GoogleSignInButton />
                </Suspense>
            </div>
        </div>
    );
}

export default LoginPage;