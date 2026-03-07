"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft, Calendar, Share2, Trophy, CheckCircle
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────
const POLL_DATA: Record<string, any> = {
  "default": {
    title: "World Cup Prediction Poll",
    deadline: "25 June 2026",
    status: "Active",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&q=80",
    participants: 120,
    grandPrize: "$500 Shared Poll",
    results: [
      { id: 1, label: "Team A", votes: 145, percentage: 60, isWinner: true },
      { id: 2, label: "Team B", votes: 95, percentage: 40, isWinner: false }
    ]
  },
  "201": {
    title: "World Cup Prediction Poll",
    deadline: "20 July 2026",
    status: "Active",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&q=80",
    participants: 500,
    grandPrize: "$1000 Poll",
    results: [
      { id: 1, label: "Brazil", votes: 300, percentage: 60, isWinner: false },
      { id: 2, label: "Argentina", votes: 200, percentage: 40, isWinner: false }
    ]
  },
  "202": {
    title: "Crypto Price Prediction",
    deadline: "30 Jan 2026",
    status: "Closed",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&q=80",
    participants: 1200,
    grandPrize: "1 BTC",
    results: [
      { id: 1, label: "Above $100k", votes: 800, percentage: 75, isWinner: true },
      { id: 2, label: "Below $100k", votes: 400, percentage: 25, isWinner: false }
    ]
  }
};

function PollResultCard({ item }: { item: any }) {
  return (
    <div className={`rounded-xl p-5 mb-4 border transition-all ${item.isWinner ? "border-yellow-400 bg-white shadow-[0_0_0_1px_rgba(250,204,21,0.4)]" : "border-gray-100 bg-white"}`}>
      <div className="flex items-center gap-2 mb-3">
        {item.isWinner && <Trophy size={18} className="text-yellow-500 fill-yellow-500" />}
        <h3 className={`text-[15px] font-bold ${item.isWinner ? 'text-gray-900' : 'text-gray-800'}`}>{item.label}</h3>
      </div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-[13px] text-gray-500 font-medium">{item.votes} votes</span>
        <span className="text-[13px] font-bold text-gray-900">{item.percentage}%</span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div style={{ width: `${item.percentage}%` }} className={`h-full rounded-full transition-all duration-1000 ease-out ${item.isWinner ? "bg-[#F59E0B]" : "bg-[#2563EB]"}`} />
      </div>
    </div>
  );
}

export default function PollDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? String(params.id) : "default";
  const data = POLL_DATA[id] || POLL_DATA["default"];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      
      {/* ─── NO NAVBAR ─── */}

      <main className="max-w-[1200px] mx-auto px-6 pt-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-[14px] font-medium mb-6 transition-colors">
          <ArrowLeft size={18} /> Back to contests
        </button>

        <div className="relative w-full h-[280px] rounded-t-[30px] overflow-hidden">
          <img src={data.image} alt="Poll Banner" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="relative -mt-20 bg-white rounded-[24px] shadow-lg border border-gray-100 p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
               <div className="flex gap-2 mb-3">
                  <span className="bg-purple-100 text-purple-700 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase">Poll</span>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase">{data.status}</span>
               </div>
               <h1 className="text-[26px] font-bold text-gray-900 mb-2">{data.title}</h1>
               <div className="flex items-center gap-2 text-gray-500 text-[13px] mb-6">
                 <Calendar size={15} /> <span>Deadline: {data.deadline}</span>
               </div>
               <div>
                 <h3 className="text-[15px] font-bold text-gray-900 mb-3">Rules</h3>
                 <ul className="space-y-2">
                    {["One vote per user", "Closest guess wins"].map((rule, i) => (
                      <li key={i} className="flex items-center gap-2 text-[13px] text-gray-600">
                        <CheckCircle size={15} className="text-green-500 shrink-0" /> {rule}
                      </li>
                    ))}
                 </ul>
               </div>
            </div>
            <div className="w-full lg:w-[320px] flex flex-col gap-4">
              <button className="w-full bg-[#A01C1C] text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 text-[14px]">
                <Share2 size={16} /> Share
              </button>
              <div className="bg-[#F6F7FB] rounded-xl p-5">
                 <div className="flex items-center gap-2 mb-3 text-[#A01C1C]">
                    <Trophy size={16} /> <span className="text-[13px] font-bold text-gray-900">Prize Poll</span>
                 </div>
                 <p className="text-[16px] font-bold text-gray-900">{data.grandPrize}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h2 className="text-[20px] font-bold text-gray-900 mb-6">Current Standing</h2>
          <div className="flex flex-col gap-1">
            {data.results.map((item: any) => <PollResultCard key={item.id} item={item} />)}
          </div>
        </div>
      </main>
    </div>
  );
}