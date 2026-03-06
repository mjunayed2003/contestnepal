"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock, CheckCircle, XCircle,
  AlertCircle, Check, X
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────
const GIVEAWAY_DATA = [
  { 
    id: 1, 
    title: "Win a Premium Gaming Setup", 
    description: "Capture the essence of summer in a single photo. We are looking for vibrant colors, outdoor adventures, and sunny vibes.", 
    status: "Active", 
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80" 
  },
  { 
    id: 2, 
    title: "iPhone 15 Pro Max Giveaway", 
    description: "Follow our social media channels and stand a chance to win the brand new iPhone 15 Pro Max.", 
    status: "Active", 
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80" 
  },
];

const SUBMISSION_DATA = [
  { 
    id: 101, 
    title: "Best Mobile Photography", 
    description: "Submit your best shot taken with a mobile phone. No DSLR allowed. Theme: Urban Life.", 
    status: "Active", 
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80" 
  },
  { 
    id: 102, 
    title: "Logo Design Challenge", 
    description: "Create a unique logo for our new eco-friendly brand 'GreenLeaf'. Minimalist designs preferred.", 
    status: "Active", 
    image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?w=600&q=80" 
  },
];

const POOL_DATA = [
  { 
    id: 201, 
    title: "World Cup Prediction Pool", 
    description: "Predict the winner of the upcoming matches and win big prizes from the shared pool.", 
    status: "Active", 
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&q=80" 
  },
  { 
    id: 202, 
    title: "Crypto Price Prediction", 
    description: "Guess the Bitcoin price at the end of the month. The closest guess wins the entire pool.", 
    status: "Closed", 
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&q=80" 
  },
];

const MY_SUBMISSIONS = [
  { id: 1, title: "Win a Premium Gaming Setup", date: "Submitted on 26 Jan 2026", status: "Approved" },
  { id: 2, title: "Logo Design Challenge", date: "Submitted on 28 Jan 2026", status: "Pending" },
  { id: 3, title: "Best Mobile Photography", date: "Submitted on 29 Jan 2026", status: "Rejected" },
];

const NOTIFICATIONS = [
  { id: 1, title: "Concert Ending Soon",  message: 'Your entry has been approved!', date: "2024-06-11" },
  { id: 2, title: "Submission Approved",  message: 'Your entry has been approved!', date: "2024-06-11" },
];

// ─── STAT CARD ────────────────────────────────────────────────
function StatCard({ label, value, theme }: { label: string; value: string; theme: "red" | "blue" | "light-red" }) {
  const styles = {
    red:       { bg: "bg-[#FDF4F4]", dot: "bg-[#A01C1C]" }, 
    blue:      { bg: "bg-[#F6F7FB]", dot: "bg-[#00C48C]" }, 
    "light-red": { bg: "bg-[#FDF4F4]", dot: "bg-[#FF5C5C]" }
  };
  const currentStyle = styles[theme];

  return (
    <div className={`flex-1 min-w-[240px] ${currentStyle.bg} rounded-[20px] p-6 flex items-center justify-between`}>
      <div className="flex flex-col gap-2">
        <span className="text-[15px] text-gray-600 font-medium">{label}</span>
        <span className="text-[36px] font-bold text-gray-900 leading-none">{value}</span>
      </div>
      <div className={`w-6 h-6 rounded-full ${currentStyle.dot}`} />
    </div>
  );
}

// ─── JOINED CONTEST CARD ──────────────────────────────────────
function JoinedContestCard({
  contest,
  type,
  onClick,
}: {
  contest: any;
  type: string;
  onClick: () => void;
}) {
  const isActive = contest.status === "Active";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-md transition-shadow">
      {/* Image Section - Adjusted for larger layout */}
      <div className="w-full md:w-[260px] h-48 md:h-auto flex-shrink-0">
        <img 
          src={contest.image} 
          alt={contest.title} 
          className="w-full h-full object-cover rounded-xl" 
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col py-2">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-[20px] font-bold text-gray-900">{contest.title}</h3>
          
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold uppercase
            ${isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
            <span className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`} />
            {contest.status}
          </span>
        </div>

        <p className="text-[14px] text-gray-500 leading-relaxed mb-6 line-clamp-2 max-w-3xl">
          {contest.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex items-center gap-4">
          <button
            onClick={onClick}
            className="px-6 py-2.5 rounded-lg border border-[#A01C1C] text-[#A01C1C] font-semibold text-[14px] hover:bg-red-50 transition"
          >
            View Contest
          </button>
          
          <span className="bg-[#EDE9FE] text-[#7C3AED] px-4 py-2 rounded-lg text-[13px] font-medium">
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
    Approved: { bg: "bg-[#ECFDF5]", text: "text-[#059669]", dot: "bg-[#10B981]", iconBg: "bg-[#DCFCE7]", iconColor: "#16A34A", Icon: Check },
    Pending:  { bg: "bg-[#FFF7ED]", text: "text-[#D97706]", dot: "bg-[#F59E0B]", iconBg: "bg-[#FEF3C7]", iconColor: "#D97706", Icon: Clock },
    Rejected: { bg: "bg-[#FEF2F2]", text: "text-[#DC2626]", dot: "bg-[#EF4444]", iconBg: "bg-[#FEE2E2]", iconColor: "#EF4444", Icon: X },
  };
  const s = cfg[item.status as keyof typeof cfg] ?? cfg.Pending;
  const Icon = s.Icon;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-5">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${s.iconBg}`}>
          <Icon size={20} color={s.iconColor} strokeWidth={2.5} />
        </div>
        <div>
          <h4 className="text-[16px] font-semibold text-gray-900">{item.title}</h4>
          <p className="text-[14px] text-gray-400 mt-0.5">{item.date}</p>
        </div>
      </div>
      <div className={`${s.bg} ${s.text} px-5 py-2 rounded-full text-[13px] font-semibold flex items-center gap-2 w-fit`}>
        <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
        {item.status}
      </div>
    </div>
  );
}

