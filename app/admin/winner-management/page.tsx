"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Trophy, Crown, Medal, Search, Filter, Download,
  CheckCircle2, Clock, AlertCircle, Eye, Send,
  RotateCcw, Sparkles, Users, BarChart2, X, Check,
} from "lucide-react";

import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Badge }    from "@/components/ui/badge";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ─── TYPES ────────────────────────────────────────────────────
type ContestType    = "Giveaway" | "Submissions" | "Poll";
type ResultStatus   = "Published" | "Pending" | "Draft";

interface Winner {
  id: number;
  name: string;
  email: string;
  prize: string;
  submission?: string;
  submissionImage?: string;
  votes?: number;
  rank: number;
}

interface ContestResult {
  id: number;
  contestTitle: string;
  contestType: ContestType;
  endDate: string;
  totalParticipants: number;
  totalVotes?: number;
  status: ResultStatus;
  winners: Winner[];
  publishedAt?: string;
}

// ─── MOCK DATA ─────────────────────────────────────────────────
const CONTEST_RESULTS: ContestResult[] = [
  {
    id: 1,
    contestTitle: "Best Travel Photo Contest",
    contestType: "Submissions",
    endDate: "Feb 20, 2026",
    totalParticipants: 899,
    totalVotes: 5420,
    status: "Published",
    publishedAt: "Feb 21, 2026",
    winners: [
      { id: 1, rank: 1, name: "Sarah Johnson",  email: "sarah.j@email.com",  prize: "$1,000 Travel Voucher",  submission: "Beautiful sunset photograph from my recent beach trip", submissionImage: "/images/contest2.jpg", votes: 245 },
      { id: 2, rank: 2, name: "Omar Hassan",    email: "omar.h@email.com",    prize: "Runner-up: $200 Voucher", submission: "Sunset over the Sahara desert",                          submissionImage: "/images/contest3.jpg", votes: 189 },
      { id: 3, rank: 3, name: "Lucas Martin",   email: "lucas.m@email.com",   prize: "Runner-up: $100 Voucher", submission: "Rainy streets of Tokyo at night",                       submissionImage: "/images/contest1.jpg", votes: 150 },
    ],
  },
  {
    id: 2,
    contestTitle: "Win a Free Product Bundle",
    contestType: "Giveaway",
    endDate: "Feb 18, 2026",
    totalParticipants: 1145,
    status: "Published",
    publishedAt: "Feb 19, 2026",
    winners: [
      { id: 4, rank: 1, name: "Michael Chen",   email: "m.chen@email.com",   prize: "$500 Product Bundle" },
      { id: 5, rank: 2, name: "Priya Sharma",   email: "priya.s@email.com",  prize: "$200 Product Bundle" },
      { id: 6, rank: 3, name: "Emily Davis",    email: "emily.d@email.com",  prize: "$100 Product Bundle" },
    ],
  },
  {
    id: 3,
    contestTitle: "Community Choice Awards",
    contestType: "Poll",
    endDate: "Feb 22, 2026",
    totalParticipants: 732,
    totalVotes: 744,
    status: "Pending",
    winners: [
      { id: 7, rank: 1, name: "Dark Mode",      email: "—",                  prize: "Feature to be built next", votes: 245 },
    ],
  },
  {
    id: 4,
    contestTitle: "Win a Premium Gaming Setup",
    contestType: "Giveaway",
    endDate: "Mar 1, 2026",
    totalParticipants: 2100,
    status: "Draft",
    winners: [],
  },
  {
    id: 5,
    contestTitle: "Summer Vibes Photo Contest",
    contestType: "Submissions",
    endDate: "Jan 31, 2026",
    totalParticipants: 543,
    totalVotes: 3210,
    status: "Pending",
    winners: [
      { id: 8, rank: 1, name: "Chloe Nguyen",   email: "chloe.n@email.com",  prize: "Canon DSLR Camera",       submission: "Hidden waterfall in New Zealand", submissionImage: "/images/contest1.jpg", votes: 312 },
    ],
  },
];

