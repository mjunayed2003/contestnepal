"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User, Settings, LogOut } from "lucide-react"; 
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Contests", href: "/contests" },
    ...(isAuthenticated ? [{ label: "Dashboard", href: "/dashboard" }] : []),
    { label: "How it works", href: "/#how-it-works" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <div className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
      <nav className="w-full max-w-[1560px] mx-auto h-[80px] px-6 md:px-10 lg:px-[50px] flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          {isAuthenticated ? (
            <div className="relative h-8 w-32">
                <Image
                src="/images/userLogo.svg" 
                alt="User Logo"
                fill
                className="object-contain"
                priority
                />
            </div>
          ) : (
            <Image
              src="/images/logo.svg"
              alt="Contest Nepal"
              width={60}
              height={60}
              className="w-12 h-12"
            />
          )}
        </Link>

        <div className="flex items-center gap-8">
          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-600">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className={pathname === link.href ? "text-[#A01C1C] font-bold" : "hover:text-[#A01C1C] transition-colors"}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-5 ml-4">
              
              <button className="relative w-10 h-10 flex items-center justify-center rounded-full border border-red-100 hover:bg-red-50 transition">
                <Bell className="w-5 h-5 text-[#A01C1C]" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#A01C1C] rounded-full border border-white"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 cursor-pointer hover:ring-2 hover:ring-[#A01C1C] transition focus:outline-none"
                >
                  <Image
                     src={"/images/userprofile.png"}
                     alt="Profile"
                     width={40}
                     height={40}
                     className="object-cover w-full h-full"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    
                    <div className="px-4 py-3 border-b border-gray-100 mb-1">
                      <p className="text-sm font-semibold text-gray-900">{user?.name || "User Name"}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || "user@email.com"}</p>
                    </div>

                    <div className="flex flex-col">
                      <Link 
                        href="/user/profile" 
                        className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="w-4 h-4 text-gray-500" />
                        Profile Details
                      </Link>

                      <Link 
                        href="/user/settings" 
                        className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4 text-gray-500" />
                        Settings
                      </Link>

                      <div className="h-[1px] bg-gray-100 my-1"></div>

                      <button 
                        onClick={handleLogout}
                        className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 w-full text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          ) : (
            <div className="flex items-center gap-3 ml-4">
              <Link href="/auth/sign-in" className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50">
                Sign In
              </Link>
              <Link href="/auth/sign-up" className="px-5 py-2 rounded-lg bg-[#A01C1C] text-white text-sm font-semibold hover:bg-[#861717] shadow-md">
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </nav>
    </div>
  );
};

export default Navbar;