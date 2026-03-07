"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft, Calendar, Share2, Trophy,
  Users, CheckCircle,
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────
const POLL_DATA: Record<string, any> = {
  default: {
    title: "World Cup Prediction Poll",
    deadline: "25 June 2026",
    status: "Active",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&q=80",
    participants: 120,
    grandPrize: "$500 Shared Poll",
    results: [
      { id: 1, label: "Team A", votes: 145, percentage: 60, isWinner: true  },
      { id: 2, label: "Team B", votes: 95,  percentage: 40, isWinner: false },
    ],
  },
  "201": {
    title: "World Cup Prediction Poll",
    deadline: "20 July 2026",
    status: "Active",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&q=80",
    participants: 500,
    grandPrize: "$1,000 Poll",
    results: [
      { id: 1, label: "Brazil",    votes: 300, percentage: 60, isWinner: false },
      { id: 2, label: "Argentina", votes: 200, percentage: 40, isWinner: false },
    ],
  },
  "202": {
    title: "Crypto Price Prediction",
    deadline: "30 Jan 2026",
    status: "Closed",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&q=80",
    participants: 1200,
    grandPrize: "1 BTC",
    results: [
      { id: 1, label: "Above $100k", votes: 800, percentage: 75, isWinner: true  },
      { id: 2, label: "Below $100k", votes: 400, percentage: 25, isWinner: false },
    ],
  },
};

// ─── POLL RESULT CARD ─────────────────────────────────────────
function PollResultCard({ item }: { item: any }) {
  return (
    <div className={`rounded-xl p-4 sm:p-5 border transition-all bg-white
      ${item.isWinner
        ? "border-yellow-300 shadow-sm shadow-yellow-100"
        : "border-gray-100"}`}>
      <div className="flex items-center gap-2 mb-3">
        {item.isWinner && <Trophy size={16} className="text-yellow-500 fill-yellow-500 shrink-0" />}
        <h3 className={`text-sm font-bold ${item.isWinner ? "text-gray-900" : "text-gray-700"}`}>
          {item.label}
        </h3>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400 font-medium">{item.votes} votes</span>
        <span className="text-xs font-bold text-gray-900">{item.percentage}%</span>
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          style={{ width: `${item.percentage}%` }}
          className={`h-full rounded-full transition-all duration-1000 ease-out
            ${item.isWinner ? "bg-[#F59E0B]" : "bg-[#2563EB]"}`}
        />
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────
export default function PollDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id   = params?.id ? String(params.id) : "default";
  const data = POLL_DATA[id] || POLL_DATA["default"];

  const isActive = data.status === "Active";
  const hasWinner = data.results.some((r: any) => r.isWinner);

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

          {/* Hero Image */}
          <div className="w-full h-[180px] sm:h-[240px] lg:h-[300px] rounded-2xl sm:rounded-[20px] overflow-hidden">
            <img
              src={data.image}
              alt="Poll Banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping Card */}
          <div className="relative -mt-[13px] mx-1.5 sm:mx-4 lg:mx-8 bg-white rounded-2xl sm:rounded-[20px] shadow-lg border border-gray-100 px-4 sm:px-7 lg:px-9 pt-6 sm:pt-8 pb-8">

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

              {/* ── LEFT ── */}
              <div className="flex-1 min-w-0">

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Poll
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide border
                    ${isActive
                      ? "bg-green-50 text-green-600 border-green-100"
                      : "bg-red-50 text-red-500 border-red-100"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`} />
                    {data.status}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug">
                  {data.title}
                </h1>

                <div className="flex items-center gap-2 text-gray-400 text-sm mb-7">
                  <Calendar size={14} />
                  <span>Deadline: {data.deadline}</span>
                </div>

                {/* Rules */}
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-3">Rules & Requirement</h3>
                  <ul className="space-y-2.5">
                    {[
                      "One vote per user per poll",
                      "Closest guess or most votes wins",
                      "Results are shown in real-time",
                      "Winner will be announced after poll closes",
                    ].map((rule, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── RIGHT ── */}
              <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0 flex flex-col gap-4">

                <button className="w-full bg-[#A01C1C] hover:bg-[#8B1818] text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition text-sm shadow-sm">
                  <Share2 size={16} /> Share
                </button>

                {/* Grand Prize */}
                <div className="bg-[#F6F7FB] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Trophy size={15} className="text-[#A01C1C]" />
                    <span className="text-sm font-bold text-gray-800">Prize Pool</span>
                  </div>
                  <p className="text-base font-bold text-gray-900">{data.grandPrize}</p>
                  <p className="text-xs text-gray-400 mt-1">Shared among winners</p>
                </div>

                {/* Stats */}
                <div className="bg-[#F6F7FB] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy size={15} className="text-[#A01C1C]" />
                    <span className="text-sm font-bold text-gray-800">Poll Stats</span>
                  </div>
                  <div className="flex justify-between items-center mb-3.5">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                      <Users size={13} /> Participants
                    </div>
                    <span className="text-xs font-bold text-gray-900">{data.participants} Person</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                      <Trophy size={13} /> Total Votes
                    </div>
                    <span className="text-xs font-bold text-gray-900">
                      {data.results.reduce((sum: number, r: any) => sum + r.votes, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Poll Results ── */}
            <div className="mt-8 pt-7 border-t border-gray-100">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-5">
                {isActive ? "Current Standing" : "Final Results"}
              </h2>

              {/* Winner banner — only if poll closed & has winner */}
              {!isActive && hasWinner && (
                <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl p-4 flex items-center gap-4 mb-6">
                  <div className="bg-[#F59E0B] p-2 rounded-lg text-white shrink-0">
                    <Trophy size={18} fill="white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#92400E]">Poll Closed — Winner Declared!</h4>
                    <p className="text-xs text-[#B45309] mt-0.5">
                      Results have been published by the organizer
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.results.map((item: any) => (
                  <PollResultCard key={item.id} item={item} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}