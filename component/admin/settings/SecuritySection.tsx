"use client";

import { useState } from "react";
import {
  Eye, EyeOff, Shield, Monitor, Smartphone,
  LogOut, KeyRound,
} from "lucide-react";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Button }   from "@/components/ui/button";
import { Switch }   from "@/components/ui/switch";
import { Badge }    from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Section } from "./shared";
import { cn } from "@/lib/utils";

export function SecuritySection({ onSave }: { onSave: (msg: string) => void }) {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCon, setShowCon] = useState(false);
  const [twoFA,   setTwoFA]   = useState(false);

  const strength =
    newPass.length === 0 ? 0
    : newPass.length < 6 ? 1
    : newPass.length < 10 ? 2
    : /[A-Z]/.test(newPass) && /[0-9]/.test(newPass) && /[^A-Za-z0-9]/.test(newPass) ? 4 : 3;

  const strengthMeta = [
    { label: "",       color: "" },
    { label: "Weak",   color: "bg-red-400"   },
    { label: "Fair",   color: "bg-amber-400" },
    { label: "Good",   color: "bg-blue-400"  },
    { label: "Strong", color: "bg-green-400" },
  ][strength];

  const strengthText = ["", "text-red-500", "text-amber-500", "text-blue-500", "text-green-500"][strength];

  const sessions = [
    { device: "MacBook Pro", browser: "Chrome 121",  location: "Dhaka, BD",    time: "Active now",  icon: Monitor,    current: true  },
    { device: "iPhone 15",   browser: "Safari 17",   location: "Dhaka, BD",    time: "2 hours ago", icon: Smartphone, current: false },
    { device: "Windows PC",  browser: "Firefox 122", location: "New York, US", time: "3 days ago",  icon: Monitor,    current: false },
  ];

  const fields = [
    { label: "Current Password", value: current, set: setCurrent, show: showCur, toggle: () => setShowCur(!showCur) },
    { label: "New Password",     value: newPass, set: setNewPass, show: showNew, toggle: () => setShowNew(!showNew) },
    { label: "Confirm Password", value: confirm, set: setConfirm, show: showCon, toggle: () => setShowCon(!showCon) },
  ];

  return (
    <Section
      title="Security Settings"
      description="Keep your account secure with a strong password and 2FA"
      onSave={() => onSave("Password updated successfully")}
    >
      {/* Change Password */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-gray-400" /> Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {fields.map(({ label, value, set, show, toggle }) => (
            <div key={label} className="space-y-1.5">
              <Label className="text-xs font-semibold text-gray-600">{label}</Label>
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder="••••••••••"
                  className="bg-gray-50 border-gray-200 focus-visible:border-[#A01C1C] focus-visible:ring-[#A01C1C]/20 h-10 pr-10"
                />
                <button type="button" onClick={toggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}

          {newPass.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={cn(
                    "h-1.5 flex-1 rounded-full transition-all duration-300",
                    i <= strength ? strengthMeta.color : "bg-gray-100"
                  )} />
                ))}
              </div>
              <p className={cn("text-xs font-medium", strengthText)}>
                Password strength: {strengthMeta.label}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2FA */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Two-Factor Authentication</p>
                <p className="text-xs text-gray-400 mt-0.5">Add an extra layer of security to your account</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {twoFA && (
                <Badge variant="outline" className="text-[10px] font-bold bg-green-50 text-green-600 border-green-200">
                  Enabled
                </Badge>
              )}
              <Switch checked={twoFA} onCheckedChange={setTwoFA}
                className="data-[state=checked]:bg-[#A01C1C]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Monitor className="w-4 h-4 text-gray-400" /> Active Sessions
          </CardTitle>
          <CardDescription className="text-xs">Devices currently logged into your account</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {sessions.map((s, i) => (
            <div key={i} className={cn(
              "flex items-center justify-between gap-3 p-3 rounded-xl border",
              s.current ? "bg-[#A01C1C]/5 border-[#A01C1C]/15" : "bg-gray-50 border-gray-100"
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center",
                  s.current ? "bg-[#A01C1C]/10" : "bg-white border border-gray-200"
                )}>
                  <s.icon className={cn("w-4 h-4", s.current ? "text-[#A01C1C]" : "text-gray-400")} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-gray-800">{s.device}</p>
                    {s.current && (
                      <Badge className="text-[9px] h-4 px-1.5 bg-[#A01C1C] text-white font-bold">Current</Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400">{s.browser} · {s.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-400">{s.time}</p>
                {!s.current && (
                  <button className="text-[11px] text-red-500 hover:text-red-600 font-medium mt-0.5">Revoke</button>
                )}
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm"
            className="w-full mt-2 h-9 border-red-200 text-red-500 hover:bg-red-50 text-xs font-semibold gap-1.5">
            <LogOut className="w-3.5 h-3.5" /> Sign Out All Other Sessions
          </Button>
        </CardContent>
      </Card>
    </Section>
  );
}