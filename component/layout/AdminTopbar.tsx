"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Page Title Mapping
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
  // Redux থেকে ইউজার ডাটা নেওয়া হচ্ছে
  const { user }  = useSelector((state: any) => state.auth);
  
  // ডাইনামিক টাইটেল সেট করা (সাব-রাউট হ্যান্ডেল করার জন্য সাধারণ লজিক)
  const currentKey = Object.keys(pageTitles).find(key => pathname.startsWith(key)) || "/admin/dashboard";
  const title = pageTitles[currentKey] || "Dashboard";

  return (
    <header
      className="
        sticky top-0 z-40 bg-white
        border-b border-gray-200
        flex items-center justify-between
        h-[68px]
        pl-8 pr-12
        w-full
      "
    >
      {/* Left: Page title */}
      <h1 className="text-[18px] font-semibold text-gray-800 shrink-0">
        {title}
      </h1>

      {/* Right: Search, Notification, Profile */}
      <div className="flex items-center gap-6 ml-auto">

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-10 h-10 w-[280px] rounded-lg bg-gray-50 border-gray-200 text-sm focus-visible:ring-1 focus-visible:ring-[#A01C1C]"
          />
        </div>

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full hover:bg-gray-100 text-gray-500"
        >
          <Bell className="w-5 h-5" />
          <Badge className="absolute top-2 right-2 h-2 w-2 p-0 bg-[#A01C1C] rounded-full border-2 border-white" />
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-[14px] font-semibold text-gray-900 leading-tight">
              {user?.name ?? "Jane Cooper"}
            </p>
            <p className="text-[12px] text-gray-500">Admin</p>
          </div>
          
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
            <Image
              src={user?.avatar || "/images/userprofile.png"} // আপনার ইমেজ পাথ দিন
              alt="Admin Profile"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

      </div>
    </header>
  );
}