// ─── STYLE MAPS ────────────────────────────────────────────────
const resultStatusStyle: Record<ResultStatus, string> = {
  Published: "bg-green-50 text-green-600 border-green-200",
  Pending:   "bg-amber-50 text-amber-600 border-amber-200",
  Draft:     "bg-gray-100 text-gray-500 border-gray-200",
};
const resultStatusIcon: Record<ResultStatus, React.ReactNode> = {
  Published: <CheckCircle2 className="w-3 h-3" />,
  Pending:   <Clock className="w-3 h-3" />,
  Draft:     <AlertCircle className="w-3 h-3" />,
};
const typeStyle: Record<ContestType, string> = {
  Submissions: "bg-blue-50 text-blue-600 border-blue-100",
  Giveaway:    "bg-purple-50 text-purple-600 border-purple-100",
  Poll:        "bg-orange-50 text-orange-600 border-orange-100",
};
const rankConfig = [
  { icon: "🥇", bg: "bg-amber-50",  border: "border-amber-200", text: "text-amber-700",  label: "1st Place" },
  { icon: "🥈", bg: "bg-gray-50",   border: "border-gray-200",  text: "text-gray-600",   label: "2nd Place" },
  { icon: "🥉", bg: "bg-orange-50", border: "border-orange-200",text: "text-orange-700", label: "3rd Place" },
];

