"use client";

import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function DangerSection() {
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showDelete,     setShowDelete]     = useState(false);
  const [deleteInput,    setDeleteInput]    = useState("");
  const deleteConfirmed = deleteInput === "DELETE";

  const actions = [
    {
      title: "Export Account Data",
      desc: "Download a copy of all your contests, participants, and submission data.",
      buttonLabel: "Export Data",
      cardClass: "border-gray-100",
      buttonClass: "border-gray-200 text-gray-600 hover:bg-gray-50",
      icon: null as React.ElementType | null,
      onClick: () => {},
    },
    {
      title: "Deactivate Account",
      desc: "Temporarily disable your account. You can reactivate it at any time by logging back in.",
      buttonLabel: "Deactivate Account",
      cardClass: "border-amber-200 bg-amber-50/20",
      buttonClass: "border-amber-200 text-amber-600 hover:bg-amber-50",
      icon: AlertTriangle as React.ElementType,
      onClick: () => setShowDeactivate(true),
    },
    {
      title: "Delete Account",
      desc: "Permanently delete your account and all associated data. This action cannot be undone.",
      buttonLabel: "Delete Account",
      cardClass: "border-red-200 bg-red-50/30",
      buttonClass: "bg-red-500 hover:bg-red-600 text-white border-0",
      icon: Trash2 as React.ElementType,
      onClick: () => setShowDelete(true),
    },
  ];

  const titleColor: Record<string, string> = {
    "Export Account Data":  "text-gray-800",
    "Deactivate Account":   "text-amber-600",
    "Delete Account":       "text-red-600",
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-red-100">
        <h2 className="text-lg font-bold text-red-600 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Danger Zone
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          These actions are irreversible. Please proceed with caution.
        </p>
      </div>

      <div className="space-y-3">
        {actions.map(({ title, desc, buttonLabel, cardClass, buttonClass, icon: Icon, onClick }) => (
          <Card key={title} className={cn("border shadow-sm", cardClass)}>
            <CardContent className="pt-5 pb-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className={cn("text-sm font-bold", titleColor[title])}>{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 max-w-sm">{desc}</p>
                </div>
                <Button variant="outline" size="sm" onClick={onClick}
                  className={cn("shrink-0 h-9 text-xs font-semibold gap-1.5", buttonClass)}>
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {buttonLabel}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Deactivate Dialog */}
      <Dialog open={showDeactivate} onOpenChange={setShowDeactivate}>
        <DialogContent className="max-w-sm p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-5 h-5" /> Deactivate Account
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 mt-2 mb-5">
            Your account will be disabled and all contests will be paused. You can reactivate by logging back in.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowDeactivate(false)}
              className="flex-1 h-10 border-gray-200">Cancel</Button>
            <Button onClick={() => setShowDeactivate(false)}
              className="flex-1 h-10 bg-amber-500 hover:bg-amber-600 text-white font-semibold">
              Deactivate
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDelete} onOpenChange={(o) => { setShowDelete(o); if (!o) setDeleteInput(""); }}>
        <DialogContent className="max-w-sm p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" /> Delete Account Permanently
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 mt-2 mb-4">
            This will permanently delete your account, all contests, participants, and submissions.{" "}
            <strong className="text-gray-700">This cannot be undone.</strong>
          </p>
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-4">
            <p className="text-xs text-red-600 font-medium">
              Type <strong>DELETE</strong> to confirm
            </p>
            <Input
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder="Type DELETE here..."
              className="mt-2 bg-white border-red-200 focus-visible:border-red-400 focus-visible:ring-red-200 h-9 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => { setShowDelete(false); setDeleteInput(""); }}
              className="flex-1 h-10 border-gray-200">Cancel</Button>
            <Button disabled={!deleteConfirmed} onClick={() => setShowDelete(false)}
              className="flex-1 h-10 bg-red-500 hover:bg-red-600 text-white font-semibold disabled:opacity-40">
              Delete Forever
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}