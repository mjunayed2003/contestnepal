"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft, Calendar, Share2, Trophy, Users, Clock,
  CheckCircle
} from "lucide-react";

// ─── MOCK DATA (Simulating Database) ─────────────────────────────
const CONTEST_DETAILS: Record<string, any> = {
  // Default data for any ID
  "default": {
    title: "Weekly Gift Card Drop",
    status: "Ended",
    deadline: "25 June 2026",
    winnerDeclared: false,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80",
    description: "Weekly change to win a $50 Amazon Gift Card. Participate now and try your luck!",
    prize: "$50 Amazon Gift Card",
    participants: 120
  },
  // Specific data for ID 1
  "1": {
    title: "Win a Premium Gaming Setup",
    status: "Active",
    deadline: "30 Aug 2026",
    winnerDeclared: false,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80",
    description: "Capture the essence of summer. We are looking for vibrant colors and outdoor adventures.",
    prize: "RTX 4090 Gaming PC",
    participants: 450
  },
  // Specific data for ID 2 (Winner Declared Example)
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
      rank: "01",
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?u=michael",
      entryImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      content: "Amazing shot taken at sunset."
    }
  }
};

export default function GiveawayDetailsPage() {
  const router = useRouter();
  const params = useParams();
  
  // ID অনুযায়ী ডাটা আনা হচ্ছে, না পেলে default ডাটা দেখাবে
  const id = params?.id ? String(params.id) : "default";
  const contest = CONTEST_DETAILS[id] || CONTEST_DETAILS["default"];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      
      {/* ─── NO NAVBAR HERE ─── */}

      <main className="max-w-[1200px] mx-auto px-6 pt-8">
        
        {/* ─── BACK BUTTON ─── */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-[14px] font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to contests
        </button>

        {/* ─── HERO BANNER ─── */}
        <div className="relative w-full h-[320px] rounded-t-[30px] overflow-hidden">
          <img 
            src={contest.image} 
            alt="Contest Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* ─── MAIN CONTENT CARD (Overlapping) ─── */}
        <div className="relative -mt-24 bg-white rounded-[24px] shadow-xl border border-gray-100 p-8 md:p-10 mb-10 mx-4 md:mx-0">
          
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* ── LEFT COLUMN: DETAILS ── */}
            <div className="flex-1">
              {/* Badges */}
              <div className="flex gap-3 mb-4">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"/> Giveaway
                </span>
                <span className={`px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wide ${contest.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${contest.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}/> {contest.status}
                </span>
              </div>

              <h1 className="text-[28px] font-bold text-gray-900 mb-2 leading-tight">{contest.title}</h1>
              
              <div className="flex items-center gap-2 text-gray-500 text-[14px] mb-8 font-medium">
                <Calendar size={16} />
                <span>Deadline: {contest.deadline}</span>
              </div>

              {/* About */}
              <div className="mb-8">
                <h3 className="text-[16px] font-bold text-gray-900 mb-2">About this contest</h3>
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  {contest.description}
                </p>
              </div>

              {/* Rules */}
              <div>
                <h3 className="text-[16px] font-bold text-gray-900 mb-3">Rules & Requirment</h3>
                <ul className="space-y-3">
                  {[
                    "One vote per user per entry",
                    "Voting is open to all users",
                    "Entry with the most votes wins",
                    "Winner will be announced after contest ends"
                  ].map((rule, i) => (
                    <li key={i} className="flex items-center gap-3 text-[14px] text-gray-600">
                      <CheckCircle size={18} className="text-green-500 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── RIGHT COLUMN: STATS & PRIZE ── */}
            <div className="w-full lg:w-[360px] flex flex-col gap-5">
              <button className="w-full bg-[#A01C1C] hover:bg-[#8B1818] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-sm text-[14px]">
                <Share2 size={18} /> Share
              </button>

              <div className="bg-[#F6F7FB] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3 text-[#A01C1C]">
                  <Trophy size={18} />
                  <span className="text-[14px] font-bold text-gray-900">Grand Prize</span>
                </div>
                <p className="text-[18px] font-bold text-gray-900">{contest.prize}</p>
                <p className="text-[12px] text-gray-500 mt-1">Plus recognition on our platform</p>
              </div>

              <div className="bg-[#F6F7FB] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-5 text-[#A01C1C]">
                  <Trophy size={18} />
                  <span className="text-[14px] font-bold text-gray-900">Contest Stats</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-gray-500 text-[13px] font-medium">
                    <Users size={16} /> Participants
                  </div>
                  <span className="text-[13px] font-bold text-gray-900">{contest.participants} Person</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-500 text-[13px] font-medium">
                    <Clock size={16} /> Time left
                  </div>
                  <div className="flex gap-1.5 text-[11px] font-bold text-red-600 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm">
                    <span>0</span> : <span>0</span> : <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── CONDITIONAL SECTION: WINNER LOGIC ─── */}
          <div className="mt-12 border-t border-gray-100 pt-10">
            
            {/* Case: No Winner Yet */}
            {!contest.winnerDeclared && (
              <div className="w-full bg-[#F5F7FF] border border-[#E0E7FF] text-[#A01C1C] font-semibold text-center py-5 rounded-xl text-[16px] shadow-sm">
                Winner announcement coming soon!
              </div>
            )}

            {/* Case: Winner Declared */}
            {contest.winnerDeclared && contest.winner && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl p-4 flex items-start sm:items-center gap-4 mb-8">
                  <div className="bg-[#F59E0B] p-2 rounded-lg text-white shrink-0">
                    <Trophy size={20} fill="white" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#92400E]">Winner Declared!</h4>
                    <p className="text-[13px] text-[#B45309] mt-0.5">Results have been published by the organizer</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-2xl p-6 max-w-[600px] mx-auto shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-[16px] font-bold text-gray-800">Rank</h3>
                    <span className="text-[20px] font-bold text-gray-900">{contest.winner.rank}</span>
                  </div>
                  <div className="w-full h-[280px] rounded-xl overflow-hidden mb-5">
                    <img src={contest.winner.entryImage} alt="Winning Entry" className="w-full h-full object-cover" />
                  </div>
                  <div className="mb-4">
                    <span className="text-[11px] text-gray-400 font-medium block mb-1.5 uppercase tracking-wide">Submitted by</span>
                    <div className="flex items-center gap-3">
                      <img src={contest.winner.avatar} alt={contest.winner.name} className="w-8 h-8 rounded-full border border-gray-200" />
                      <span className="text-[14px] font-bold text-gray-900">{contest.winner.name}</span>
                    </div>
                  </div>
                  <div className="bg-[#FFFBEB] border border-[#FEF3C7] text-[#D97706] rounded-xl py-3 flex justify-center items-center gap-2 font-bold text-[14px]">
                    <Trophy size={18} /> Winner
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}