"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Pencil, Download, Search, Eye, Check, X,
  Users, FileText, Clock, CheckCircle2, Trophy, BarChart2, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── TYPES ────────────────────────────────────────────────────
type Tab = "overview" | "participants" | "submissions" | "voting" | "winner";

interface Participant {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  submissions: number;
  status: "Submitted" | "Approved" | "Pending";
}

interface Submission {
  id: number;
  name: string;
  email: string;
  image: string;
  content: string;
  date: string;
  votes: number;
  status: "Approved" | "Pending" | "Rejected";
}

interface LeaderboardEntry {
  id: number;
  rank: number;
  name: string;
  image: string;
  caption: string;
  votes: number;
  totalVotes: number;
}

// ─── MOCK DATA ─────────────────────────────────────────────────
const PARTICIPANTS: Participant[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: "Sarah Johnson",
  email: "sarah.j@email.com",
  joinDate: "2/5/2026",
  submissions: 2,
  status: i % 3 === 0 ? "Approved" : i % 3 === 1 ? "Pending" : "Submitted",
}));

const SUBMISSIONS: Submission[] = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  name: "Sarah Johnson",
  email: "sarah.j@email.com",
  image: "/images/contest2.jpg",
  content: "Beautiful sunset photograph from my recent beach trip",
  date: "2/5/2026,  10:25PM",
  votes: 42,
  status: i % 3 === 1 ? "Pending" : i % 3 === 2 ? "Rejected" : "Approved",
}));

const LEADERBOARD: LeaderboardEntry[] = [
  { id: 1, rank: 1, name: "Sarah Johnson",  image: "/images/contest2.jpg", caption: "Beautiful sunset photograph", votes: 42, totalVotes: 122 },
  { id: 2, rank: 2, name: "Emma Wilson",    image: "/images/contest3.jpg", caption: "Street photography",          votes: 35, totalVotes: 122 },
  { id: 3, rank: 3, name: "Sarah Johnson",  image: "/images/contest1.jpg", caption: "Beautiful sunset photograph", votes: 27, totalVotes: 122 },
  { id: 4, rank: 4, name: "Sarah Johnson",  image: "/images/contest2.jpg", caption: "Beautiful sunset photograph", votes: 18, totalVotes: 122 },
  { id: 5, rank: 4, name: "Sarah Johnson",  image: "/images/contest3.jpg", caption: "Beautiful sunset photograph", votes: 10, totalVotes: 122 },
];

// ─── STATUS STYLES ─────────────────────────────────────────────
const participantStatusStyle: Record<string, string> = {
  Submitted: "bg-blue-50 text-blue-600 border border-blue-100",
  Approved:  "bg-green-50 text-green-600 border border-green-100",
  Pending:   "bg-yellow-50 text-yellow-600 border border-yellow-100",
};
const submissionStatusStyle: Record<string, string> = {
  Approved: "bg-green-50 text-green-600 border border-green-100",
  Pending:  "bg-yellow-50 text-yellow-600 border border-yellow-100",
  Rejected: "bg-red-50 text-red-500 border border-red-100",
};

const rankEmoji = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return rank.toString();
};

// ─── MAIN PAGE ─────────────────────────────────────────────────
export default function SubmissionsContestDetailPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview",     label: "Overview"          },
    { key: "participants", label: "Participants"       },
    { key: "submissions",  label: "Submissions"        },
    { key: "voting",       label: "Voting Results"     },
    { key: "winner",       label: "Winner Management"  },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Back */}
      <button
        onClick={() => router.push("/admin/contests")}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Contests
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900">Win a Free Product Bundle</h1>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold border border-green-200 text-green-600 bg-green-50 uppercase tracking-wide">Active</span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold border border-purple-200 text-purple-600 bg-purple-50 uppercase tracking-wide">Giveaway</span>
          </div>
          <p className="text-gray-500 text-sm">Follow and win amazing prizes</p>
        </div>
        <button className="flex items-center gap-2 bg-[#A01C1C] hover:bg-[#851717] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0">
          <Pencil className="w-4 h-4" /> Edit Contest
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
              activeTab === key
                ? "bg-[#A01C1C] text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "overview"     && <OverviewTab />}
      {activeTab === "participants" && <ParticipantsTab />}
      {activeTab === "submissions"  && <SubmissionsTab />}
      {activeTab === "voting"       && <VotingResultsTab />}
      {activeTab === "winner"       && <WinnerTab />}
    </div>
  );
}