// ─── CONFIRM DIALOG ────────────────────────────────────────────
function ConfirmDialog({
  open, onClose, onConfirm, title, description, confirmLabel, confirmClass,
}: {
  open: boolean; onClose: () => void; onConfirm: () => void;
  title: string; description: string; confirmLabel: string; confirmClass?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500 mt-1 mb-5">{description}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 h-10 border-gray-200 text-gray-600">
            Cancel
          </Button>
          <Button onClick={onConfirm} className={cn("flex-1 h-10 text-white font-semibold", confirmClass)}>
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────
export default function AdminWinnerManagementPage() {
  const [results, setResults]         = useState<ContestResult[]>(CONTEST_RESULTS);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter]     = useState("All");
  const [detailItem, setDetailItem]     = useState<ContestResult | null>(null);
  const [confirmPublish, setConfirmPublish] = useState<ContestResult | null>(null);
  const [confirmRevoke, setConfirmRevoke]   = useState<ContestResult | null>(null);

  const filtered = results.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch  = r.contestTitle.toLowerCase().includes(q);
    const matchStatus  = statusFilter === "All" || r.status === statusFilter;
    const matchType    = typeFilter   === "All" || r.contestType === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const published = results.filter((r) => r.status === "Published").length;
  const pending   = results.filter((r) => r.status === "Pending").length;
  const draft     = results.filter((r) => r.status === "Draft").length;
  const totalWinners = results.flatMap((r) => r.winners).length;

  const handlePublish = (id: number) => {
    setResults((prev) => prev.map((r) =>
      r.id === id ? { ...r, status: "Published", publishedAt: "Mar 8, 2026" } : r
    ));
    setConfirmPublish(null);
    if (detailItem?.id === id)
      setDetailItem((p) => p ? { ...p, status: "Published", publishedAt: "Mar 8, 2026" } : null);
  };

  const handleRevoke = (id: number) => {
    setResults((prev) => prev.map((r) =>
      r.id === id ? { ...r, status: "Pending", publishedAt: undefined } : r
    ));
    setConfirmRevoke(null);
    if (detailItem?.id === id)
      setDetailItem((p) => p ? { ...p, status: "Pending", publishedAt: undefined } : null);
  };

  return (
    <div className="min-h-screen bg-white p-8">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Winner Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">Publish and manage contest results</p>
          </div>
        </div>
        <Button className="bg-[#A01C1C] hover:bg-[#851717] text-white gap-2 shadow-sm">
          <Download className="w-4 h-4" /> Export All Results
        </Button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Winners",  value: totalWinners, icon: Crown,        bg: "bg-amber-50",  color: "text-amber-500",  border: "border-amber-100" },
          { label: "Published",      value: published,    icon: CheckCircle2, bg: "bg-green-50",  color: "text-green-500",  border: "border-green-100" },
          { label: "Pending Review", value: pending,      icon: Clock,        bg: "bg-amber-50",  color: "text-amber-500",  border: "border-amber-100" },
          { label: "Not Started",    value: draft,        icon: AlertCircle,  bg: "bg-gray-50",   color: "text-gray-400",   border: "border-gray-100"  },
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

      {/* ── Filters ── */}
      <Card className="border-gray-100 shadow-sm mb-6">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="Search by contest name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-[#A01C1C]/20 focus-visible:border-[#A01C1C] h-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px] h-10 bg-gray-50 border-gray-200 text-sm">
                <Filter className="w-3.5 h-3.5 text-gray-400 mr-1" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {["All", "Published", "Pending", "Draft"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[155px] h-10 bg-gray-50 border-gray-200 text-sm">
                <SelectValue placeholder="Contest Type" />
              </SelectTrigger>
              <SelectContent>
                {["All", "Giveaway", "Submissions", "Poll"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ── Contest Cards Grid ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Trophy className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-base font-medium">No results found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((contest) => (
            <ContestResultCard
              key={contest.id}
              contest={contest}
              onView={() => setDetailItem(contest)}
              onPublish={() => setConfirmPublish(contest)}
              onRevoke={() => setConfirmRevoke(contest)}
            />
          ))}
        </div>
      )}

      {/* ── Detail Modal ── */}
      <Dialog open={!!detailItem} onOpenChange={() => setDetailItem(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold leading-tight">
                  {detailItem?.contestTitle}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  {detailItem && (
                    <>
                      <Badge variant="outline" className={cn("text-[10px] font-semibold px-2 py-0", typeStyle[detailItem.contestType])}>
                        {detailItem.contestType}
                      </Badge>
                      <Badge variant="outline" className={cn("text-[10px] font-semibold px-2 py-0 gap-1", resultStatusStyle[detailItem.status])}>
                        {resultStatusIcon[detailItem.status]}
                        {detailItem.status}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>

          {detailItem && (
            <div className="max-h-[70vh] overflow-y-auto">
              <div className="p-6 space-y-5">

                {/* Contest stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                    <p className="text-xl font-black text-blue-600">{detailItem.totalParticipants.toLocaleString()}</p>
                    <p className="text-[11px] text-blue-400 font-medium mt-0.5">Participants</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
                    <p className="text-xl font-black text-amber-600">{detailItem.winners.length}</p>
                    <p className="text-[11px] text-amber-400 font-medium mt-0.5">Winners</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <p className="text-xl font-black text-gray-700">{detailItem.totalVotes?.toLocaleString() ?? "—"}</p>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">Total Votes</p>
                  </div>
                </div>

                {/* End / Published date */}
                <div className="flex gap-3">
                  <div className="flex-1 flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-xs text-gray-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Contest Ended
                    </span>
                    <span className="text-xs font-semibold text-gray-700">{detailItem.endDate}</span>
                  </div>
                  {detailItem.publishedAt && (
                    <div className="flex-1 flex items-center justify-between px-4 py-3 bg-green-50 rounded-xl border border-green-100">
                      <span className="text-xs text-green-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Published
                      </span>
                      <span className="text-xs font-semibold text-green-700">{detailItem.publishedAt}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Winners list */}
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-500" /> Winners
                  </h4>
                  {detailItem.winners.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-gray-100">
                      <Trophy className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No winners selected yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {detailItem.winners.map((w) => {
                        const rc = rankConfig[w.rank - 1] ?? rankConfig[2];
                        return (
                          <div key={w.id} className={cn("flex items-start gap-3 p-4 rounded-xl border", rc.bg, rc.border)}>
                            <span className="text-2xl shrink-0">{rc.icon}</span>
                            {w.submissionImage ? (
                              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/80 shadow-sm">
                                <Image src={w.submissionImage} alt={w.name} width={48} height={48} className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-lg font-black shrink-0", rc.bg, "border", rc.border)}>
                                {w.name.charAt(0)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className={cn("text-sm font-bold", rc.text)}>{w.name}</p>
                                {w.votes && (
                                  <span className="text-xs text-gray-500 shrink-0">{w.votes} votes</span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate">{w.email}</p>
                              {w.submission && (
                                <p className="text-xs text-gray-500 mt-1 line-clamp-1 italic">"{w.submission}"</p>
                              )}
                              <p className="text-[11px] font-semibold text-gray-600 mt-1.5">🎁 {w.prize}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal footer actions */}
              <div className="px-6 pb-6 space-y-3">
                {detailItem.status === "Pending" && detailItem.winners.length > 0 && (
                  <Button
                    onClick={() => { setDetailItem(null); setConfirmPublish(detailItem); }}
                    className="w-full h-11 bg-green-500 hover:bg-green-600 text-white font-semibold gap-2"
                  >
                    <Send className="w-4 h-4" /> Publish Results
                  </Button>
                )}
                {detailItem.status === "Published" && (
                  <Button
                    variant="outline"
                    onClick={() => { setDetailItem(null); setConfirmRevoke(detailItem); }}
                    className="w-full h-11 border-red-200 text-red-500 hover:bg-red-50 font-semibold gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Revoke & Unpublish
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setDetailItem(null)}
                  className="w-full h-11 border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Publish Confirm ── */}
      <ConfirmDialog
        open={!!confirmPublish}
        onClose={() => setConfirmPublish(null)}
        onConfirm={() => confirmPublish && handlePublish(confirmPublish.id)}
        title="Publish Results?"
        description={`This will notify all winners of "${confirmPublish?.contestTitle}" via email and make results visible to all participants. This action can be revoked later.`}
        confirmLabel="Publish Now"
        confirmClass="bg-green-500 hover:bg-green-600"
      />

      {/* ── Revoke Confirm ── */}
      <ConfirmDialog
        open={!!confirmRevoke}
        onClose={() => setConfirmRevoke(null)}
        onConfirm={() => confirmRevoke && handleRevoke(confirmRevoke.id)}
        title="Revoke Published Results?"
        description={`This will unpublish the results for "${confirmRevoke?.contestTitle}" and hide them from participants until you publish again.`}
        confirmLabel="Revoke"
        confirmClass="bg-[#A01C1C] hover:bg-[#851717]"
      />
    </div>
  );
}

// ─── CONTEST RESULT CARD ───────────────────────────────────────
function ContestResultCard({
  contest, onView, onPublish, onRevoke,
}: {
  contest: ContestResult;
  onView: () => void;
  onPublish: () => void;
  onRevoke: () => void;
}) {
  const topWinner = contest.winners[0];

  return (
    <Card className={cn(
      "border shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden",
      contest.status === "Published" ? "border-green-100" :
      contest.status === "Pending"   ? "border-amber-100" : "border-gray-100"
    )}>
      {/* Card top accent bar */}
      <div className={cn(
        "h-1 w-full",
        contest.status === "Published" ? "bg-green-400" :
        contest.status === "Pending"   ? "bg-amber-400"  : "bg-gray-200"
      )} />

      <CardHeader className="pb-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-bold text-gray-900 leading-snug truncate">
              {contest.contestTitle}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Badge variant="outline" className={cn("text-[10px] font-semibold px-1.5 py-0", typeStyle[contest.contestType])}>
                {contest.contestType}
              </Badge>
              <Badge variant="outline" className={cn("text-[10px] font-semibold px-1.5 py-0 gap-1", resultStatusStyle[contest.status])}>
                {resultStatusIcon[contest.status]}
                {contest.status}
              </Badge>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-400">Ended</p>
            <p className="text-xs font-semibold text-gray-600">{contest.endDate}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-5">
        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            {contest.totalParticipants.toLocaleString()} participants
          </span>
          {contest.totalVotes && (
            <span className="flex items-center gap-1">
              <BarChart2 className="w-3.5 h-3.5 text-gray-400" />
              {contest.totalVotes.toLocaleString()} votes
            </span>
          )}
          <span className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            {contest.winners.length} winner{contest.winners.length !== 1 ? "s" : ""}
          </span>
        </div>

        <Separator />

        {/* Winners preview */}
        {contest.winners.length === 0 ? (
          <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-xl border border-gray-100">
            <AlertCircle className="w-4 h-4 text-gray-400 shrink-0" />
            <p className="text-xs text-gray-400">No winners selected yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {contest.winners.slice(0, 2).map((w) => {
              const rc = rankConfig[w.rank - 1] ?? rankConfig[2];
              return (
                <div key={w.id} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl border", rc.bg, rc.border)}>
                  <span className="text-base shrink-0">{rc.icon}</span>
                  {w.submissionImage ? (
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/60">
                      <Image src={w.submissionImage} alt={w.name} width={32} height={32} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0", rc.bg, "border", rc.border, rc.text)}>
                      {w.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs font-bold truncate", rc.text)}>{w.name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{w.prize}</p>
                  </div>
                  {w.votes && (
                    <span className="text-[10px] text-gray-400 shrink-0">{w.votes}v</span>
                  )}
                </div>
              );
            })}
            {contest.winners.length > 2 && (
              <p className="text-xs text-gray-400 text-center pt-1">
                +{contest.winners.length - 2} more winner{contest.winners.length - 2 > 1 ? "s" : ""}
              </p>
            )}
          </div>
        )}

        {/* Published info */}
        {contest.publishedAt && (
          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            Results published on {contest.publishedAt}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onView}
            className="flex-1 h-9 border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> View Details
          </Button>

          {contest.status === "Pending" && contest.winners.length > 0 && (
            <Button
              size="sm"
              onClick={onPublish}
              className="flex-1 h-9 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Publish
            </Button>
          )}

          {contest.status === "Published" && (
            <Button
              size="sm"
              variant="outline"
              onClick={onRevoke}
              className="flex-1 h-9 border-red-200 text-red-500 hover:bg-red-50 text-xs font-semibold gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Revoke
            </Button>
          )}

          {contest.status === "Draft" && (
            <Button
              size="sm"
              variant="outline"
              disabled
              className="flex-1 h-9 border-gray-200 text-gray-400 text-xs font-semibold gap-1.5 cursor-not-allowed"
            >
              <Clock className="w-3.5 h-3.5" /> Not Ended
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}