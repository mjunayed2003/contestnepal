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
import { Separator } from "@/components/ui/separator";

const navItems = [
  { label: "Dashboard",         href: "/admin/",         icon: LayoutDashboard },
  { label: "My Contests",       href: "/admin/contests",          icon: Trophy          },
  { label: "Submissions",       href: "/admin/submissions",       icon: FileText        },
  { label: "Participants",      href: "/admin/participants",      icon: Users           },
  { label: "Winner Management", href: "/admin/winner-management", icon: Award           },
  { label: "Setting",           href: "/admin/settings",          icon: Settings        },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  return (
    <aside className="w-[272px] min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0 sticky top-0">

      {/* Logo */}
      <div className="flex items-center justify-center h-[68px] px-6 border-b border-gray-200 shrink-0">
        <Link href="/admin/dashboard">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={120}
            height={36}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex flex-col flex-1 px-4 pt-6 gap-1">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">
          Menu
        </p>

        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 h-10 px-3 rounded-xl text-sm font-medium transition-all duration-150 group",
                isActive
                  ? "bg-[#A01C1C] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon
                size={18}
                strokeWidth={1.8}
                className={cn(
                  "shrink-0 transition-colors duration-150",
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-gray-600"
                )}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-6 shrink-0">
        <Separator className="mb-4" />
        <button
          onClick={() => dispatch(logout())}
          className="
            flex items-center gap-3 h-10 px-3 w-full rounded-xl
            text-sm font-medium text-[#A01C1C]
            hover:bg-red-50 transition-all duration-150
            group
          "
        >
          <LogOut
            size={18}
            strokeWidth={1.8}
            className="shrink-0 transition-transform duration-150 group-hover:-translate-x-0.5"
          />
          Log Out
        </button>
      </div>
    </aside>
  );
}