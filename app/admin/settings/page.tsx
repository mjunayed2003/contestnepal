"use client";

import { useState } from "react";
import { User, Lock, Bell, Globe, Shield, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toast }                from "@/component/admin/settings/shared";
import { ProfileSection }       from "@/component/admin/settings/ProfileSection";
import { SecuritySection }      from "@/component/admin/settings/SecuritySection";
import { NotificationsSection } from "@/component/admin/settings/NotificationsSection";
import { PreferencesSection }   from "@/component/admin/settings/PreferencesSection";
import { DangerSection }        from "@/component/admin/settings/DangerSection";

type SettingTab = "profile" | "security" | "notifications" | "preferences" | "danger";

const NAV_ITEMS = [
  { key: "profile"       as SettingTab, label: "Profile",       icon: User,   description: "Personal info & avatar"        },
  { key: "security"      as SettingTab, label: "Security",       icon: Lock,   description: "Password & sessions"           },
  { key: "notifications" as SettingTab, label: "Notifications",  icon: Bell,   description: "Email & push alerts"           },
  { key: "preferences"   as SettingTab, label: "Preferences",    icon: Globe,  description: "Language, timezone & display"  },
  { key: "danger"        as SettingTab, label: "Danger Zone",    icon: Shield, description: "Delete or deactivate account"  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingTab>("profile");
  const [toast, setToast]         = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white p-8">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-7">

        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-60 shrink-0">
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ key, label, icon: Icon, description }) => {
              const isActive  = activeTab === key;
              const isDanger  = key === "danger";
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 border",
                    isActive
                      ? isDanger
                        ? "bg-red-50 border-red-100"
                        : "bg-[#A01C1C]/8 border-[#A01C1C]/15"
                      : "hover:bg-gray-50 border-transparent"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    isActive
                      ? isDanger ? "bg-red-100" : "bg-[#A01C1C]/10"
                      : "bg-gray-100"
                  )}>
                    <Icon className={cn(
                      "w-4 h-4",
                      isActive
                        ? isDanger ? "text-red-500" : "text-[#A01C1C]"
                        : "text-gray-400"
                    )} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cn(
                      "text-sm font-semibold leading-tight",
                      isActive
                        ? isDanger ? "text-red-600" : "text-[#A01C1C]"
                        : "text-gray-700"
                    )}>
                      {label}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{description}</p>
                  </div>
                  {isActive && (
                    <ChevronRight className={cn(
                      "w-3.5 h-3.5 shrink-0",
                      isDanger ? "text-red-400" : "text-[#A01C1C]/60"
                    )} />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── Content ── */}
        <main className="flex-1 min-w-0">
          {activeTab === "profile"       && <ProfileSection       onSave={setToast} />}
          {activeTab === "security"      && <SecuritySection      onSave={setToast} />}
          {activeTab === "notifications" && <NotificationsSection onSave={setToast} />}
          {activeTab === "preferences"   && <PreferencesSection   onSave={setToast} />}
          {activeTab === "danger"        && <DangerSection />}
        </main>
      </div>
    </div>
  );
}