"use client";

import { useState } from "react";
import { Globe, Monitor } from "lucide-react";
import { Switch }  from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Section } from "./shared";

export function PreferencesSection({ onSave }: { onSave: (msg: string) => void }) {
  const [language,    setLanguage]    = useState("en");
  const [timezone,    setTimezone]    = useState("asia-dhaka");
  const [currency,    setCurrency]    = useState("usd");
  const [dateFormat,  setDateFormat]  = useState("mm-dd-yyyy");
  const [compactMode, setCompactMode] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const [defaultView, setDefaultView] = useState("grid");

  const selectFields = [
    {
      label: "Language", value: language, set: setLanguage,
      options: [{ v: "en", l: "English" }, { v: "bn", l: "বাংলা" }, { v: "fr", l: "Français" }, { v: "es", l: "Español" }],
    },
    {
      label: "Timezone", value: timezone, set: setTimezone,
      options: [
        { v: "asia-dhaka",    l: "Asia/Dhaka (GMT+6)"    },
        { v: "utc",           l: "UTC (GMT+0)"            },
        { v: "us-eastern",    l: "US/Eastern (GMT-5)"     },
        { v: "europe-london", l: "Europe/London (GMT+0)"  },
      ],
    },
    {
      label: "Currency", value: currency, set: setCurrency,
      options: [{ v: "usd", l: "USD ($)" }, { v: "bdt", l: "BDT (৳)" }, { v: "eur", l: "EUR (€)" }, { v: "gbp", l: "GBP (£)" }],
    },
    {
      label: "Date Format", value: dateFormat, set: setDateFormat,
      options: [{ v: "mm-dd-yyyy", l: "MM/DD/YYYY" }, { v: "dd-mm-yyyy", l: "DD/MM/YYYY" }, { v: "yyyy-mm-dd", l: "YYYY/MM/DD" }],
    },
  ];

  const toggleFields = [
    { label: "Compact Mode",                    desc: "Reduce spacing for denser layouts",                    value: compactMode, set: setCompactMode },
    { label: "Auto-approve Giveaway Submissions", desc: "Automatically approve simple task completions",       value: autoApprove, set: setAutoApprove },
  ];

  return (
    <Section
      title="Preferences"
      description="Customize language, timezone and display settings"
      onSave={() => onSave("Preferences saved")}
    >
      {/* Localization */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" /> Localization
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selectFields.map(({ label, value, set, options }) => (
            <div key={label} className="space-y-1.5">
              <p className="text-xs font-semibold text-gray-600">{label}</p>
              <Select value={value} onValueChange={set}>
                <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#A01C1C] h-10 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {options.map(({ v, l }) => (
                    <SelectItem key={v} value={v}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Display & Behavior */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Monitor className="w-4 h-4 text-gray-400" /> Display & Behavior
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-1">
          {toggleFields.map(({ label, desc, value, set }, i) => (
            <div key={label}>
              <div className="flex items-center justify-between py-3 px-1">
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <Switch checked={value} onCheckedChange={set}
                  className="data-[state=checked]:bg-[#A01C1C]" />
              </div>
              {i < toggleFields.length - 1 && <Separator className="bg-gray-50" />}
            </div>
          ))}

          <Separator className="bg-gray-50" />
          <div className="flex items-center justify-between py-3 px-1">
            <div>
              <p className="text-sm font-medium text-gray-800">Default Contest View</p>
              <p className="text-xs text-gray-400 mt-0.5">How contests are displayed by default</p>
            </div>
            <Select value={defaultView} onValueChange={setDefaultView}>
              <SelectTrigger className="w-28 bg-gray-50 border-gray-200 h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="list">List</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}