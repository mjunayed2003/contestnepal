"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Trophy,
  Users,
  Clock,
  CheckCircle,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Winner {
  number: string;
  name: string;
  avatar: string;
  entryImage: string;
  content: string;
}

interface Entry {
  id: number;
  title: string;
  description: string;
  authorName: string;
  authorAvatar: string;
  image: string;
  votes: number;
  isWinner: boolean;
}

interface ContestDetail {
  title: string;
  status: "Active" | "Ended";
  deadline: string;
  winnerDeclared: boolean;
  image: string;
  description: string;
  prize: string;
  participants: number;
  winner?: Winner;
  entries?: Entry[];
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const GAMING_IMG = "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80";
const GAMING_THUMB = "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80";
const GAMING_THUMB2 = "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=600&q=80";

const makeEntries = (): Entry[] =>
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: "Win a Premium Gaming Setup",
    description: "Best landscape photography wins! Results are now live.",
    authorName: "Seam Rahman",
    authorAvatar: `https://i.pravatar.cc/40?u=seam${i + 1}`,
    image: i % 2 === 0 ? GAMING_THUMB : GAMING_THUMB2,
    votes: i === 1 ? 126 : 156,
    isWinner: i === 0,
  }));

const CONTEST_DETAILS: Record<string, ContestDetail> = {
  default: {
    title: "Weekly Gift Card Drop",
    status: "Ended",
    deadline: "25 June 2026",
    winnerDeclared: true,
    image: GAMING_IMG,
    description:
      "Weekly chance to win a $50 Amazon Gift Card. Participate now and try your luck!",
    prize: "$50 Amazon Gift Card",
    participants: 120,
    entries: makeEntries(),
  },
};

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function GiveawayDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? String(params.id) : "default";
  const contest: ContestDetail =
    CONTEST_DETAILS[id] ?? CONTEST_DETAILS["default"];

  const entries: Entry[] = contest.entries ?? makeEntries();
  const totalVotes = entries.reduce((s, e) => s + e.votes, 0);

  const [votedIds, setVotedIds] = useState<Set<number>>(new Set());
  const toggleVote = (id: number) =>
    setVotedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const rules = [
    "One vote per user per entry",
    "Voting is open to all users (participation optional)",
    "Entry with the most votes wins",
    "Winner will be announced after contest ends",
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24">
      {/* ── Page wrapper: full-width bg, content max 1560px ── */}
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-8 xl:px-12 pt-8">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to contests
        </button>

        {/* ── HERO + OVERLAPPING CARD — max-width 1300px ── */}
        <div className="relative">

          {/* Hero Banner — full 1560px (no max-width constraint) */}
          <div className="w-full h-[200px] sm:h-[260px] lg:h-[320px] rounded-2xl overflow-hidden">
            <img
              src={contest.image}
              alt="Contest Banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping Card — centered, max 1300px */}
          <div className="relative -mt-3 max-w-[1300px] mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 px-5 sm:px-8 lg:px-10 pt-7 pb-9">

            {/* Winner Declared Banner */}
            {contest.winnerDeclared && (
              <div className="flex items-center gap-4 bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl px-5 py-3 mb-6">
                <div className="bg-[#F59E0B] p-2 rounded-lg text-white shrink-0">
                  <Trophy size={17} fill="white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#92400E]">Winner Declared!</p>
                  <p className="text-xs text-[#B45309] mt-0.5">
                    Results have been published by the organizer
                  </p>
                </div>
              </div>
            )}

            {/* Two-column layout */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

              {/* ── LEFT ── */}
              <div className="flex-1 min-w-0">

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-purple-50 text-purple-600 border border-purple-100 hover:bg-purple-50 text-[10px] font-bold uppercase tracking-wide gap-1.5 px-2.5 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />
                    Submissions
                  </Badge>
                  <Badge
                    className={`text-[10px] font-bold uppercase tracking-wide gap-1.5 px-2.5 py-1 rounded-md border ${contest.status === "Active"
                        ? "bg-green-50 text-green-600 border-green-100 hover:bg-green-50"
                        : "bg-red-50 text-red-500 border-red-100 hover:bg-red-50"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full inline-block ${contest.status === "Active" ? "bg-green-500" : "bg-red-500"
                        }`}
                    />
                    {contest.status}
                  </Badge>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2 leading-snug">
                  {contest.title}
                </h1>

                <div className="flex items-center gap-2 text-gray-400 text-sm mb-7">
                  <Calendar size={13} />
                  <span>Deadline: {contest.deadline}</span>
                </div>

                {/* About */}
                <div className="mb-6">
                  <h3 className="text-[14px] font-bold text-gray-900 mb-2">
                    About this contest
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {contest.description}
                  </p>
                </div>

                {/* Rules */}
                <div>
                  <h3 className="text-[14px] font-bold text-gray-900 mb-3">
                    Rules &amp; Requirement
                  </h3>
                  <ul className="space-y-2.5">
                    {rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <CheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── RIGHT ── */}
              <div className="w-full lg:w-[260px] xl:w-[280px] shrink-0 flex flex-col gap-3">

                {/* Share */}
                <Button className="w-full bg-[#A01C1C] hover:bg-[#8B1818] text-white font-semibold rounded-xl text-sm shadow-sm gap-2">
                  <Share2 size={15} /> Share
                </Button>

                {/* Grand Prize */}
                <Card className="border-0 shadow-none">
                  <CardContent className="bg-[#F6F7FB] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Trophy size={14} className="text-[#A01C1C]" />
                      <span className="text-sm font-bold text-gray-800">Grand Prize</span>
                    </div>
                    <p className="text-[15px] font-extrabold text-gray-900">{contest.prize}</p>
                    <p className="text-xs text-gray-400 mt-1">Plus recognition on our platform</p>
                  </CardContent>
                </Card>

                {/* Contest Stats */}
                <Card className="border-0 shadow-none">
                  <CardContent className="bg-[#F6F7FB] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy size={14} className="text-[#A01C1C]" />
                      <span className="text-sm font-bold text-gray-800">Contest Stats</span>
                    </div>

                    <div className="flex justify-between items-center mb-3.5">
                      <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                        <Users size={12} /> Participants
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        {contest.participants} Person
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                        <Clock size={12} /> Time left
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-red-500 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm">
                        <span>0</span><span className="opacity-40">:</span>
                        <span>0</span><span className="opacity-40">:</span>
                        <span>0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* ── ENTRIES SECTION — full 1560px ── */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[16px] font-extrabold text-gray-900">
              Entries ({entries.length})
            </h2>
            <span className="text-sm text-gray-500 font-semibold">
              Total votes: {totalVotes}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
            {entries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                voted={votedIds.has(entry.id)}
                onVote={() => toggleVote(entry.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Entry Card ─────────────────────────────────────────────────────────── */
interface EntryCardProps {
  entry: Entry;
  voted: boolean;
  onVote: () => void;
}

function EntryCard({ entry, voted, onVote }: EntryCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">

      {/* Status strip */}
      {entry.isWinner ? (
        <div className="flex items-center justify-center gap-1.5 bg-[#FFFBEB] border-b border-[#FEF3C7] py-2">
          <Trophy size={13} className="text-[#F59E0B] fill-[#F59E0B]" />
          <span className="text-[11px] font-extrabold text-[#D97706] uppercase tracking-widest">
            Winner
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-1.5 bg-red-50 border-b border-red-100 py-2">
          <X size={11} className="text-red-500" strokeWidth={3} />
          <span className="text-[11px] font-extrabold text-red-500 uppercase tracking-widest">
            Not Selected
          </span>
        </div>
      )}

      {/* Thumbnail */}
      <div className="h-[140px] overflow-hidden">
        <img
          src={entry.image}
          alt={entry.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-[13px] font-bold text-gray-900 mb-1">{entry.title}</p>
        <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
          {entry.description}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mb-4">
          <img
            src={entry.authorAvatar}
            alt={entry.authorName}
            className="w-6 h-6 rounded-full object-cover border border-gray-200"
          />
          <span className="text-[10px] font-extrabold text-gray-700 uppercase tracking-wider">
            {entry.authorName}
          </span>
        </div>

        {/* Votes + Vote button */}
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold text-gray-600">
            Total: {entry.votes} Votes
          </span>
          <Button
            size="sm"
            onClick={onVote}
            className={`text-[11px] font-bold rounded-lg px-4 py-1.5 h-auto transition-all ${voted
                ? "bg-violet-600 hover:bg-violet-700 text-white"
                : "bg-[#A01C1C] hover:bg-[#8B1818] text-white"
              }`}
          >
            {voted ? "Voted" : "Vote"}
          </Button>
        </div>
      </div>
    </div>
  );
}