/* ─── OVERVIEW TAB ─────────────────────────────────────────── */
function OverviewTab() {
  const stats = [
    { label: "Total Participants", value: "5,420", icon: Users,    iconBg: "bg-blue-50",   iconColor: "text-blue-500"   },
    { label: "Total Submissions",  value: "5,420", icon: FileText, iconBg: "bg-green-50",  iconColor: "text-green-500"  },
    { label: "Engagement Rate",    value: "78%",   icon: Clock,    iconBg: "bg-purple-50", iconColor: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <span className="text-sm text-gray-500 font-medium">{label}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Contest Information */}
      <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-4">Contest Information</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Full Description</p>
            <p className="text-sm text-gray-700">
              Share your most creative summer photographs and let the community vote for their favorites!
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Rules & Guidelines</p>
            <p className="text-sm text-gray-700">Original photos only. Maximum 2 submissions per user.</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-gray-500" />
          <h3 className="text-base font-bold text-gray-900">Timeline</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Start Date :</p>
            <p className="text-sm font-medium text-gray-800">Thursday, February 5, 2026</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">End Date :</p>
            <p className="text-sm font-medium text-gray-800">Friday, February 20, 2026</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Voting Start :</p>
            <p className="text-sm font-medium text-gray-800">Friday, February 20, 2026</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Voting End :</p>
            <p className="text-sm font-medium text-gray-800">Friday, February 20, 2026</p>
          </div>
        </div>
      </div>

      {/* Submission Settings */}
      <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-4">Submission Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Submission Type</p>
            <p className="text-sm font-bold text-gray-900">Image</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Max Submissions Per User</p>
            <p className="text-sm font-bold text-gray-900">2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PARTICIPANTS TAB ─────────────────────────────────────── */
function ParticipantsTab() {
  const [search, setSearch] = useState("");
  const [modalParticipant, setModalParticipant] = useState<Participant | null>(null);

  const filtered = PARTICIPANTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">Participants</h3>
            <p className="text-xs text-gray-400 mt-0.5">Total Number: {PARTICIPANTS.length}</p>
          </div>
          <button className="flex items-center gap-2 bg-[#A01C1C] hover:bg-[#851717] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search participants by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 h-10 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#A01C1C]/20 focus:border-[#A01C1C]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-b border-gray-100 bg-gray-50/50">
                {["Participant", "Email", "Join Date", "Submissions", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                  <td className="px-6 py-4 text-gray-500">{p.email}</td>
                  <td className="px-6 py-4 text-gray-500">{p.joinDate}</td>
                  <td className="px-6 py-4 text-gray-700">{p.submissions}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${participantStatusStyle[p.status]}`}>
                      {p.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setModalParticipant(p)}
                      className="text-[#A01C1C] text-xs font-semibold hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalParticipant && (
        <ParticipantDetailModal
          participant={modalParticipant}
          onClose={() => setModalParticipant(null)}
        />
      )}
    </>
  );
}

/* ─── PARTICIPANT DETAIL MODAL ─────────────────────────────── */
function ParticipantDetailModal({ participant, onClose }: { participant: Participant; onClose: () => void }) {
  const submissionHistory = Array.from({ length: participant.submissions }, (_, i) => ({
    id: i + 1,
    image: i % 2 === 0 ? "/images/contest2.jpg" : "/images/contest3.jpg",
    content: i === 0 ? "Beautiful sunset photograph from my recent beach trip" : "Cityscape photo taken during golden hour",
    date: "2/5/2026, 10:25PM",
    votes: 42,
    status: i === 0 ? "Approved" : "Pending",
  }));

  const statusColor: Record<string, string> = {
    Approved: "bg-green-50 text-green-600 border border-green-100",
    Pending:  "bg-yellow-50 text-yellow-600 border border-yellow-100",
    Rejected: "bg-red-50 text-red-500 border border-red-100",
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h3 className="text-base font-bold text-gray-900">Participant Details</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-14 h-14 rounded-full bg-[#A01C1C]/10 flex items-center justify-center shrink-0">
              <span className="text-xl font-black text-[#A01C1C]">{participant.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-gray-900 truncate">{participant.name}</p>
              <p className="text-sm text-gray-400 truncate">{participant.email}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${participantStatusStyle[participant.status]}`}>
              {participant.status.toUpperCase()}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
              <p className="text-2xl font-black text-blue-600">{participant.submissions}</p>
              <p className="text-[11px] text-blue-400 font-medium mt-0.5">Submissions</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
              <p className="text-2xl font-black text-green-600">{submissionHistory.filter(s => s.status === "Approved").length}</p>
              <p className="text-[11px] text-green-400 font-medium mt-0.5">Approved</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
              <p className="text-2xl font-black text-yellow-600">{submissionHistory.filter(s => s.status === "Pending").length}</p>
              <p className="text-[11px] text-yellow-400 font-medium mt-0.5">Pending</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Joined Date</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">{participant.joinDate}</span>
          </div>
          {submissionHistory.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" /> Submission History
              </h4>
              <div className="space-y-3">
                {submissionHistory.map((sub) => (
                  <div key={sub.id} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                      <Image src={sub.image} alt="submission" width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 line-clamp-2">{sub.content}</p>
                      <p className="text-[11px] text-gray-400 mt-1">{sub.date}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${statusColor[sub.status]}`}>
                      {sub.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="px-6 pb-6">
          <button onClick={onClose} className="w-full h-11 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SUBMISSIONS TAB ──────────────────────────────────────── */
function SubmissionsTab() {
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [submissions, setSubmissions]   = useState<Submission[]>(SUBMISSIONS);
  const [modalItem, setModalItem]       = useState<Submission | null>(null);

  const statusFilters = ["All", "Approved", "Pending", "Rejected"];

  const filtered = submissions.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleApprove = (id: number) => { setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status: "Approved" } : s)); setModalItem(null); };
  const handleReject  = (id: number) => { setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status: "Rejected" } : s)); setModalItem(null); };

  return (
    <>
      <div className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">Participants</h3>
            <p className="text-xs text-gray-400 mt-0.5">Total Number: {submissions.length}</p>
          </div>
          <button className="flex items-center gap-2 bg-[#A01C1C] hover:bg-[#851717] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        <div className="px-6 pb-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search participants by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 h-10 rounded-xl border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#A01C1C]/20 focus:border-[#A01C1C]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-[#A01C1C]/20 focus:border-[#A01C1C]"
          >
            {statusFilters.map((f) => (
              <option key={f} value={f}>{f === "All" ? "All Approved" : f}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-b border-gray-100 bg-gray-50/50">
                {["User", "Preview", "Submission Date", "Status", "Votes", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                        <Image src={s.image} alt="submission" width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-gray-600 line-clamp-2 max-w-[180px]">{s.content}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{s.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${submissionStatusStyle[s.status]}`}>
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-semibold">{s.votes}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setModalItem(s)} className="w-7 h-7 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-50">
                        <Eye className="w-4 h-4" />
                      </button>
                      {s.status === "Pending" && (
                        <>
                          <button onClick={() => handleApprove(s.id)} className="w-7 h-7 rounded-full flex items-center justify-center text-green-500 hover:bg-green-50">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleReject(s.id)} className="w-7 h-7 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submission Detail Modal */}
      {modalItem && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setModalItem(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Submission Details</h3>
              <button onClick={() => setModalItem(null)} className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <div className="w-full h-52 rounded-xl overflow-hidden mb-5">
                <Image src={modalItem.image} alt="submission" width={500} height={220} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Submitted by</p>
                  <p className="text-sm font-medium text-gray-900">{modalItem.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Content</p>
                  <p className="text-sm text-gray-700">{modalItem.content}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Submission Date</p>
                  <p className="text-sm text-gray-700">{modalItem.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Total Votes</p>
                  <p className="text-sm font-bold text-gray-900">{modalItem.votes}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 px-6 pb-6">
              <button onClick={() => handleApprove(modalItem.id)} className="flex items-center justify-center gap-2 h-11 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm">
                <Check className="w-4 h-4" /> Approve
              </button>
              <button onClick={() => handleReject(modalItem.id)} className="flex items-center justify-center gap-2 h-11 rounded-xl bg-[#A01C1C] hover:bg-[#851717] text-white font-semibold text-sm">
                <X className="w-4 h-4" /> Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── VOTING RESULTS TAB ───────────────────────────────────── */
function VotingResultsTab() {
  const totalVotes = LEADERBOARD.reduce((sum, e) => sum + e.votes, 0);

  const votingStats = [
    { label: "Total Votes",         value: "5,420", icon: TrendingUp,  iconBg: "bg-blue-50",   iconColor: "text-blue-500"   },
    { label: "Submissions",         value: "20",    icon: FileText,    iconBg: "bg-green-50",  iconColor: "text-green-500"  },
    { label: "Avg. Votes Per Entry", value: "31",   icon: BarChart2,   iconBg: "bg-purple-50", iconColor: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-bold text-gray-900">Voting Results</h3>
          <p className="text-xs text-gray-400 mt-0.5">Total votes: 122</p>
        </div>
        <button className="flex items-center gap-2 bg-[#A01C1C] hover:bg-[#851717] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <Download className="w-4 h-4" /> Export Results
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {votingStats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <span className="text-sm text-gray-500 font-medium">{label}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-5">Leaderboard</h3>
        <div className="space-y-4">
          {LEADERBOARD.map((entry) => {
            const pct = Math.round((entry.votes / totalVotes) * 100);
            return (
              <div key={entry.id} className="flex items-center gap-4">
                <div className="w-8 text-center text-sm font-bold text-gray-500 shrink-0">
                  {typeof rankEmoji(entry.rank) === "string" && entry.rank <= 3
                    ? <span className="text-lg">{rankEmoji(entry.rank)}</span>
                    : <span>{entry.rank}</span>
                  }
                </div>
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                  <Image src={entry.image} alt={entry.name} width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{entry.name}</p>
                  <p className="text-xs text-gray-400 truncate">{entry.caption}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[11px] text-gray-400 shrink-0">{pct}% of total votes</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-black text-gray-900">{entry.votes}</p>
                  <p className="text-[11px] text-gray-400">votes</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3">
        <p className="text-xs text-blue-600">
          <span className="font-bold">Live Results:</span> These results are updated in real-time as participants vote. Final results will be locked when the contest ends.
        </p>
      </div>
    </div>
  );
}

/* ─── WINNER MANAGEMENT TAB ────────────────────────────────── */
function WinnerTab() {
  const [published, setPublished]   = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const votingStats = [
    { label: "Total Votes",         value: "5,420", icon: TrendingUp,  iconBg: "bg-blue-50",   iconColor: "text-blue-500"   },
    { label: "Submissions",         value: "20",    icon: FileText,    iconBg: "bg-green-50",  iconColor: "text-green-500"  },
    { label: "Avg. Votes Per Entry", value: "31",   icon: BarChart2,   iconBg: "bg-purple-50", iconColor: "text-purple-500" },
  ];

  const totalVotes = LEADERBOARD.reduce((sum, e) => sum + e.votes, 0);
  const winner = LEADERBOARD[0];

  return (
    <>
      <div className="space-y-6">
        {/* Header row */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-bold text-gray-900">Winner Management</h3>
            <p className="text-xs text-gray-400 mt-0.5">Confirm the winner based on voting results</p>
          </div>
          <button className="flex items-center gap-2 bg-[#A01C1C] hover:bg-[#851717] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export Results
          </button>
        </div>

        {published ? (
          /* ── Published state ── */
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-5">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-green-700">Results Published</p>
                <p className="text-xs text-green-600 mt-0.5">The contest results have been published and winners have been notified.</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {votingStats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
                <div key={label} className="border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{label}</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            {/* Leaderboard */}
            <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-5">Leaderboard</h3>
              <div className="space-y-3">
                {LEADERBOARD.slice(0, 3).map((entry) => {
                  const pct = Math.round((entry.votes / totalVotes) * 100);
                  const isWinner = entry.id === winner.id;
                  return (
                    <div key={entry.id} className={cn(
                      "flex items-center gap-4 p-3 rounded-xl",
                      isWinner ? "bg-yellow-50 border border-yellow-100" : ""
                    )}>
                      <div className="w-8 text-center text-lg shrink-0">
                        {rankEmoji(entry.rank)}
                      </div>
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                        <Image src={entry.image} alt={entry.name} width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{entry.name}</p>
                        <p className="text-xs text-gray-400 truncate">{entry.caption}</p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[11px] text-gray-400 shrink-0">{pct}% of total votes</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <p className="text-base font-black text-gray-900">{entry.votes}</p>
                          <p className="text-[11px] text-gray-400">votes</p>
                        </div>
                        {isWinner && (
                          <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-white text-[11px] font-bold">Winner</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm shadow-sm transition-colors"
            >
              <Trophy className="w-4 h-4" /> Confirm Winner & Publish Results
            </button>
          </>
        )}
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowConfirm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Confirm & Publish Results</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to publish the results? This action will:</p>
            <ul className="space-y-1.5 mb-6">
              {[
                "Mark the contest as completed",
                "Notify all winners via email",
                "Make results visible to all participants",
                "This action cannot be undone",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="h-11 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { setPublished(true); setShowConfirm(false); }}
                className="h-11 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold"
              >
                Confirm & Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}