// app/user/profile/page.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  Camera, MapPin, Mail, Phone,
  Calendar, Edit2, User, Building2,
  Globe, FileText, Check,
} from "lucide-react";

export default function ProfileDetailsPage() {
  const { user } = useSelector((state: any) => state.auth);
  const fileRef  = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const details = [
    { icon: Mail,      label: "Email",    value: user?.email || "jane.cooper@email.com" },
    { icon: Phone,     label: "Phone",    value: "+977 9800000000"                      },
    { icon: MapPin,    label: "Location", value: "Kathmandu, Nepal"                     },
    { icon: Building2, label: "Company",  value: "Contest Nepal"                        },
    { icon: Globe,     label: "Website",  value: "contestnepal.com"                     },
    { icon: Calendar,  label: "Joined",   value: "January 2026"                         },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* ── Card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Cover */}
          <div className="h-28 sm:h-36 bg-gradient-to-br from-[#A01C1C] via-[#c0312a] to-[#e05050] relative">
            <div className="absolute inset-0 opacity-10">
              {[80, 140, 200, 260].map((size, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-white"
                  style={{
                    width: size, height: size,
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Avatar row */}
          <div className="px-6 sm:px-8">
            <div className="flex items-end justify-between -mt-12 sm:-mt-14 mb-5">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-[#A01C1C]/10">
                  <Image
                    src="/images/userprofile.png"
                    alt="Profile"
                    width={96} height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#A01C1C] text-white flex items-center justify-center shadow-md hover:bg-[#851717] transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-50 transition-colors"
                >
                  {copied
                    ? <><Check className="w-3.5 h-3.5 text-green-500" /> Copied</>
                    : <><Globe className="w-3.5 h-3.5" /> Share</>
                  }
                </button>
              </div>
            </div>

            {/* Name + bio */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-black text-gray-900">
                  {user?.name || "Jane Cooper"}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#A01C1C]/8 border border-[#A01C1C]/15 text-[#A01C1C]">
                  Participant
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                Contest enthusiast. Love photography and travel. Based in Kathmandu.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-6" />

            {/* Details grid */}
            <div className="mb-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <User className="w-3.5 h-3.5" /> Profile Details
              </h2>
              <div className="space-y-4">
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                        {label}
                      </p>
                      <p className="text-sm font-medium text-gray-800 truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio section */}
            <div className="mb-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" /> About
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                Passionate about contests and community engagement. I participate in
                photography and travel contests and enjoy connecting with like-minded
                people on this platform.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 mb-5" />

            {/* Footer row */}
            <div className="pb-6 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Member since January 2026
              </span>
              <Link
                href="/settings"
                className="text-[#A01C1C] font-semibold hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" /> Edit Profile
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}