"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pageTitles: Record<string, string> = {
  "/admin/dashboard":         "Dashboard",
  "/admin/contests":          "My Contests",
  "/admin/submissions":       "Submissions",
  "/admin/participants":      "Participants",
  "/admin/winner-management": "Winner Management",
  "/admin/settings":          "Setting",
};

export default function AdminTopbar() {
  const pathname  = usePathname();
  const { user }  = useSelector((state: any) => state.auth);
  const title     = pageTitles[pathname] ?? "Dashboard";

  return (
    <header
      className="
        sticky top-0 z-50 bg-white
        border-b border-gray-200
        flex items-center justify-between
        h-[68px]
        pl-8 pr-12
        gap-[420px]
      "
      style={{ left: 272 }}
    >
      {/* Page title */}
      <span className="text-[15px] font-semibold text-gray-800 shrink-0">
        {title}
      </span>

      {/* Right: search + bell + user */}
      <div className="flex items-center gap-4 ml-auto">

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-9 h-9 w-[220px] rounded-lg bg-gray-50 border-gray-200 text-sm focus-visible:ring-[#A01C1C]"
          />
        </div>

        {/* Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full hover:bg-gray-100"
        >
          <Bell className="w-5 h-5 text-gray-500" />
          <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center bg-[#A01C1C] text-[9px]">
            3
          </Badge>
        </Button>

        {/* User */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0">
            <Image
              src="/images/userprofile.png"
              alt="Admin"
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-semibold text-gray-800">
              {user?.name ?? "Jane Cooper"}
            </span>
            <span className="text-[11px] text-gray-400">Admin</span>
          </div>
        </div>

      </div>
    </header>
  );
}