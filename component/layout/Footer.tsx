"use client";

import Image from "next/image";
import { Send } from "lucide-react";

const exploreLinks = ["Dashboard", "Category", "How it works", "FAQ"];
const categoryLinks = ["Giveaways", "Voting Contests", "Polls", "All Contests"];

const socialIcons = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAF7F4] border-t border-gray-100">
      <div className="max-w-[1560px] mx-auto sm:px-8 lg:px-[50px] pt-12 pb-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

          {/* Col 1 — Newsletter */}
          <div className="space-y-5">
            {/* Logo */}
            <Image
              src="/images/logo.svg"
              alt="Contest Hub Logo"
              width={56}
              height={56}
              className="w-14 h-14"
            />

            <div className="space-y-2">
              <h3 className="text-[16px] font-bold text-gray-900">Join Our Newsletter</h3>
              <p className="text-[13px] text-gray-400 leading-relaxed max-w-[260px]">
                The ultimate platform for hosting and participating in exciting contests. Join thousands of users today.
              </p>
            </div>

            {/* Email Input */}
            <div className="flex items-center bg-white border border-gray-200 rounded-full overflow-hidden pl-4 pr-1.5 py-1.5">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 text-[13px] text-gray-600 placeholder-gray-400 bg-transparent outline-none min-w-0"
              />
              <button className="shrink-0 w-8 h-8 rounded-full bg-[#A01C1C] hover:bg-[#861717] flex items-center justify-center transition-colors duration-200 cursor-pointer">
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {/* Col 2 — Explore */}
          <div className="space-y-4 lg:ml-auto">
            <h3 className="text-[15px] font-bold text-gray-900">Explore</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[14px] text-gray-500 hover:text-[#A01C1C] transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Categories */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-bold text-gray-900">Categories</h3>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[14px] text-gray-500 hover:text-[#A01C1C] transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Follow Us */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-bold text-gray-900">Follow Us</h3>
            <div className="flex items-center gap-3">
              {socialIcons.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-[#A01C1C] hover:bg-[#861717] text-white flex items-center justify-center transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-[13px] text-gray-400">
            2024 © Contest Hub. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}