// ─── NOTIFICATION ROW ─────────────────────────────────────────
function NotificationRow({ item }: { item: typeof NOTIFICATIONS[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#A01C1C] h-full" />
        <div className="pl-2 flex flex-col gap-1 w-full">
            <div className="flex items-center gap-2">
                <AlertCircle size={18} className="text-[#A01C1C]" />
                <h4 className="text-[15px] font-bold text-gray-900">{item.title}</h4>
            </div>
            <p className="text-[14px] text-gray-500">{item.message}</p>
            <span className="text-[13px] text-gray-400 mt-1">{item.date}</span>
        </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────
export default function Dashboard() {
  const router = useRouter();
  
  // States
  const [activeFilter, setActiveFilter] = useState("Giveaways");
  const [activeTab, setActiveTab] = useState("Joined Contests");

  // Determine which data to show
  let currentData;
  let typeLabel;

  if (activeFilter === "Giveaways") {
    currentData = GIVEAWAY_DATA;
    typeLabel = "Giveaway";
  } else if (activeFilter === "Submissions") {
    currentData = SUBMISSION_DATA;
    typeLabel = "Submission";
  } else {
    currentData = POOL_DATA;
    typeLabel = "Pool";
  }

  // Navigation Logic
  const handleNavigation = (id: number) => {
      if (activeFilter === "Giveaways") {
          router.push(`/dashboard/giveaway/${id}`);
      } else if (activeFilter === "Submissions") {
          router.push(`/dashboard/submission/${id}`);
      } else if (activeFilter === "Pools") {
          router.push(`/dashboard/pool/${id}`);
      }
  };

  return (
    <div className="bg-white font-sans py-10 px-6">
      
      {/* 
         ─── MAIN CONTAINER WITH EXACT DIMENSIONS ─── 
         Width: 1560px (max-w)
         Height: 835px (min-h)
         Gap: 32px (gap-8)
         Position: Centered (mx-auto)
      */}
      <div className="w-full max-w-[1560px] min-h-[835px] mx-auto flex flex-col gap-8">

        {/* Header */}
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Dashboard</h1>
          <p className="text-[15px] text-gray-500 mt-1">Welcome back, Seam Rahman</p>
        </div>

        {/* ─── TOP FILTER BUTTONS ─── */}
        <div className="bg-[#F8F9FA] inline-flex p-1.5 rounded-xl gap-2 w-fit shadow-sm border border-gray-100">
            {["Giveaways", "Submissions", "Pools"].map((filter) => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`
                        px-8 py-3 rounded-lg text-[14px] font-semibold transition-all duration-300
                        ${activeFilter === filter 
                            ? "bg-gradient-to-b from-[#A01C1C] to-[#801616] text-white shadow-md" 
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"}
                    `}
                >
                    {filter}
                </button>
            ))}
        </div>

        {/* Stats Section (Gap 32px provided by parent flex gap-8) */}
        <div className="flex flex-wrap gap-8">
          <StatCard label="Contests Joined"      value="03" theme="red"       />
          <StatCard label="Submissions Approved" value="08" theme="blue"      />
          <StatCard label="Pending Review"       value="01" theme="light-red" />
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#F3F4F6] p-1.5 rounded-xl inline-flex gap-2 w-fit">
          {["Joined Contests", "My Submissions", "Notification"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all duration-200
                ${activeTab === tab 
                  ? "bg-[#A01C1C] text-white shadow-sm" 
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-200"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Content Area ── */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            
          {/* JOINED CONTESTS */}
          {activeTab === "Joined Contests" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <div className="flex flex-col gap-8">
              {MY_SUBMISSIONS.map(s => <SubmissionRow key={s.id} item={s} />)}
            </div>
          )}

          {/* Notifications */}
          {activeTab === "Notification" && (
            <div className="flex flex-col gap-8">
              {NOTIFICATIONS.map(n => <NotificationRow key={n.id} item={n} />)}
            </div>
          )}
        
        </div>

      </div>
    </div>
  );
}