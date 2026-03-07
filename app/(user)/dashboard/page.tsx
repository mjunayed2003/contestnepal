"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock, AlertCircle, Check, X,
  Trophy, FileCheck, Hourglass,
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────
const GIVEAWAY_DATA = [
  { id: 1,   title: "Win a Premium Gaming Setup",  description: "Capture the essence of summer in a single photo. We are looking for vibrant colors, outdoor adventures, and sunny vibes.", status: "Active", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80" },
  { id: 2,   title: "iPhone 15 Pro Max Giveaway",  description: "Follow our social media channels and stand a chance to win the brand new iPhone 15 Pro Max.",                            status: "Active", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80" },
  { id: 3,   title: "Win a Premium Gaming Setup",  description: "Capture the essence of summer in a single photo. We are looking for vibrant colors, outdoor adventures, and sunny vibes.", status: "Active", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80" },
  { id: 4,   title: "iPhone 15 Pro Max Giveaway",  description: "Follow our social media channels and stand a chance to win the brand new iPhone 15 Pro Max.",                            status: "Active", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80" },
];
const SUBMISSION_DATA = [
  { id: 101, title: "Best Mobile Photography",     description: "Submit your best shot taken with a mobile phone. No DSLR allowed. Theme: Urban Life.",                                  status: "Active", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80" },
  { id: 102, title: "Logo Design Challenge",        description: "Create a unique logo for our new eco-friendly brand 'GreenLeaf'. Minimalist designs preferred.",                         status: "Active", image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?w=600&q=80" },
];
const POLL_DATA = [
  { id: 201, title: "World Cup Prediction Poll",    description: "Predict the winner of the upcoming matches and win big prizes from the shared poll.",                                    status: "Active", image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&q=80" },
  { id: 202, title: "Crypto Price Prediction",      description: "Guess the Bitcoin price at the end of the month. The closest guess wins the entire poll.",                               status: "Closed", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&q=80" },
];
const MY_SUBMISSIONS = [
  { id: 1, title: "Win a Premium Gaming Setup",  date: "Submitted on 26 Jan 2026", status: "Approved" },
  { id: 2, title: "Logo Design Challenge",        date: "Submitted on 28 Jan 2026", status: "Pending"  },
  { id: 3, title: "Best Mobile Photography",      date: "Submitted on 29 Jan 2026", status: "Rejected" },
];
const NOTIFICATIONS = [
  { id: 1, title: "Contest Ending Soon",  message: "Win a Premium Gaming Setup contest ends in 24 hours.", date: "2026-01-26" },
  { id: 2, title: "Submission Approved",  message: "Your entry for Logo Design Challenge has been approved!", date: "2026-01-28" },
];

// ─── STAT CARD ────────────────────────────────────────────────
function StatCard({
  label, value, icon: Icon, bg, iconBg, iconColor,
}: {
  label: string; value: string;
  icon: React.ElementType;
  bg: string; iconBg: string; iconColor: string;
}) {
  return (
    <div className={`flex-1 min-w-0 ${bg} rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4`}>
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
        <p className="text-3xl sm:text-4xl font-black text-gray-900 leading-none">{value}</p>
      </div>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
    </div>
  );
}

// ─── JOINED CONTEST CARD ──────────────────────────────────────
function JoinedContestCard({
  contest, type, onClick,
}: {
  contest: { id: number; title: string; description: string; status: string; image: string };
  type: string;
  onClick: () => void;
}) {
  const isActive = contest.status === "Active";
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="w-full sm:w-[200px] lg:w-[220px] h-44 sm:h-auto shrink-0">
        <img
          src={contest.image}
          alt={contest.title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col py-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <h3 className="text-base sm:text-[18px] font-bold text-gray-900 leading-snug">{contest.title}</h3>
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase shrink-0
            ${isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`} />
            {contest.status}
          </span>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-2">{contest.description}</p>

        <div className="mt-auto flex items-center gap-3 flex-wrap">
          <button
            onClick={onClick}
            className="h-9 px-5 rounded-lg border border-[#A01C1C] text-[#A01C1C] font-semibold text-sm hover:bg-red-50 transition-colors"
          >
            View Contest
          </button>
          <span className="bg-purple-50 text-purple-600 border border-purple-100 px-3 py-1.5 rounded-lg text-xs font-semibold">
            {type}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── SUBMISSION ROW ───────────────────────────────────────────
function SubmissionRow({ item }: { item: typeof MY_SUBMISSIONS[0] }) {
  const cfg = {
    Approved: { bg: "bg-green-50", text: "text-green-600", dot: "bg-green-500", iconBg: "bg-green-100", iconColor: "text-green-600", Icon: Check    },
    Pending:  { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-400", iconBg: "bg-amber-100", iconColor: "text-amber-600", Icon: Clock    },
    Rejected: { bg: "bg-red-50",   text: "text-red-500",   dot: "bg-red-400",   iconBg: "bg-red-100",   iconColor: "text-red-500",   Icon: X        },
  };
  const s    = cfg[item.status as keyof typeof cfg] ?? cfg.Pending;
  const Icon = s.Icon;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${s.iconBg}`}>
          <Icon className={`w-4 h-4 ${s.iconColor}`} strokeWidth={2.5} />
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-gray-900">{item.title}</h4>
          <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
        </div>
      </div>
      <div className={`${s.bg} ${s.text} px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 w-fit`}>
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
        {item.status}
      </div>
    </div>
  );
}

// ─── NOTIFICATION ROW ─────────────────────────────────────────
function NotificationRow({ item }: { item: typeof NOTIFICATIONS[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex gap-4 shadow-sm relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A01C1C]" />
      <div className="pl-2 flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle className="w-4 h-4 text-[#A01C1C] shrink-0" />
          <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
        </div>
        <p className="text-sm text-gray-500">{item.message}</p>
        <span className="text-xs text-gray-400 mt-1.5 block">{item.date}</span>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────
export default function Dashboard() {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState("Giveaways");
  const [activeTab,    setActiveTab]    = useState("Joined Contests");

  const filterMap: Record<string, { data: typeof GIVEAWAY_DATA; label: string }> = {
    Giveaways:   { data: GIVEAWAY_DATA,   label: "Giveaway"   },
    Submissions: { data: SUBMISSION_DATA, label: "Submission" },
    Polls:       { data: POLL_DATA,       label: "Poll"       },
  };
  const { data: currentData, label: typeLabel } = filterMap[activeFilter];

  const handleNavigation = (id: number) => {
    const routes: Record<string, string> = {
      Giveaways:   `/dashboard/giveaway/${id}`,
      Submissions: `/dashboard/submission/${id}`,
      Polls:       `/dashboard/poll/${id}`,
    };
    router.push(routes[activeFilter]);
  };

  return (
    <div className="min-h-screen bg-gray-50/40">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-[50px] py-8 sm:py-12">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl sm:text-[28px] font-black text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Welcome back, Seam Rahman</p>
        </div>

        {/* ── Filter Buttons ── */}
        <div className="bg-white inline-flex p-1.5 rounded-xl gap-1.5 shadow-sm border border-gray-100 mb-7">
          {["Giveaways", "Submissions", "Polls"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 sm:px-7 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                ${activeFilter === f
                  ? "bg-gradient-to-b from-[#A01C1C] to-[#801616] text-white shadow-md"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-7">
          <StatCard label="Contests Joined"      value="03" icon={Trophy}      bg="bg-[#FDF4F4]" iconBg="bg-[#A01C1C]/10" iconColor="text-[#A01C1C]" />
          <StatCard label="Submissions Approved" value="08" icon={FileCheck}   bg="bg-[#F0FDF4]" iconBg="bg-green-100"     iconColor="text-green-600" />
          <StatCard label="Pending Review"       value="01" icon={Hourglass}   bg="bg-[#FFFBEB]" iconBg="bg-amber-100"     iconColor="text-amber-500" />
        </div>

        {/* ── Tab Navigation ── */}
        <div className="bg-white p-1.5 rounded-xl inline-flex gap-1.5 shadow-sm border border-gray-100 mb-7 overflow-x-auto max-w-full">
          {["Joined Contests", "My Submissions", "Notification"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap
                ${activeTab === tab
                  ? "bg-[#A01C1C] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">

          {/* Joined Contests */}
          {activeTab === "Joined Contests" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {currentData.map((item) => (
                <JoinedContestCard
                  key={item.id}
                  contest={item}
                  type={typeLabel}
                  onClick={() => handleNavigation(item.id)}
                />
              ))}
            </div>
          )}

          {/* My Submissions */}
          {activeTab === "My Submissions" && (
            <div className="flex flex-col gap-4">
              {MY_SUBMISSIONS.map((s) => <SubmissionRow key={s.id} item={s} />)}
            </div>
          )}

          {/* Notifications */}
          {activeTab === "Notification" && (
            <div className="flex flex-col gap-4">
              {NOTIFICATIONS.map((n) => <NotificationRow key={n.id} item={n} />)}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}