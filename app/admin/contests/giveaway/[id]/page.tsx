"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft, Pencil, Download, Search, Eye, Check, X,
  Users, FileText, Clock, CheckCircle2, Info, Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── TYPES ────────────────────────────────────────────────────
type Tab = "overview" | "participants" | "submissions" | "winner";

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
  status: "Approved" | "Pending" | "Rejected";
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
  status: i === 1 ? "Pending" : "Approved",
}));

const APPROVED_PARTICIPANTS = PARTICIPANTS.filter((_, i) => i < 7);

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

// ─── MAIN PAGE ─────────────────────────────────────────────────
export default function ContestDetailPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview",      label: "Overview"          },
    { key: "participants",  label: "Participants"       },
    { key: "submissions",   label: "Submissions"        },
    { key: "winner",        label: "Winner Management"  },
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
            <span className="px-2.5 py-0.5 rounded text-xs font-bold border border-green-200 text-green-600 bg-green-50 uppercase tracking-wide">
              Active
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold border border-purple-200 text-purple-600 bg-purple-50 uppercase tracking-wide">
              Giveaway
            </span>
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

      {/* Tab Content */}
      {activeTab === "overview"     && <OverviewTab />}
      {activeTab === "participants" && <ParticipantsTab />}
      {activeTab === "submissions"  && <SubmissionsTab />}
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
              Complete simple tasks to enter our giveaway and win a premium product bundle worth $500!
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Rules & Guidelines</p>
            <p className="text-sm text-gray-700">Must complete all tasks. Winner will be selected randomly.</p>
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
        </div>
      </div>

      {/* Task Instructions */}
      <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-4">Task Instructions</h3>
        <p className="text-sm text-gray-700 mb-5">
          Follow our Facebook page, like the post, and tag 2 friends in the comments.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Number of Winners</p>
            <p className="text-sm font-bold text-gray-900">3</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Max Submissions Per User</p>
            <p className="text-sm font-bold text-gray-900">1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PARTICIPANTS TAB ─────────────────────────────────────── */
