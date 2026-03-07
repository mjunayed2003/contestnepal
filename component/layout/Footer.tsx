"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Send, Facebook, Instagram, Linkedin,
  Twitter, MapPin, Mail, Phone,
  Trophy, ArrowRight,
} from "lucide-react";

const exploreLinks = [
  { label: "Home",         href: "/"              },
  { label: "Contests",     href: "/contests"      },
  { label: "Dashboard",    href: "/dashboard"     },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ",          href: "/#faq"          },
];

const categoryLinks = [
  { label: "Giveaways",       href: "/contests?type=giveaway"    },
  { label: "Voting Contests", href: "/contests?type=submission"  },
  { label: "Polls",           href: "/contests?type=poll"        },
  { label: "All Contests",    href: "/contests"                  },
];

const socialLinks = [
  { label: "Facebook",  href: "#", icon: Facebook  },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Twitter",   href: "#", icon: Twitter   },
  { label: "LinkedIn",  href: "#", icon: Linkedin  },
];

const contactInfo = [
  { icon: MapPin, text: "Kathmandu, Nepal"           },
  { icon: Mail,   text: "hello@contestnepal.com"     },
  { icon: Phone,  text: "+977 9800000000"            },
];

export default function Footer() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="w-full bg-[#FAF7F4] border-t border-gray-100">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-[50px]">

        {/* ── CTA Banner ── */}
        <div className="py-10 sm:py-12 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#A01C1C] to-[#c0312a] rounded-2xl px-6 sm:px-10 py-7 sm:py-8 shadow-lg shadow-[#A01C1C]/15">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <Trophy className="w-5 h-5 text-white/80" />
                <span className="text-white/80 text-xs font-bold uppercase tracking-wider">
                  Ready to compete?
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                Join thousands of winners today
              </h3>
            </div>
            <Link
              href="/auth/sign-up"
              className="shrink-0 inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-white text-[#A01C1C] text-sm font-black hover:bg-gray-50 transition-colors shadow-sm"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 pt-12 pb-10">

          {/* Col 1 — Brand + Newsletter */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-5">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo.svg"
                alt="Contest Nepal"
                width={52}
                height={52}
                className="w-11 h-11 sm:w-12 sm:h-12"
              />
            </Link>

            <p className="text-[13px] text-gray-400 leading-relaxed max-w-[300px] sm:max-w-[260px]">
              Nepal&apos;s ultimate platform for hosting and participating in
              exciting contests. Join thousands of users today.
            </p>

            {/* Contact */}
            <div className="space-y-2">
              {contactInfo.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-[12px] text-gray-400">
                  <Icon className="w-3.5 h-3.5 text-[#A01C1C]/60 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="space-y-2 pt-1">
              <p className="text-[13px] font-bold text-gray-700">Newsletter</p>
              <form onSubmit={handleSubscribe}>
                {submitted ? (
                  <div className="flex items-center gap-2 h-10 px-4 bg-green-50 border border-green-200 rounded-full text-xs text-green-600 font-semibold">
                    ✓ Subscribed successfully!
                  </div>
                ) : (
                  <div className="flex items-center bg-white border border-gray-200 rounded-full overflow-hidden pl-4 pr-1.5 py-1.5 focus-within:border-[#A01C1C]/40 transition-colors">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="flex-1 text-[12px] text-gray-600 placeholder-gray-400 bg-transparent outline-none min-w-0"
                    />
                    <button
                      type="submit"
                      className="shrink-0 w-7 h-7 rounded-full bg-[#A01C1C] hover:bg-[#861717] flex items-center justify-center transition-colors"
                    >
                      <Send className="w-3 h-3 text-white" />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Col 2 — Explore */}
          <div className="space-y-3 sm:space-y-4 lg:ml-auto">
            <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900">Explore</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {exploreLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[13px] sm:text-[14px] text-gray-500 hover:text-[#A01C1C] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Categories */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900">Categories</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {categoryLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[13px] sm:text-[14px] text-gray-500 hover:text-[#A01C1C] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Follow Us */}
          <div className="col-span-2 sm:col-span-1 space-y-3 sm:space-y-4">
            <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900">Follow Us</h3>
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-[#A01C1C] hover:bg-[#861717] text-white flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-gray-200 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-[12px] sm:text-[13px] text-gray-400">
              2024 © Contest Nepal. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-[12px] text-gray-400 hover:text-[#A01C1C] transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}