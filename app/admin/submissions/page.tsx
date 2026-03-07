"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search, Filter, Eye, Check, X, Download,
  CheckCircle2, Clock, XCircle, ImageIcon, FileText, BarChart2,
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
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ─── TYPES ────────────────────────────────────────────────────
type SubmissionStatus = "Approved" | "Pending" | "Rejected";
type ContestType      = "Giveaway" | "Submissions" | "Poll";

interface Submission {
  id: number;
  userName: string;
  userEmail: string;
  contestTitle: string;
  contestType: ContestType;
  image?: string;
  content: string;
  submittedAt: string;
  status: SubmissionStatus;
  votes?: number;
}

// ─── MOCK DATA ─────────────────────────────────────────────────
const SUBMISSIONS: Submission[] = [
  { id: 1,  userName: "Sarah Johnson",  userEmail: "sarah.j@email.com",  contestTitle: "Best Travel Photo Contest",    contestType: "Submissions", image: "/images/contest2.jpg", content: "Beautiful sunset photograph from my recent beach trip",       submittedAt: "2/5/2026, 10:25 PM", status: "Approved", votes: 42 },
  { id: 2,  userName: "Michael Chen",   userEmail: "m.chen@email.com",   contestTitle: "Best Travel Photo Contest",    contestType: "Submissions", image: "/images/contest3.jpg", content: "Mountain landscape during golden hour",                       submittedAt: "2/5/2026, 11:10 PM", status: "Pending",  votes: 18 },
  { id: 3,  userName: "Emily Davis",    userEmail: "emily.d@email.com",  contestTitle: "Win a Free Product Bundle",    contestType: "Giveaway",                                  content: "Followed page, liked post and tagged 2 friends",              submittedAt: "2/6/2026, 9:00 AM",  status: "Approved"           },
  { id: 4,  userName: "James Wilson",   userEmail: "j.wilson@email.com", contestTitle: "Community Choice Awards",      contestType: "Poll",                                       content: "Voted for: Dark Mode",                                         submittedAt: "2/6/2026, 9:45 AM",  status: "Approved"           },
  { id: 5,  userName: "Aisha Patel",    userEmail: "aisha.p@email.com",  contestTitle: "Best Travel Photo Contest",    contestType: "Submissions", image: "/images/contest1.jpg", content: "Colorful street market in Bangkok",                           submittedAt: "2/6/2026, 10:20 AM", status: "Rejected", votes: 5  },
  { id: 6,  userName: "Lucas Martin",   userEmail: "lucas.m@email.com",  contestTitle: "Community Choice Awards",      contestType: "Poll",                                       content: "Voted for: Mobile App",                                        submittedAt: "2/6/2026, 11:00 AM", status: "Pending"            },
  { id: 7,  userName: "Priya Sharma",   userEmail: "priya.s@email.com",  contestTitle: "Win a Free Product Bundle",    contestType: "Giveaway",                                  content: "Completed all tasks — followed, liked and tagged friends",     submittedAt: "2/6/2026, 12:15 PM", status: "Pending"            },
  { id: 8,  userName: "Omar Hassan",    userEmail: "omar.h@email.com",   contestTitle: "Best Travel Photo Contest",    contestType: "Submissions", image: "/images/contest2.jpg", content: "Sunset over the Sahara desert",                               submittedAt: "2/6/2026, 1:30 PM",  status: "Approved", votes: 31 },
  { id: 9,  userName: "Chloe Nguyen",   userEmail: "chloe.n@email.com",  contestTitle: "Community Choice Awards",      contestType: "Poll",                                       content: "Voted for: API Integration",                                   submittedAt: "2/6/2026, 2:00 PM",  status: "Approved"           },
  { id: 10, userName: "Daniel Brown",   userEmail: "d.brown@email.com",  contestTitle: "Win a Premium Gaming Setup",   contestType: "Giveaway",                                  content: "Followed page and tagged 2 friends in the comments",           submittedAt: "2/6/2026, 3:10 PM",  status: "Rejected"           },
];

// ─── STYLE MAPS ────────────────────────────────────────────────
const statusStyle: Record<SubmissionStatus, string> = {
  Approved: "bg-green-50 text-green-600 border-green-100",
  Pending:  "bg-yellow-50 text-yellow-600 border-yellow-100",
  Rejected: "bg-red-50 text-red-500 border-red-100",
};

const typeStyle: Record<ContestType, string> = {
  Submissions: "bg-blue-50 text-blue-600 border-blue-100",
  Giveaway:    "bg-purple-50 text-purple-600 border-purple-100",
  Poll:        "bg-orange-50 text-orange-600 border-orange-100",
};

const typeIcon: Record<ContestType, React.ReactNode> = {
  Submissions: <ImageIcon  className="w-3 h-3" />,
  Giveaway:    <CheckCircle2 className="w-3 h-3" />,
  Poll:        <BarChart2  className="w-3 h-3" />,
};

