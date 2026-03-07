// app/user/notifications/page.tsx
"use client";

import { useState } from "react";
import {
  Bell, Trophy, Gift, Vote, BarChart2,
  Megaphone, X, Check, CheckCheck, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NotifType = "win" | "contest" | "giveaway" | "poll" | "announcement";

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL: Notification[] = [
  { id: 1, type: "win",          title: "You Won!",                  message: "You won 1st place in Best Travel Photo Contest. Prize: $1,000 travel voucher.",       time: "2 hours ago",  read: false },
  { id: 2, type: "contest",      title: "Contest Ending Soon",       message: "Win a Premium Gaming Setup contest ends in 24 hours. Don't miss your chance!",         time: "5 hours ago",  read: false },
  { id: 3, type: "giveaway",     title: "Entry Confirmed",           message: "Your entry for Win a Free Product Bundle has been received. Good luck!",               time: "1 day ago",    read: false },
  { id: 4, type: "poll",         title: "Poll Results Published",    message: "Community Choice Awards results are live. Dark Mode won with 35% votes!",              time: "2 days ago",   read: true  },
  { id: 5, type: "contest",      title: "Submission Approved",       message: "Your photo submission for Summer Vibes Contest has been approved.",                    time: "3 days ago",   read: true  },
  { id: 6, type: "announcement", title: "New Feature: Live Voting",  message: "We just launched live voting for submission contests. Check out the new leaderboard!", time: "4 days ago",   read: true  },
  { id: 7, type: "giveaway",     title: "New Giveaway Available",    message: "Win a MacBook Pro! A new giveaway just launched — join now before it fills up.",       time: "5 days ago",   read: true  },
  { id: 8, type: "win",          title: "Runner-up Prize",           message: "You came 2nd in the Photography Contest and won a $200 voucher.",                     time: "1 week ago",   read: true  },
];

const TYPE_CONFIG: Record<NotifType, { icon: React.ElementType; bg: string; color: string }> = {
  win:          { icon: Trophy,    bg: "bg-amber-50",  color: "text-amber-500"  },
  contest:      { icon: BarChart2, bg: "bg-blue-50",   color: "text-blue-500"   },
  giveaway:     { icon: Gift,      bg: "bg-purple-50", color: "text-purple-500" },
  poll:         { icon: Vote,      bg: "bg-orange-50", color: "text-orange-500" },
  announcement: { icon: Megaphone, bg: "bg-green-50",  color: "text-green-500"  },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL);

  const unread = notifs.filter((n) => !n.read).length;

  const markAll  = () => setNotifs((p) => p.map((n) => ({ ...n, read: true })));
  const markOne  = (id: number) => setNotifs((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteOne = (id: number) => setNotifs((p) => p.filter((n) => n.id !== id));

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-[50px] py-8 sm:py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#A01C1C]/8 border border-[#A01C1C]/15 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#A01C1C]" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900">Notifications</h1>
              <p className="text-xs text-gray-400 mt-0.5">
                {unread > 0 ? `${unread} unread` : "All caught up"}
              </p>
            </div>
          </div>

          {unread > 0 && (
            <button
              onClick={markAll}
              className="flex items-center gap-1.5 h-9 px-4 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mark all read</span>
            </button>
          )}
        </div>

        {/* List */}
        {notifs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-gray-400">
            <Bell className="w-10 h-10 mb-3 opacity-20" />
            <p className="text-sm font-medium">No notifications</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifs.map((n) => {
              const cfg  = TYPE_CONFIG[n.type];
              const Icon = cfg.icon;

              return (
                <div
                  key={n.id}
                  className={cn(
                    "group flex items-start gap-4 bg-white rounded-2xl border px-4 sm:px-5 py-4 transition-all hover:shadow-sm",
                    n.read ? "border-gray-100" : "border-[#A01C1C]/15 bg-[#A01C1C]/3"
                  )}
                >
                  {/* Icon */}
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5", cfg.bg)}>
                    <Icon className={cn("w-4 h-4", cfg.color)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className={cn("text-sm", n.read ? "font-medium text-gray-800" : "font-bold text-gray-900")}>
                        {n.title}
                      </p>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#A01C1C] shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{n.message}</p>
                    <p className="text-[11px] text-gray-300 mt-1.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {n.time}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!n.read && (
                      <button
                        onClick={() => markOne(n.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-green-500 hover:bg-green-50 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteOne(n.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}