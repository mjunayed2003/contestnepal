"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search, Filter, Eye, Download, Users, UserCheck,
  UserX, Clock, Trophy, FileText, X, ChevronDown,
} from "lucide-react";

import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Badge }    from "@/components/ui/badge";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Progress }  from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// ─── TYPES ────────────────────────────────────────────────────
type ParticipantStatus = "Submitted" | "Approved" | "Pending";
type ContestType       = "Giveaway" | "Submissions" | "Poll";

interface Submission {
  id: number;
  image?: string;
  content: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
  votes?: number;
}

interface Participant {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  contestTitle: string;
  contestType: ContestType;
  joinDate: string;
  submissions: number;
  maxSubmissions: number;
  status: ParticipantStatus;
  submissionList: Submission[];
}

// ─── MOCK DATA ─────────────────────────────────────────────────
const PARTICIPANTS: Participant[] = [
  {
    id: 1, name: "Sarah Johnson",  email: "sarah.j@email.com",
    contestTitle: "Best Travel Photo Contest",  contestType: "Submissions",
    joinDate: "2/5/2026", submissions: 2, maxSubmissions: 2, status: "Submitted",
    submissionList: [
      { id: 1, image: "/images/contest2.jpg", content: "Beautiful sunset photograph from my recent beach trip", date: "2/5/2026, 10:25 PM", status: "Approved", votes: 42 },
      { id: 2, image: "/images/contest3.jpg", content: "Mountain landscape during golden hour",                 date: "2/5/2026, 11:00 PM", status: "Pending",  votes: 18 },
    ],
  },
  {
    id: 2, name: "Michael Chen",   email: "m.chen@email.com",
    contestTitle: "Win a Free Product Bundle",  contestType: "Giveaway",
    joinDate: "2/5/2026", submissions: 1, maxSubmissions: 1, status: "Approved",
    submissionList: [
      { id: 1, content: "Followed page, liked post and tagged 2 friends in the comments", date: "2/5/2026, 9:10 AM", status: "Approved" },
    ],
  },
  {
    id: 3, name: "Emily Davis",    email: "emily.d@email.com",
    contestTitle: "Community Choice Awards",    contestType: "Poll",
    joinDate: "2/6/2026", submissions: 1, maxSubmissions: 1, status: "Approved",
    submissionList: [
      { id: 1, content: "Voted for: Dark Mode", date: "2/6/2026, 9:45 AM", status: "Approved" },
    ],
  },
  {
    id: 4, name: "James Wilson",   email: "j.wilson@email.com",
    contestTitle: "Best Travel Photo Contest",  contestType: "Submissions",
    joinDate: "2/6/2026", submissions: 1, maxSubmissions: 2, status: "Pending",
    submissionList: [
      { id: 1, image: "/images/contest1.jpg", content: "Colorful street market in Bangkok", date: "2/6/2026, 10:20 AM", status: "Pending", votes: 5 },
    ],
  },
  {
    id: 5, name: "Aisha Patel",    email: "aisha.p@email.com",
    contestTitle: "Win a Premium Gaming Setup", contestType: "Giveaway",
    joinDate: "2/6/2026", submissions: 1, maxSubmissions: 1, status: "Submitted",
    submissionList: [
      { id: 1, content: "Followed page and tagged 2 friends in the comments", date: "2/6/2026, 11:00 AM", status: "Approved" },
    ],
  },
  {
    id: 6, name: "Lucas Martin",   email: "lucas.m@email.com",
    contestTitle: "Best Travel Photo Contest",  contestType: "Submissions",
    joinDate: "2/6/2026", submissions: 2, maxSubmissions: 2, status: "Approved",
    submissionList: [
      { id: 1, image: "/images/contest2.jpg", content: "Sunset over the Sahara desert",    date: "2/6/2026, 1:30 PM", status: "Approved", votes: 31 },
      { id: 2, image: "/images/contest3.jpg", content: "Rainy streets of Tokyo at night",  date: "2/6/2026, 2:00 PM", status: "Approved", votes: 27 },
    ],
  },
  {
    id: 7, name: "Priya Sharma",   email: "priya.s@email.com",
    contestTitle: "Community Choice Awards",    contestType: "Poll",
    joinDate: "2/6/2026", submissions: 1, maxSubmissions: 1, status: "Pending",
    submissionList: [
      { id: 1, content: "Voted for: Mobile App", date: "2/6/2026, 3:10 PM", status: "Pending" },
    ],
  },
  {
    id: 8, name: "Omar Hassan",    email: "omar.h@email.com",
    contestTitle: "Win a Free Product Bundle",  contestType: "Giveaway",
    joinDate: "2/7/2026", submissions: 1, maxSubmissions: 1, status: "Submitted",
    submissionList: [
      { id: 1, content: "Completed all required tasks successfully", date: "2/7/2026, 8:45 AM", status: "Approved" },
    ],
  },
  {
    id: 9, name: "Chloe Nguyen",   email: "chloe.n@email.com",
    contestTitle: "Best Travel Photo Contest",  contestType: "Submissions",
    joinDate: "2/7/2026", submissions: 1, maxSubmissions: 2, status: "Pending",
    submissionList: [
      { id: 1, image: "/images/contest1.jpg", content: "Hidden waterfall in New Zealand", date: "2/7/2026, 10:00 AM", status: "Pending", votes: 9 },
    ],
  },
  {
    id: 10, name: "Daniel Brown",  email: "d.brown@email.com",
    contestTitle: "Win a Premium Gaming Setup", contestType: "Giveaway",
    joinDate: "2/7/2026", submissions: 1, maxSubmissions: 1, status: "Approved",
    submissionList: [
      { id: 1, content: "Followed and tagged friends as required", date: "2/7/2026, 11:30 AM", status: "Approved" },
    ],
  },
];

