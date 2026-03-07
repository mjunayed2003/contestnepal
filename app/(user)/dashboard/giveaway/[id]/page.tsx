"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft, Calendar, Share2, Trophy,
  Users, Clock, CheckCircle,
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────
const CONTEST_DETAILS: Record<string, any> = {
  default: {
    title: "Weekly Gift Card Drop",
    status: "Ended",
    deadline: "25 June 2026",
    winnerDeclared: false,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80",
    description: "Weekly chance to win a $50 Amazon Gift Card. Participate now and try your luck!",
    prize: "$50 Amazon Gift Card",
    participants: 120,
  },
  "1": {
    title: "Win a Premium Gaming Setup",
    status: "Active",
    deadline: "30 Aug 2026",
    winnerDeclared: false,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80",
    description: "Capture the essence of summer. We are looking for vibrant colors and outdoor adventures.",
    prize: "RTX 4090 Gaming PC",
    participants: 450,
  },
  "2": {
    title: "iPhone 15 Pro Max Giveaway",
    status: "Ended",
    deadline: "10 Feb 2026",
    winnerDeclared: true,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&q=80",
    description: "Follow our social media channels and stand a chance to win the brand new iPhone.",
    prize: "iPhone 15 Pro Max",
    participants: 2300,
    winner: {
      number: "01",
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?u=michael",
      entryImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      content: "Mountain landscape during golden hour",
    },
  },
  "3": {
    title: "Win a Premium Gaming Setup",
    status: "Active",
    deadline: "30 Aug 2026",
    winnerDeclared: false,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80",
    description: "Capture the essence of summer. We are looking for vibrant colors and outdoor adventures.",
    prize: "RTX 4090 Gaming PC",
    participants: 450,
  },
  "4": {
    title: "iPhone 15 Pro Max Giveaway",
    status: "Ended",
    deadline: "10 Feb 2026",
    winnerDeclared: true,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&q=80",
    description: "Follow our social media channels and stand a chance to win the brand new iPhone.",
    prize: "iPhone 15 Pro Max",
    participants: 2300,
    winner: {
      number: "01",
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?u=michael",
      entryImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      content: "Mountain landscape during golden hour",
    },
  },
};

export default function GiveawayDetailsPage() {
  const router  = useRouter();
  const params  = useParams();
  const id      = params?.id ? String(params.id) : "default";
  const contest = CONTEST_DETAILS[id] || CONTEST_DETAILS["default"];

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-gray-900 pb-20">
      <main className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-[50px] pt-8">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium mb-5 transition-colors"
        >
          <ArrowLeft size={17} />
          Back to contests
        </button>

        {/* Wrapper — image + overlapping card */}
        <div className="relative">

          {/* Hero Image */}
          <div className="w-full h-[180px] sm:h-[240px] lg:h-[280px] rounded-2xl overflow-hidden">
            <img
              src={contest.image}
              alt="Contest Banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlapping Card */}
          <div className="relative -mt-16 sm:-mt-20 mx-2 sm:mx-6 lg:mx-10 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 sm:px-8 lg:px-10 pt-6 sm:pt-8 pb-8">

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

              {/* ── LEFT ── */}
              <div className="flex-1 min-w-0">

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-purple-50 text-purple-600 border border-purple-100 px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Giveaway
                  </span>
                  <span className={`px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide border
                    ${contest.status === "Active"
                      ? "bg-green-50 text-green-600 border-green-100"
                      : "bg-red-50 text-red-500 border-red-100"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${contest.status === "Active" ? "bg-green-500" : "bg-red-500"}`} />
                    {contest.status}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                  {contest.title}
                </h1>

                <div className="flex items-center gap-2 text-gray-400 text-sm mb-7 font-medium">
                  <Calendar size={14} />
                  <span>Deadline: {contest.deadline}</span>
                </div>

                {/* About */}
                <div className="mb-6">
                  <h3 className="text-[15px] font-bold text-gray-900 mb-2">About this contest</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{contest.description}</p>
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
                        <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── RIGHT ── */}
              <div className="w-full lg:w-[300px] xl:w-[320px] shrink-0 flex flex-col gap-4">

                {/* Share */}
                <button className="w-full bg-[#A01C1C] hover:bg-[#8B1818] text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition text-sm shadow-sm">
                  <Share2 size={16} /> Share
                </button>

                {/* Grand Prize */}
                <div className="bg-[#F6F7FB] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Trophy size={16} className="text-[#A01C1C]" />
                    <span className="text-sm font-bold text-gray-800">Grand Prize</span>
                  </div>
                  <p className="text-base font-bold text-gray-900">{contest.prize}</p>
                  <p className="text-xs text-gray-400 mt-1">Plus recognition on our platform</p>
                </div>

                {/* Contest Stats */}
                <div className="bg-[#F6F7FB] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy size={16} className="text-[#A01C1C]" />
                    <span className="text-sm font-bold text-gray-800">Contest Stats</span>
                  </div>

                  <div className="flex justify-between items-center mb-3.5">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                      <Users size={14} /> Participants
                    </div>
                    <span className="text-xs font-bold text-gray-900">{contest.participants} Person</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                      <Clock size={14} /> Time left
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-red-500 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm">
                      <span>0</span>
                      <span className="opacity-50">:</span>
                      <span>0</span>
                      <span className="opacity-50">:</span>
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Winner Section ── */}
            <div className="mt-8 pt-6 border-t border-gray-100">

              {/* No Winner Yet */}
              {!contest.winnerDeclared && (
                <div className="w-full bg-[#F5F7FF] border border-[#E0E7FF] rounded-xl py-5 px-6 text-center">
                  <p className="text-[#A01C1C] font-semibold text-sm sm:text-base">
                    This contest has ended. Winner announcement coming soon!
                  </p>
                </div>
              )}

              {/* Winner Declared */}
              {contest.winnerDeclared && contest.winner && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                  {/* Winner banner */}
                  <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl p-4 flex items-center gap-4 mb-7">
                    <div className="bg-[#F59E0B] p-2 rounded-lg text-white shrink-0">
                      <Trophy size={18} fill="white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#92400E]">Winner Declared!</h4>
                      <p className="text-xs text-[#B45309] mt-0.5">
                        Results have been published by the organizer
                      </p>
                    </div>
                  </div>

                  {/* Winner card */}
                  <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 max-w-[520px] mx-auto shadow-sm bg-white">

                    {/* Number row */}
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-gray-800">Number</h3>
                      <span className="text-xl font-bold text-gray-900">{contest.winner.number}</span>
                    </div>

                    {/* Entry image */}
                    <div className="w-full h-[200px] sm:h-[260px] rounded-xl overflow-hidden mb-5">
                      <img
                        src={contest.winner.entryImage}
                        alt="Winning Entry"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Submitted by */}
                    <div className="mb-3">
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-1.5">
                        Submitted by
                      </p>
                      <div className="flex items-center gap-2.5">
                        <img
                          src={contest.winner.avatar}
                          alt={contest.winner.name}
                          className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                        />
                        <span className="text-sm font-bold text-gray-900">{contest.winner.name}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-5">
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-1">
                        Content
                      </p>
                      <p className="text-sm text-gray-600">{contest.winner.content}</p>
                    </div>

                    {/* Winner badge */}
                    <div className="bg-[#FFFBEB] border border-[#FEF3C7] text-[#D97706] rounded-xl py-3 flex justify-center items-center gap-2 font-bold text-sm">
                      <Trophy size={16} /> Winner
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}