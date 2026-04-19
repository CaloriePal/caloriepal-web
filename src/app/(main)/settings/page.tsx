import { createServerSupabaseClient } from '@utils/supabase/server';
import Link from 'next/link';

const SettingsPage = async () => {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    const name = user?.user_metadata?.full_name ?? user?.email ?? 'User';
    const email = user?.email ?? '';

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xs text-sand uppercase tracking-widest font-semibold mb-5">Profile</h2>
                <div className="flex items-center gap-5">
                    <img
                        src={"./avatar.png"}
                        className="w-20 h-20 rounded-xl object-cover border-2 border-lime shadow-[0_0_18px_rgba(200,245,122,0.45)]"
                    />
                    <div>
                        <p className="text-cream font-semibold text-lg">{name}</p>
                        <p className="text-sand text-sm">{email}</p>
                        <span className="inline-flex items-center gap-1.5 mt-1.5 text-[11px] text-dim bg-subtle border border-border rounded-full px-2.5 py-0.5">
                            <span className="font-bold text-[10px]">G</span>
                            Connected with Google
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xs text-sand uppercase tracking-widest font-semibold mb-5">Account</h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-border/60">
                        <div>
                            <p className="text-cream text-sm font-medium">Email address</p>
                            <p className="text-sand text-xs mt-0.5">{email}</p>
                        </div>
                        <span className="text-xs text-dim bg-subtle border border-border rounded-full px-2.5 py-1">Managed by Google</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="text-cream text-sm font-medium">Password</p>
                            <p className="text-sand text-xs mt-0.5">Sign-in is handled by Google OAuth</p>
                        </div>
                        <span className="text-xs text-dim bg-subtle border border-border rounded-full px-2.5 py-1">Not applicable</span>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xs text-sand uppercase tracking-widest font-semibold mb-5">Session</h2>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-cream text-sm font-medium">Sign out</p>
                        <p className="text-sand text-xs mt-0.5">You&apos;ll be redirected to the home page</p>
                    </div>
                    <Link
                        href="/auth/logout"
                        className="px-4 py-2 rounded-xl border border-red-500/40 text-red-400 text-sm font-semibold hover:bg-red-500/10 transition-all"
                    >
                        Sign Out
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
