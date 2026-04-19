'use client';

import { Icon } from '@iconify/react';
import { createClient } from '@utils/supabase/client';

const supabase = createClient();

const GoogleSignInButton = () => {
    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-card border border-border text-cream font-medium hover:bg-subtle transition-all"
        >
            <Icon icon="flat-color-icons:google" width={20} height={20} />
            Continue with Google
        </button>
    );
}

export default GoogleSignInButton;