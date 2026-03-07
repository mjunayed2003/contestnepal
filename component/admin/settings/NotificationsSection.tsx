"use client";

import { useState } from "react";
import { Mail, Bell } from "lucide-react";
import { Switch }    from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "./shared";

const EMAIL_GROUPS = [
  {
    label: "Contest Activity",
    items: [
      { key: "newParticipant", label: "New Participant",   desc: "When someone joins a contest"         },
      { key: "newSubmission",  label: "New Submission",    desc: "When a submission is received"        },
      { key: "contestEnded",   label: "Contest Ended",     desc: "When a contest reaches its end date"  },
      { key: "winnerSelected", label: "Winner Selected",   desc: "When results are published"           },
    ],
  },
  {
    label: "Reports & System",
    items: [
      { key: "weeklyReport",  label: "Weekly Report",   desc: "Weekly summary of all activity"          },
      { key: "systemAlerts",  label: "System Alerts",   desc: "Important platform notifications"        },
    ],
  },
];

const PUSH_ITEMS = [
  { key: "pushNew",        label: "New Contest Activity", desc: "Participants and new entries"           },
  { key: "pushSubmission", label: "Submission Review",    desc: "Submissions awaiting your review"       },
  { key: "pushWinner",     label: "Winner Announcements", desc: "When results are ready to publish"      },
];

type SettingsKey =
  | "newParticipant" | "newSubmission" | "contestEnded" | "winnerSelected"
  | "weeklyReport"   | "systemAlerts"
  | "pushNew"        | "pushSubmission" | "pushWinner";

export function NotificationsSection({ onSave }: { onSave: (msg: string) => void }) {
  const [settings, setSettings] = useState<Record<SettingsKey, boolean>>({
    newParticipant:  true,
    newSubmission:   true,
    contestEnded:    true,
    winnerSelected:  false,
    weeklyReport:    true,
    systemAlerts:    true,
    pushNew:         false,
    pushSubmission:  true,
    pushWinner:      true,
  });

  const toggle = (key: SettingsKey) =>
    setSettings((p) => ({ ...p, [key]: !p[key] }));

  return (
    <Section
      title="Notification Settings"
      description="Choose what you want to be notified about"
      onSave={() => onSave("Notification preferences saved")}
    >
      {/* Email */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" /> Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-5">
          {EMAIL_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map(({ key, label, desc }, i) => (
                  <div key={key}>
                    <div className="flex items-center justify-between py-3 px-1">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                      </div>
                      <Switch
                        checked={settings[key as SettingsKey]}
                        onCheckedChange={() => toggle(key as SettingsKey)}
                        className="data-[state=checked]:bg-[#A01C1C]"
                      />
                    </div>
                    {i < group.items.length - 1 && <Separator className="bg-gray-50" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Push */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Bell className="w-4 h-4 text-gray-400" /> Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-1">
          {PUSH_ITEMS.map(({ key, label, desc }, i) => (
            <div key={key}>
              <div className="flex items-center justify-between py-3 px-1">
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <Switch
                  checked={settings[key as SettingsKey]}
                  onCheckedChange={() => toggle(key as SettingsKey)}
                  className="data-[state=checked]:bg-[#A01C1C]"
                />
              </div>
              {i < PUSH_ITEMS.length - 1 && <Separator className="bg-gray-50" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </Section>
  );
}