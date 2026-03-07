"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import {
  LayoutDashboard,
  Trophy,
  FileText,
  Users,
  Award,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "My Contests", href: "/admin/contests", icon: Trophy },
  { label: "Submissions", href: "/admin/submissions", icon: FileText },
  { label: "Participants", href: "/admin/participants", icon: Users },
  { label: "Winner Management", href: "/admin/winner-management", icon: Award },
  { label: "Setting", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  return (
    <aside className="w-[272px] h-screen bg-white border-r border-gray-200 flex flex-col shrink-0 sticky top-0 left-0 overflow-y-auto">

      {/* Logo Section */}
      <div className="flex items-center justify-start h-[68px] px-8 border-b border-gray-200">
        <Link href="/admin/dashboard">
          <Image
            src="/images/logo.svg"
            alt="Wuffoos Logo"
            width={120}
            height={36}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col flex-1 px-4 pt-6 gap-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          // Active link logic
          const isActive =
            href === "/admin"
              ? pathname === "/admin"
              : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link key={href} href={href} className="w-full">
              <div
                className={cn(
                  "flex items-center gap-3 h-11 px-4 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-[#A01C1C] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2 : 1.8}
                  className={cn(isActive ? "text-white" : "text-gray-400")}
                />
                {label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="px-4 pb-8 mt-auto">
        <Separator className="mb-4 bg-gray-100" />
        <button
          onClick={() => dispatch(logout())}
          className="w-full flex items-center gap-3 h-11 px-4 text-sm font-medium text-[#A01C1C] hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={20} strokeWidth={1.8} />
          Log Out
        </button>
      </div>
    </aside>
  );
}