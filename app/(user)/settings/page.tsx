// app/user/settings/page.tsx
"use client";

import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Camera, Mail, Phone, MapPin, Building2,
  Globe, Lock, Eye, EyeOff, Bell, Trash2,
  Save, User, FileText, Check, AlertTriangle,
} from "lucide-react";
import Image from "next/image";

export default function UserSettingsPage() {
  const { user } = useSelector((state: any) => state.auth);
  const fileRef  = useRef<HTMLInputElement>(null);
  const [saved,  setSaved]  = useState(false);

  // Profile
  const [name,     setName]     = useState(user?.name  || "Jane Cooper");
  const [email,    setEmail]    = useState(user?.email || "jane@email.com");
  const [phone,    setPhone]    = useState("+977 9800000000");
  const [location, setLocation] = useState("Kathmandu, Nepal");
  const [company,  setCompany]  = useState("Contest Nepal");
  const [website,  setWebsite]  = useState("contestnepal.com");
  const [bio,      setBio]      = useState("Contest enthusiast. Love photography and travel.");

  // Password
  const [current,  setCurrent]  = useState("");
  const [newPass,  setNewPass]  = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showCur,  setShowCur]  = useState(false);
  const [showNew,  setShowNew]  = useState(false);
  const [showCon,  setShowCon]  = useState(false);

  // Notifications
  const [notifs, setNotifs] = useState({
    contestUpdates: true,
    winnerAnnounce: true,
    newsletter:     false,
    pushNotifs:     true,
  });

  // Delete dialog
  const [showDelete,   setShowDelete]   = useState(false);
  const [deleteInput,  setDeleteInput]  = useState("");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const passStrength = newPass.length === 0 ? 0
    : newPass.length < 6 ? 1
    : newPass.length < 10 ? 2
    : /[A-Z]/.test(newPass) && /[0-9]/.test(newPass) ? 4 : 3;

  const passColors = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-green-400"];
  const passLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const passTexts  = ["", "text-red-500", "text-amber-500", "text-blue-500", "text-green-500"];

  // ── Reusable field ──
  const Field = ({
    label, value, onChange, type = "text", icon: Icon, placeholder,
  }: {
    label: string; value: string; onChange: (v: string) => void;
    type?: string; icon: React.ElementType; placeholder?: string;
  }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-gray-400" /> {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C]/20 transition-all"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-5">

        {/* ── Page title ── */}
        <div className="mb-2">
          <h1 className="text-xl font-black text-gray-900">Settings</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage your account</p>
        </div>

        {/* ════════════════════════════════
            SECTION 1 — Profile
        ════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-5">
          <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <User className="w-4 h-4 text-[#A01C1C]" /> Profile
          </h2>

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm">
                <Image
                  src="/images/userprofile.png"
                  alt="Avatar"
                  width={64} height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#A01C1C] text-white flex items-center justify-center shadow hover:bg-[#851717] transition-colors"
              >
                <Camera className="w-3 h-3" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{email}</p>
              <button
                onClick={() => fileRef.current?.click()}
                className="text-xs text-[#A01C1C] font-semibold hover:underline mt-1"
              >
                Change photo
              </button>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name"  value={name}     onChange={setName}     icon={User}      placeholder="Your name"     />
            <Field label="Email"      value={email}    onChange={setEmail}    icon={Mail}      type="email" placeholder="you@email.com" />
            <Field label="Phone"      value={phone}    onChange={setPhone}    icon={Phone}     placeholder="+977 ..."       />
            <Field label="Location"   value={location} onChange={setLocation} icon={MapPin}    placeholder="City, Country" />
            <Field label="Company"    value={company}  onChange={setCompany}  icon={Building2} placeholder="Company name"  />
            <Field label="Website"    value={website}  onChange={setWebsite}  icon={Globe}     placeholder="yoursite.com"  />
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-gray-400" /> Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
              rows={3}
              className="w-full px-3 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C]/20 transition-all resize-none"
            />
            <p className="text-right text-[11px] text-gray-400">{bio.length}/160</p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 h-10 px-5 rounded-xl bg-[#A01C1C] hover:bg-[#851717] text-white text-sm font-bold transition-colors shadow-sm"
          >
            {saved
              ? <><Check className="w-4 h-4" /> Saved!</>
              : <><Save className="w-4 h-4" /> Save Changes</>
            }
          </button>
        </div>

        {/* ════════════════════════════════
            SECTION 2 — Password
        ════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#A01C1C]" /> Change Password
          </h2>

          {[
            { label: "Current Password", value: current, set: setCurrent, show: showCur, toggle: () => setShowCur(!showCur) },
            { label: "New Password",     value: newPass, set: setNewPass, show: showNew, toggle: () => setShowNew(!showNew) },
            { label: "Confirm Password", value: confirm, set: setConfirm, show: showCon, toggle: () => setShowCon(!showCon) },
          ].map(({ label, value, set, show, toggle }) => (
            <div key={label} className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500">{label}</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 pl-3 pr-10 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={toggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}

          {/* Strength */}
          {newPass.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex gap-1">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= passStrength ? passColors[passStrength] : "bg-gray-100"}`} />
                ))}
              </div>
              <p className={`text-xs font-medium ${passTexts[passStrength]}`}>
                {passLabels[passStrength]}
              </p>
            </div>
          )}

          <button
            onClick={() => { setCurrent(""); setNewPass(""); setConfirm(""); }}
            className="flex items-center gap-2 h-10 px-5 rounded-xl bg-[#A01C1C] hover:bg-[#851717] text-white text-sm font-bold transition-colors shadow-sm"
          >
            <Lock className="w-4 h-4" /> Update Password
          </button>
        </div>

        {/* ════════════════════════════════
            SECTION 3 — Notifications
        ════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-1">
          <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
            <Bell className="w-4 h-4 text-[#A01C1C]" /> Notifications
          </h2>

          {[
            { key: "contestUpdates", label: "Contest updates",       desc: "Get notified about contests you joined"    },
            { key: "winnerAnnounce", label: "Winner announcements",  desc: "When results are published"                },
            { key: "newsletter",     label: "Newsletter",            desc: "Weekly digest of new contests"             },
            { key: "pushNotifs",     label: "Push notifications",    desc: "Browser push alerts"                       },
          ].map(({ key, label, desc }, i, arr) => (
            <div key={key}>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={() => setNotifs((p) => ({ ...p, [key]: !p[key as keyof typeof notifs] }))}
                  className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${notifs[key as keyof typeof notifs] ? "bg-[#A01C1C]" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${notifs[key as keyof typeof notifs] ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>
              {i < arr.length - 1 && <div className="h-px bg-gray-50" />}
            </div>
          ))}
        </div>

        {/* ════════════════════════════════
            SECTION 4 — Danger Zone
        ════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5 sm:p-6">
          <h2 className="text-sm font-bold text-red-600 flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4" /> Danger Zone
          </h2>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">Delete Account</p>
              <p className="text-xs text-gray-400 mt-0.5">Permanently delete your account and all data</p>
            </div>
            <button
              onClick={() => setShowDelete(true)}
              className="shrink-0 flex items-center gap-1.5 h-9 px-4 rounded-xl border border-red-200 text-red-500 text-xs font-bold hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>

        {/* ── Delete Dialog ── */}
        {showDelete && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setShowDelete(false)}>
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-base font-bold text-red-600 flex items-center gap-2 mb-2">
                <Trash2 className="w-4 h-4" /> Delete Account
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                This will permanently delete your account. Type <strong className="text-gray-800">DELETE</strong> to confirm.
              </p>
              <input
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                placeholder="Type DELETE here..."
                className="w-full h-10 px-3 text-sm border border-red-200 rounded-xl outline-none focus:border-red-400 mb-4 bg-red-50"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowDelete(false); setDeleteInput(""); }}
                  className="flex-1 h-10 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={deleteInput !== "DELETE"}
                  className="flex-1 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}