// ─── STYLE MAPS ────────────────────────────────────────────────
const participantStatusStyle: Record<ParticipantStatus, string> = {
  Submitted: "bg-blue-50 text-blue-600 border-blue-100",
  Approved:  "bg-green-50 text-green-600 border-green-100",
  Pending:   "bg-yellow-50 text-yellow-600 border-yellow-100",
};

const subStatusStyle: Record<string, string> = {
  Approved: "bg-green-50 text-green-600 border-green-100",
  Pending:  "bg-yellow-50 text-yellow-600 border-yellow-100",
  Rejected: "bg-red-50 text-red-500 border-red-100",
};

const typeStyle: Record<ContestType, string> = {
  Submissions: "bg-blue-50 text-blue-600 border-blue-100",
  Giveaway:    "bg-purple-50 text-purple-600 border-purple-100",
  Poll:        "bg-orange-50 text-orange-600 border-orange-100",
};

// ─── MAIN PAGE ─────────────────────────────────────────────────
export default function AdminParticipantsPage() {
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter]     = useState("All");
  const [contestFilter, setContestFilter] = useState("All");
  const [modalItem, setModalItem]       = useState<Participant | null>(null);

  const contests = Array.from(new Set(PARTICIPANTS.map((p) => p.contestTitle)));

  const filtered = PARTICIPANTS.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch  = p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.contestTitle.toLowerCase().includes(q);
    const matchStatus  = statusFilter  === "All" || p.status       === statusFilter;
    const matchType    = typeFilter    === "All" || p.contestType   === typeFilter;
    const matchContest = contestFilter === "All" || p.contestTitle  === contestFilter;
    return matchSearch && matchStatus && matchType && matchContest;
  });

  // stat counts
  const total     = PARTICIPANTS.length;
  const submitted = PARTICIPANTS.filter((p) => p.status === "Submitted").length;
  const approved  = PARTICIPANTS.filter((p) => p.status === "Approved").length;
  const pending   = PARTICIPANTS.filter((p) => p.status === "Pending").length;

  return (
    <div className="min-h-screen bg-white p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Participants</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage all contest participants across every contest
          </p>
        </div>
        <Button className="bg-[#A01C1C] hover:bg-[#851717] text-white gap-2 shadow-sm">
          <Download className="w-4 h-4" /> Export All
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total",     value: total,     icon: Users,     bg: "bg-gray-50",   color: "text-gray-500",   border: "border-gray-100"   },
          { label: "Submitted", value: submitted, icon: FileText,  bg: "bg-blue-50",   color: "text-blue-500",   border: "border-blue-100"   },
          { label: "Approved",  value: approved,  icon: UserCheck, bg: "bg-green-50",  color: "text-green-500",  border: "border-green-100"  },
          { label: "Pending",   value: pending,   icon: Clock,     bg: "bg-yellow-50", color: "text-yellow-500", border: "border-yellow-100" },
        ].map(({ label, value, icon: Icon, bg, color, border }) => (
          <Card key={label} className={`border ${border} shadow-sm`}>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-400 font-medium">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-gray-100 shadow-sm mb-6">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="Search by name, email or contest..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-[#A01C1C]/20 focus-visible:border-[#A01C1C] h-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[145px] h-10 bg-gray-50 border-gray-200 text-sm">
                <Filter className="w-3.5 h-3.5 text-gray-400 mr-1" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {["All", "Submitted", "Approved", "Pending"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[150px] h-10 bg-gray-50 border-gray-200 text-sm">
                <SelectValue placeholder="Contest Type" />
              </SelectTrigger>
              <SelectContent>
                {["All", "Submissions", "Giveaway", "Poll"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={contestFilter} onValueChange={setContestFilter}>
              <SelectTrigger className="w-full sm:w-[200px] h-10 bg-gray-50 border-gray-200 text-sm">
                <SelectValue placeholder="Contest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Contests</SelectItem>
                {contests.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="pb-0 pt-5 px-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold text-gray-900">All Participants</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Showing {filtered.length} of {total} participants
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/60 hover:bg-gray-50/60 border-gray-100">
                {["Participant", "Contest", "Join Date", "Submissions", "Status", "Actions"].map((h) => (
                  <TableHead
                    key={h}
                    className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide px-6"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-16 text-gray-400 text-sm">
                    No participants found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p) => (
                  <TableRow key={p.id} className="border-gray-50 hover:bg-gray-50/40 transition-colors">

                    {/* Participant */}
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#A01C1C]/10 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-[#A01C1C]">
                            {p.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Contest */}
                    <TableCell className="px-6 py-4">
                      <p className="text-xs font-medium text-gray-700 max-w-[160px] truncate">
                        {p.contestTitle}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn("mt-1 text-[10px] font-semibold px-1.5 py-0", typeStyle[p.contestType])}
                      >
                        {p.contestType}
                      </Badge>
                    </TableCell>

                    {/* Join Date */}
                    <TableCell className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {p.joinDate}
                    </TableCell>

                    {/* Submissions */}
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">
                          {p.submissions}
                          <span className="text-gray-400 font-normal">/{p.maxSubmissions}</span>
                        </span>
                      </div>
                      <Progress
                        value={(p.submissions / p.maxSubmissions) * 100}
                        className="h-1 w-16 mt-1.5"
                      />
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={cn("text-[11px] font-bold px-2.5 py-1", participantStatusStyle[p.status])}
                      >
                        {p.status.toUpperCase()}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-6 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setModalItem(p)}
                        className="text-[#A01C1C] text-xs font-semibold hover:bg-red-50 hover:text-[#A01C1C] h-8 px-3"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1.5" /> View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Detail Modal */}
      <Dialog open={!!modalItem} onOpenChange={() => setModalItem(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-5 pb-4 border-b border-gray-100">
            <DialogTitle className="text-base font-bold">Participant Details</DialogTitle>
          </DialogHeader>

          {modalItem && (
            <div className="max-h-[75vh] overflow-y-auto">
              <div className="p-6 space-y-5">

                {/* Profile */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-14 h-14 rounded-full bg-[#A01C1C]/10 flex items-center justify-center shrink-0">
                    <span className="text-2xl font-black text-[#A01C1C]">
                      {modalItem.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-gray-900 truncate">{modalItem.name}</p>
                    <p className="text-sm text-gray-400 truncate">{modalItem.email}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] font-bold px-2 py-0.5", participantStatusStyle[modalItem.status])}
                      >
                        {modalItem.status.toUpperCase()}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] font-semibold px-2 py-0.5", typeStyle[modalItem.contestType])}
                      >
                        {modalItem.contestType}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Stat mini cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                    <p className="text-2xl font-black text-blue-600">{modalItem.submissions}</p>
                    <p className="text-[11px] text-blue-400 font-medium mt-0.5">Submissions</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                    <p className="text-2xl font-black text-green-600">
                      {modalItem.submissionList.filter((s) => s.status === "Approved").length}
                    </p>
                    <p className="text-[11px] text-green-400 font-medium mt-0.5">Approved</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                    <p className="text-2xl font-black text-yellow-600">
                      {modalItem.submissionList.filter((s) => s.status === "Pending").length}
                    </p>
                    <p className="text-[11px] text-yellow-400 font-medium mt-0.5">Pending</p>
                  </div>
                </div>

                {/* Info rows */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Trophy className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">Contest</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 text-right max-w-[180px] truncate">
                      {modalItem.contestTitle}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">Joined Date</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{modalItem.joinDate}</span>
                  </div>
                </div>

                <Separator />

                {/* Submission History */}
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    Submission History
                  </h4>
                  <div className="space-y-3">
                    {modalItem.submissionList.map((sub, idx) => (
                      <div
                        key={sub.id}
                        className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        {sub.image ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                            <Image
                              src={sub.image}
                              alt="submission"
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-gray-300" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-600 line-clamp-2">{sub.content}</p>
                          <p className="text-[11px] text-gray-400 mt-1">{sub.date}</p>
                          {sub.votes !== undefined && (
                            <p className="text-[11px] text-blue-500 font-medium mt-0.5">
                              {sub.votes} votes
                            </p>
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] font-bold px-2 py-0.5 shrink-0", subStatusStyle[sub.status])}
                        >
                          {sub.status.toUpperCase()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="px-6 pb-6">
                <Button
                  variant="outline"
                  onClick={() => setModalItem(null)}
                  className="w-full h-11 border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}