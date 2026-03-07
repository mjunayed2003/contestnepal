"use client";

import { Check, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

// ─── TOAST ────────────────────────────────────────────────────
export function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg animate-in slide-in-from-bottom-4">
      <Check className="w-4 h-4 text-green-400 shrink-0" />
      {message}
    </div>
  );
}

// ─── SECTION WRAPPER ───────────────────────────────────────────
export function Section({
  title,
  description,
  children,
  onSave,
  saveLabel = "Save Changes",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  onSave?: () => void;
  saveLabel?: string;
}) {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
      {children}
      {onSave && (
        <div className="pt-2">
          <Button
            onClick={onSave}
            className="bg-[#A01C1C] hover:bg-[#851717] text-white font-semibold gap-2 shadow-sm h-10"
          >
            <Save className="w-4 h-4" /> {saveLabel}
          </Button>
        </div>
      )}
    </div>
  );
}