// ─── MAIN PAGE ─────────────────────────────────────────────────
export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>(SUBMISSIONS);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter]     = useState<string>("All");
  const [contestFilter, setContestFilter] = useState<string>("All");
  const [modalItem, setModalItem]       = useState<Submission | null>(null);

  // ── derived ──
  const contests = Array.from(new Set(SUBMISSIONS.map((s) => s.contestTitle)));

  const filtered = submissions.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch =
      s.userName.toLowerCase().includes(q) ||
      s.userEmail.toLowerCase().includes(q) ||
      s.contestTitle.toLowerCase().includes(q);
    const matchStatus  = statusFilter  === "All" || s.status       === statusFilter;
    const matchType    = typeFilter    === "All" || s.contestType   === typeFilter;
    const matchContest = contestFilter === "All" || s.contestTitle  === contestFilter;
    return matchSearch && matchStatus && matchType && matchContest;
  });

  // ── stat counts ──
  const total    = submissions.length;
  const pending  = submissions.filter((s) => s.status === "Pending").length;
  const approved = submissions.filter((s) => s.status === "Approved").length;
  const rejected = submissions.filter((s) => s.status === "Rejected").length;

  // ── actions ──
  const updateStatus = (id: number, status: SubmissionStatus) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
    if (modalItem?.id === id) {
      setModalItem((prev) => prev ? { ...prev, status } : null);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Submissions</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Review and manage all contest submissions
          </p>
        </div>
        <Button
          className="bg-[#A01C1C] hover:bg-[#851717] text-white gap-2 shadow-sm"
        >
          <Download className="w-4 h-4" /> Export All
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total",    value: total,    icon: FileText,     bg: "bg-gray-50",   color: "text-gray-500",   border: "border-gray-100" },
          { label: "Pending",  value: pending,  icon: Clock,        bg: "bg-yellow-50", color: "text-yellow-500", border: "border-yellow-100" },
          { label: "Approved", value: approved, icon: CheckCircle2, bg: "bg-green-50",  color: "text-green-500",  border: "border-green-100" },
          { label: "Rejected", value: rejected, icon: XCircle,      bg: "bg-red-50",    color: "text-red-500",    border: "border-red-100" },
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
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="Search by name, email or contest..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-[#A01C1C]/20 focus-visible:border-[#A01C1C] h-10"
              />
            </div>

            {/* Status filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px] h-10 bg-gray-50 border-gray-200 text-sm">
                <Filter className="w-3.5 h-3.5 text-gray-400 mr-1" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {["All", "Pending", "Approved", "Rejected"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[150px] h-10 bg-gray-50 border-gray-200 text-sm">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {["All", "Submissions", "Giveaway", "Poll"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Contest filter */}
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
              <CardTitle className="text-sm font-bold text-gray-900">
                All Submissions
              </CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Showing {filtered.length} of {total} submissions
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/60 hover:bg-gray-50/60 border-gray-100">
                {["User", "Contest", "Preview", "Submitted At", "Status", "Actions"].map((h) => (
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
                    No submissions found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((s) => (
                  <TableRow key={s.id} className="border-gray-50 hover:bg-gray-50/40 transition-colors">

                    {/* User */}
                    <TableCell className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{s.userName}</p>
                      <p className="text-xs text-gray-400">{s.userEmail}</p>
                    </TableCell>

                    {/* Contest */}
                    <TableCell className="px-6 py-4">
                      <p className="text-xs font-medium text-gray-700 max-w-[160px] truncate">
                        {s.contestTitle}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "mt-1 text-[10px] font-semibold gap-1 px-1.5 py-0",
                          typeStyle[s.contestType]
                        )}
                      >
                        {typeIcon[s.contestType]}
                        {s.contestType}
                      </Badge>
                    </TableCell>

                    {/* Preview */}
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {s.image ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                            <Image
                              src={s.image}
                              alt="submission"
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-gray-300" />
                          </div>
                        )}
                        <span className="text-xs text-gray-500 line-clamp-2 max-w-[160px]">
                          {s.content}
                        </span>
                      </div>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {s.submittedAt}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[11px] font-bold px-2.5 py-1",
                          statusStyle[s.status]
                        )}
                      >
                        {s.status.toUpperCase()}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setModalItem(s)}
                          className="w-8 h-8 rounded-full text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {s.status === "Pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateStatus(s.id, "Approved")}
                              className="w-8 h-8 rounded-full text-green-500 hover:bg-green-50 hover:text-green-600"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateStatus(s.id, "Rejected")}
                              className="w-8 h-8 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
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
            <DialogTitle className="text-base font-bold">Submission Details</DialogTitle>
          </DialogHeader>

          {modalItem && (
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">

              {/* Image preview */}
              {modalItem.image && (
                <div className="w-full h-52 rounded-xl overflow-hidden border border-gray-100">
                  <Image
                    src={modalItem.image}
                    alt="submission"
                    width={500}
                    height={220}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Info rows */}
              <div className="space-y-3">
                {[
                  { label: "Submitted by", value: modalItem.userName    },
                  { label: "Email",         value: modalItem.userEmail   },
                  { label: "Contest",       value: modalItem.contestTitle },
                  { label: "Content",       value: modalItem.content      },
                  { label: "Submitted At",  value: modalItem.submittedAt  },
                  ...(modalItem.votes !== undefined
                    ? [{ label: "Total Votes", value: String(modalItem.votes) }]
                    : []),
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                    <p className="text-sm text-gray-800 font-medium">{value}</p>
                  </div>
                ))}

                {/* Status badge */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[11px] font-bold px-2.5 py-1",
                      statusStyle[modalItem.status]
                    )}
                  >
                    {modalItem.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Modal actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => updateStatus(modalItem.id, "Approved")}
                  disabled={modalItem.status === "Approved"}
                  className="h-11 bg-green-500 hover:bg-green-600 text-white font-semibold disabled:opacity-40"
                >
                  <Check className="w-4 h-4 mr-2" /> Approve
                </Button>
                <Button
                  onClick={() => updateStatus(modalItem.id, "Rejected")}
                  disabled={modalItem.status === "Rejected"}
                  className="h-11 bg-[#A01C1C] hover:bg-[#851717] text-white font-semibold disabled:opacity-40"
                >
                  <X className="w-4 h-4 mr-2" /> Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}