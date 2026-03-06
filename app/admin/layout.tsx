import type { Metadata } from "next";
import { ReduxProvider } from "@/component/ReduxProvider";
import AdminSidebar from "@/component/layout/AdminSidebar";
import AdminTopbar from "@/component/layout/AdminTopbar";

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <AdminTopbar />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}