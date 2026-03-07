"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trophy, CheckCircle2 } from "lucide-react";

export function WinnerManagement() {
  const [published, setPublished] = useState(false);

  if (published) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 flex items-center gap-4">
        <div className="bg-emerald-100 p-2 rounded-full"><CheckCircle2 className="w-6 h-6 text-emerald-600" /></div>
        <div><h3 className="font-bold text-emerald-900">Results Published</h3><p className="text-sm text-emerald-700">Winners have been notified.</p></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
        <Trophy className="w-5 h-5 text-blue-600 mt-1" />
        <div><h4 className="text-sm font-semibold text-blue-900">Manual Selection</h4><p className="text-xs text-blue-700">Select 3 winners from the list.</p></div>
      </div>

      <div className="border rounded-xl bg-white overflow-hidden">
        <div className="p-4 bg-gray-50 border-b font-semibold text-gray-700">Approved Participants</div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-50">
            <div className="flex items-center gap-4">
               <Checkbox className="data-[state=checked]:bg-[#A01C1C]" />
               <div><p className="font-medium text-sm">Sarah Johnson</p><p className="text-xs text-gray-500">sarah.j@email.com</p></div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded"><CheckCircle2 className="w-3.5 h-3.5" /> All tasks completed</div>
          </div>
        ))}
      </div>

      <Button onClick={() => setPublished(true)} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold h-11">
        <Trophy className="w-4 h-4 mr-2" /> Confirm Winner & Publish Results
      </Button>
    </div>
  );
}