function ParticipantsTab() {
  const [search, setSearch] = useState("");

  const filtered = PARTICIPANTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">Participants</h3>
          <p className="text-xs text-gray-400 mt-0.5">Total Number: {PARTICIPANTS.length}</p>
        </div>
        <button className="flex items-center gap-2 bg-[#A01C1C] hover:bg-[#851717] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Search */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-b border-gray-100 bg-gray-50/50">
              {["Participant", "Email", "Join Date", "Submissions", "Status", "Actions"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {h}
                </th>
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
                  <button className="text-[#A01C1C] text-xs font-semibold hover:underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── SUBMISSIONS TAB ──────────────────────────────────────── */
function SubmissionsTab() {
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [submissions, setSubmissions]   = useState<Submission[]>(SUBMISSIONS);
  const [modalItem, setModalItem]       = useState<Submission | null>(null);

  const statusFilters = ["All", "Approved", "Pending", "Rejected"];

  const filtered = submissions.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleApprove = (id: number) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Approved" } : s))
    );
    setModalItem(null);
  };

  const handleReject = (id: number) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Rejected" } : s))
    );
    setModalItem(null);
  };

  return (
    <>
      <div className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">Participants</h3>
            <p className="text-xs text-gray-400 mt-0.5">Total Number: {submissions.length}</p>
          </div>
          <button className="flex items-center gap-2 bg-[#A01C1C] hover:bg-[#851717] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Search + Filter */}
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-b border-gray-100 bg-gray-50/50">
                {["User", "Preview", "Submission Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  {/* User */}
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.email}</p>
                  </td>
                  {/* Preview */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                        <Image src={s.image} alt="submission" width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-gray-600 line-clamp-2 max-w-[180px]">{s.content}</span>
                    </div>
                  </td>
                  {/* Date */}
                  <td className="px-6 py-4 text-gray-500 text-xs">{s.date}</td>
                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${submissionStatusStyle[s.status]}`}>
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalItem(s)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {s.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(s.id)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-green-500 hover:bg-green-50 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(s.id)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                          >
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
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setModalItem(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Submission Details</h3>
              <button
                onClick={() => setModalItem(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal body */}
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
              </div>
            </div>

            {/* Modal actions */}
            <div className="grid grid-cols-2 gap-3 px-6 pb-6">
              <button
                onClick={() => handleApprove(modalItem.id)}
                className="flex items-center justify-center gap-2 h-11 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors"
              >
                <Check className="w-4 h-4" /> Approve
              </button>
              <button
                onClick={() => handleReject(modalItem.id)}
                className="flex items-center justify-center gap-2 h-11 rounded-xl bg-[#A01C1C] hover:bg-[#851717] text-white font-semibold text-sm transition-colors"
              >
                <X className="w-4 h-4" /> Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── WINNER MANAGEMENT TAB ────────────────────────────────── */
function WinnerTab() {
  const NUMBER_OF_WINNERS = 3;
  const [selected, setSelected]   = useState<number[]>([]);
  const [search, setSearch]        = useState("");
  const [published, setPublished]  = useState(false);

  const filtered = APPROVED_PARTICIPANTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: number) => {
    if (selected.includes(id)) {
      setSelected((prev) => prev.filter((s) => s !== id));
    } else if (selected.length < NUMBER_OF_WINNERS) {
      setSelected((prev) => [...prev, id]);
    }
  };

  const handlePublish = () => {
    if (selected.length === NUMBER_OF_WINNERS) {
      setPublished(true);
    }
  };

  return (
    <div className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h3 className="text-base font-bold text-gray-900">Winner Management</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Select {NUMBER_OF_WINNERS} winner(s) from approved participants
        </p>
      </div>

      {published ? (
        /* ── Published state ── */
        <div className="px-6 pb-6">
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-5">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-green-700">Results Published</p>
              <p className="text-xs text-green-600 mt-0.5">
                The contest results have been published and winners have been notified.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ── Selection state ── */
        <>
          {/* Info banner */}
          <div className="px-6 pb-4">
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-blue-800">Manual Winner Selection</p>
                <p className="text-xs text-blue-600 mt-0.5">
                  Select {NUMBER_OF_WINNERS} winner(s) from the list of approved participants below.
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="px-6 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search participants by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 h-10 rounded-xl border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#A01C1C]/20 focus:border-[#A01C1C]"
              />
            </div>
          </div>

          {/* Selected count badge */}
          {selected.length > 0 && (
            <div className="px-6 pb-3">
              <span className="text-xs font-semibold text-[#A01C1C] bg-red-50 px-3 py-1.5 rounded-full">
                {selected.length} / {NUMBER_OF_WINNERS} selected
              </span>
            </div>
          )}

          {/* Participant List */}
          <div className="px-6 pb-4">
            <p className="text-sm font-bold text-gray-800 mb-3">Approved Participants</p>
            <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
              {filtered.map((p) => {
                const isSelected  = selected.includes(p.id);
                const isDisabled  = !isSelected && selected.length >= NUMBER_OF_WINNERS;

                return (
                  <div
                    key={p.id}
                    onClick={() => !isDisabled && toggleSelect(p.id)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3.5 transition-colors",
                      isSelected  ? "bg-red-50/60 cursor-pointer" : "",
                      isDisabled  ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* Custom checkbox */}
                      <div className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                        isSelected
                          ? "bg-[#A01C1C] border-[#A01C1C]"
                          : "border-gray-300"
                      )}>
                        {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>Completed all tasks</span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Publish button */}
          <div className="px-6 pb-6">
            <button
              onClick={handlePublish}
              disabled={selected.length !== NUMBER_OF_WINNERS}
              className={cn(
                "w-full flex items-center justify-center gap-2 h-12 rounded-xl font-semibold text-sm text-white transition-all",
                selected.length === NUMBER_OF_WINNERS
                  ? "bg-green-500 hover:bg-green-600 shadow-sm"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              <Trophy className="w-4 h-4" /> Confirm Winner & Publish Results
            </button>
            {selected.length < NUMBER_OF_WINNERS && (
              <p className="text-center text-xs text-gray-400 mt-2">
                Select {NUMBER_OF_WINNERS - selected.length} more winner(s) to publish
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}