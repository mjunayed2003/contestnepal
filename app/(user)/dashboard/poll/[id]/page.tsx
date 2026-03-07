"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft, Calendar, Share2, Trophy,
  Users, Clock, CheckCircle,
} from "lucide-react";

const POLL_DATA: Record<string, any> = {
  default: {
    title: "Weekly Gift Card Drop",
    deadline: "25 June 2026",
    status: "Winner Declared",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80",
    participants: 120,
    grandPrize: "$50 Amazon Gift Card",
    description: "Weekly chance to win a $50 Amazon Gift Card. Participate now and try your luck!",
    results: [
      { id: 1, label: "Mobile App",          votes: 145, percentage: 60, isWinner: true  },
      { id: 2, label: "Mobile App",          votes: 145, percentage: 32, isWinner: false },
      { id: 3, label: "Advanced Analytics",  votes: 95,  percentage: 21, isWinner: false },
    ],
  },
  "201": {
    title: "World Cup Prediction Poll",
    deadline: "20 July 2026",
    status: "Active",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&q=80",
    participants: 500,
    grandPrize: "$1,000 Poll",
    description: "Predict the winner of the upcoming World Cup matches and win big prizes.",
    results: [
      { id: 1, label: "Brazil",    votes: 300, percentage: 60, isWinner: false },
      { id: 2, label: "Argentina", votes: 200, percentage: 40, isWinner: false },
    ],
  },
  "202": {
    title: "Crypto Price Prediction",
    deadline: "30 Jan 2026",
    status: "Winner Declared",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&q=80",
    participants: 1200,
    grandPrize: "1 BTC",
    description: "Guess the Bitcoin price at the end of the month. Closest guess wins the pool.",
    results: [
      { id: 1, label: "Above $100k", votes: 800, percentage: 75, isWinner: true  },
      { id: 2, label: "Below $100k", votes: 400, percentage: 25, isWinner: false },
    ],
  },
};

// ─── VOTE CARD ────────────────────────────────────────────────
function VoteCard({ item }: { item: any }) {
  if (item.isWinner) {
    return (
      <div className="rounded-2xl border border-yellow-200 bg-[#FFFBEB] p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy size={17} className="text-yellow-500 fill-yellow-400 shrink-0" />
            <span className="text-sm font-bold text-gray-900">{item.label}</span>
          </div>
          <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
        </div>
        <p className="text-xs text-gray-400 mb-3">{item.votes} votes</p>
        <div className="w-full h-2.5 bg-yellow-100 rounded-full overflow-hidden">
          <div
            style={{ width: `${item.percentage}%` }}
            className="h-full rounded-full bg-[#F59E0B] transition-all duration-1000 ease-out"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-800">{item.label}</span>
        <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
      </div>
      <p className="text-xs text-gray-400 mb-3">{item.votes} votes</p>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          style={{ width: `${item.percentage}%` }}
          className="h-full rounded-full bg-[#2563EB] transition-all duration-1000 ease-out"
        />
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────
export default function PollDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id   = params?.id ? String(params.id) : "default";
  const data = POLL_DATA[id] || POLL_DATA["default"];

  const isActive      = data.status === "Active";
  const isWinnerDecl  = data.status === "Winner Declared";

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-gray-900 pb-20">
      <main className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-[50px] pt-8">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium mb-5 transition-colors"
        >
          <ArrowLeft size={17} /> Back to contests
        </button>

        <div className="relative">

          {/* Hero */}
          <div className="w-full h-[180px] sm:h-[240px] lg:h-[300px] rounded-2xl sm:rounded-[20px] overflow-hidden">
            <img src={data.image} alt="Poll Banner" className="w-full h-full object-cover" />
          </div>

          {/* Card */}
          <div className="relative -mt-[13px] mx-1.5 sm:mx-4 lg:mx-8 bg-white rounded-2xl sm:rounded-[20px] shadow-lg border border-gray-100 overflow-hidden">

            {/* ── Winner Published Banner (top of card, full width) ── */}
            {isWinnerDecl && (
              <div className="bg-[#FFFBEB] border-b border-[#FEF3C7] px-5 sm:px-8 lg:px-10 py-4 flex items-center gap-3">
                <div className="bg-[#F59E0B] p-1.5 rounded-lg text-white shrink-0">
                  <Trophy size={16} fill="white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#92400E]">Poll Results Published!</p>
                  <p className="text-xs text-[#B45309] mt-0.5">Results have been published by the organizer</p>
                </div>
              </div>
            )}

            <div className="px-4 sm:px-7 lg:px-9 pt-6 sm:pt-8 pb-8">

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

                {/* Left */}
                <div className="flex-1 min-w-0">

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Poll
                    </span>
                    {isWinnerDecl && (
                      <span className="bg-red-50 text-red-500 border border-red-100 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Winner Declared
                      </span>
                    )}
                    {isActive && (
                      <span className="bg-green-50 text-green-600 border border-green-100 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active
                      </span>
                    )}
                  </div>

                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug">
                    {data.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-7">
                    <Calendar size={14} /> <span>Deadline: {data.deadline}</span>
                  </div>

                  {/* About */}
                  <div className="mb-6">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-2">About this contest</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{data.description}</p>
                  </div>

                  {/* Rules */}
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900 mb-3">Rules & Requirement</h3>
                    <ul className="space-y-2.5">
                      {[
                        "One vote per user per entry",
                        "Voting is open to all users (participation optional)",
                        "Entry with the most votes wins",
                        "Winner will be announced after contest ends",
                      ].map((rule, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right */}
                <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0 flex flex-col gap-4">

                  <button className="w-full bg-[#A01C1C] hover:bg-[#8B1818] text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition text-sm shadow-sm">
                    <Share2 size={16} /> Share
                  </button>

                  {/* Grand Prize */}
                  <div className="bg-[#F6F7FB] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Trophy size={15} className="text-[#A01C1C]" />
                      <span className="text-sm font-bold text-gray-800">Grand Prize</span>
                    </div>
                    <p className="text-base font-bold text-gray-900">{data.grandPrize}</p>
                    <p className="text-xs text-gray-400 mt-1">Plus recognition on our platform</p>
                  </div>

                  {/* Stats */}
                  <div className="bg-[#F6F7FB] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy size={15} className="text-[#A01C1C]" />
                      <span className="text-sm font-bold text-gray-800">Contest Stats</span>
                    </div>
                    <div className="flex justify-between items-center mb-3.5">
                      <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                        <Users size={13} /> Participants
                      </div>
                      <span className="text-xs font-bold text-gray-900">{data.participants} Person</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                        <Clock size={13} /> Time left
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-red-500 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm">
                        <span>0</span><span className="opacity-40">:</span>
                        <span>0</span><span className="opacity-40">:</span>
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Cast Your Vote / Results ── */}
              <div className="mt-8 pt-7 border-t border-gray-100">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-5">
                  {isActive ? "Cast Your Vote" : "Cast Your Vote"}
                </h2>
                <div className="flex flex-col gap-3">
                  {data.results.map((item: any) => (
                    <VoteCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}