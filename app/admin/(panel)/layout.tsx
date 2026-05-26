import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/session";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex h-screen overflow-hidden bg-cream-50">
      <AdminNav email={session.email} />
      <div className="flex flex-1 flex-col overflow-auto">
        {children}
      </div>
    </div>
  );
}
