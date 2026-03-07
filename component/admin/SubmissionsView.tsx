"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Eye, Check, X } from "lucide-react";

export function SubmissionsView() {
  const [selectedSub, setSelectedSub] = useState<any>(null);

  const submissions = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", img: "/mountains.jpg", date: "2/5/2026", status: "PENDING" },
    { id: 2, name: "Mike Chen", email: "mike.c@email.com", img: "/sunset.jpg", date: "2/5/2026", status: "APPROVED" },
  ];

  return (
    <>
      <div className="rounded-md border bg-white">
        <div className="p-4 grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 bg-gray-50 border-b font-semibold text-sm text-gray-500">
          <div>User & Preview</div><div>Date</div><div>Status</div><div className="text-right">Actions</div>
        </div>
        {submissions.map((sub) => (
          <div key={sub.id} className="p-4 grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center border-b last:border-0 hover:bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-16 rounded overflow-hidden bg-gray-200">
                 {/* Placeholder Image */}
                 <div className="absolute inset-0 bg-slate-300" /> 
              </div>
              <div><p className="font-medium text-sm">{sub.name}</p><p className="text-xs text-gray-500">{sub.email}</p></div>
            </div>
            <div className="text-sm text-gray-500">{sub.date}</div>
            <div>
                <Badge variant="outline" className={sub.status === "APPROVED" ? "bg-emerald-100 text-emerald-700 border-0" : "bg-amber-100 text-amber-700 border-0"}>{sub.status}</Badge>
            </div>
            <div className="flex justify-end gap-2">
              <Button size="icon" variant="ghost" onClick={() => setSelectedSub(sub)}><Eye className="w-4 h-4 text-blue-600" /></Button>
              <Button size="icon" variant="ghost"><Check className="w-4 h-4 text-emerald-600" /></Button>
              <Button size="icon" variant="ghost"><X className="w-4 h-4 text-red-600" /></Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Dialog for Details */}
      <Dialog open={!!selectedSub} onOpenChange={() => setSelectedSub(null)}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Submission Details</DialogTitle>
            </DialogHeader>
            {selectedSub && (
                <div className="space-y-4">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                        {/* Placeholder for actual image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image Preview</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">Submitted by</p>
                            <p className="font-medium">{selectedSub.name}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Submission Date</p>
                            <p className="font-medium">{selectedSub.date}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-gray-500">Content</p>
                            <p className="font-medium">Mountain landscape during golden hour</p>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"><Check className="w-4 h-4 mr-2"/> Approve</Button>
                        <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white"><X className="w-4 h-4 mr-2"/> Reject</Button>
                    </div>
                </div>
            )}
        </DialogContent>
      </Dialog>
    </>
  );
}