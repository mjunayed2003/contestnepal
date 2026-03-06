"use client";

import { ReduxProvider } from "@/component/ReduxProvider";
import AdminSidebar from "@/component/layout/AdminSidebar";
import AdminTopbar from "@/component/layout/AdminTopbar";
import AuthGuard from "@/component/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <AuthGuard>
        <div className="flex min-h-screen bg-[#F8F9FB]">
          
          {/* Sidebar Fixed Width */}
          <AdminSidebar />

          {/* Main Content Area */}
          <div className="flex flex-col flex-1 min-w-0">
            
            {/* Topbar */}
            <AdminTopbar />
            
            {/* Scrollable Page Content */}
            <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-68px)]">
              {children}
            </main>
          </div>

        </div>
      </AuthGuard>
    </ReduxProvider>
  );
}