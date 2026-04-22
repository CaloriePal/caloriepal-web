import { createServerSupabaseClient } from "@/utils/supabase/server";
import { Sidebar, Topbar } from "@components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll().map(c => c.name);
    console.log('[Layout] cookies on request:', allCookies);

    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    console.log('[Layout] session:', session ? 'found' : 'null');
    if (!session) redirect("/");

    return (
        <div className="flex h-screen bg-background">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;