"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, User, Settings, LogOut, Menu, X, ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";

const Navbar = () => {
  const pathname  = usePathname();
  const router    = useRouter();
  const dispatch  = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen,   setIsMobileOpen]   = useState(false);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    setIsMobileOpen(false);
  };

  const navLinks = [
    { label: "Home",         href: "/"             },
    { label: "Contests",     href: "/contests"     },
    ...(isAuthenticated ? [{ label: "Dashboard", href: "/dashboard" }] : []),
    { label: "How it works", href: "/#how-it-works"},
    { label: "FAQ",          href: "/#faq"         },
  ];

  return (
    <>
      <div className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
        <nav className="w-full max-w-[1560px] mx-auto h-[70px] sm:h-[80px] px-4 sm:px-6 md:px-10 lg:px-[50px] flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center shrink-0">
            {isAuthenticated ? (
              <div className="relative h-8 w-28 sm:w-32">
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
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            )}
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-600">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-[#A01C1C] font-bold"
                    : "hover:text-[#A01C1C] transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Right Side ── */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Desktop Auth */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center gap-4 ml-4">
                {/* Bell */}
                <button onClick={() => router.push("/notifications")} className="relative w-10 h-10 flex items-center justify-center rounded-full border border-red-100 hover:bg-red-50 transition">
                  <Bell className="w-5 h-5 text-[#A01C1C]" />
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#A01C1C] rounded-full border border-white" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 cursor-pointer hover:ring-2 hover:ring-[#A01C1C] transition focus:outline-none"
                  >
                    <Image
                      src="/images/userprofile.png"
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
                        <Link href="/profile" onClick={() => setIsDropdownOpen(false)}
                          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                          <User className="w-4 h-4 text-gray-500" /> Profile Details
                        </Link>
                        <Link href="/settings" onClick={() => setIsDropdownOpen(false)}
                          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                          <Settings className="w-4 h-4 text-gray-500" /> Settings
                        </Link>
                        <div className="h-[1px] bg-gray-100 my-1" />
                        <button onClick={handleLogout}
                          className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 w-full text-left transition-colors">
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3 ml-4">
                <Link href="/auth/sign-in"
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/sign-up"
                  className="px-5 py-2 rounded-lg bg-[#A01C1C] text-white text-sm font-semibold hover:bg-[#861717] shadow-md transition-colors">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile: Bell (authenticated only) */}
            {isAuthenticated && (
              <button className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-full border border-red-100 hover:bg-red-50 transition">
                <Bell className="w-4 h-4 text-[#A01C1C]" />
                <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-[#A01C1C] rounded-full border border-white" />
              </button>
            )}

            {/* Mobile: Avatar (authenticated) */}
            {isAuthenticated && (
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden w-9 h-9 rounded-full overflow-hidden border border-gray-200 hover:ring-2 hover:ring-[#A01C1C] transition focus:outline-none"
              >
                <Image
                  src="/images/userprofile.png"
                  alt="Profile"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </button>
            )}

            {/* Mobile: Hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition text-gray-700"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile Drawer Overlay ── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <div className={`
        fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-white z-50 lg:hidden
        shadow-2xl flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
      `}>

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-[70px] sm:h-[80px] border-b border-gray-100 shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 shrink-0">
                <Image
                  src="/images/userprofile.png"
                  alt="Profile"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "User Name"}</p>
                <p className="text-[11px] text-gray-400 truncate">{user?.email || "user@email.com"}</p>
              </div>
            </div>
          ) : (
            <Image src="/images/logo.svg" alt="Logo" width={36} height={36} />
          )}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition shrink-0"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center justify-between px-3 py-3 rounded-xl mb-1 text-sm font-medium transition-colors
                ${pathname === link.href
                  ? "bg-[#A01C1C]/8 text-[#A01C1C] font-bold"
                  : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              {link.label}
              <ChevronRight className={`w-4 h-4 ${pathname === link.href ? "text-[#A01C1C]/60" : "text-gray-300"}`} />
            </Link>
          ))}

          {/* Authenticated extra links */}
          {isAuthenticated && (
            <>
              <div className="h-[1px] bg-gray-100 my-3 mx-1" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
                Account
              </p>
              <Link href="/profile" onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <User className="w-4 h-4 text-gray-400" /> Profile Details
              </Link>
              <Link href="/settings" onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4 text-gray-400" /> Settings
              </Link>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="px-3 py-4 border-t border-gray-100 shrink-0">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/auth/sign-in" onClick={() => setIsMobileOpen(false)}
                className="w-full h-11 flex items-center justify-center rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors">
                Sign In
              </Link>
              <Link href="/auth/sign-up" onClick={() => setIsMobileOpen(false)}
                className="w-full h-11 flex items-center justify-center rounded-xl bg-[#A01C1C] text-white text-sm font-semibold hover:bg-[#861717] shadow-md transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;