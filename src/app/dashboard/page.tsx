import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@utils/supabase/server";
import DashboardClient from "./components/DashboardClient";

export default async function DashboardPage() {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/");

    return <DashboardClient />;
}