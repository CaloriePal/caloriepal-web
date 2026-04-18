'use client';

import { GoogleSignInButton } from '@components';
import { useSearchParams } from 'next/navigation';

const LoginContent = () => {
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

export default LoginContent;