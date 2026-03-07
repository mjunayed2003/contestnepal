"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trophy, Clock, Users, Settings, Plus, Search } from "lucide-react";

type ContestStatus = "Active" | "Ended" | "Draft" | "Winner Declared";
type ContestType = "Giveaway" | "Submissions" | "Poll";

interface ContestData {
  id: number;
  image: string;
  type: ContestType;
  title: string;
  prize: string;
  participants: number;
  submissions: number;
  startDate: string;
  endDate: string;
  status: ContestStatus;
}

const allContests: ContestData[] = [
  {
    id: 1, image: "/images/contest1.jpg", type: "Giveaway",
    title: "Win a Premium Gaming Setup", prize: "$2,500 Gaming PC + Accessories",
    participants: 127, submissions: 248,
    startDate: "01/02/2026", endDate: "01/03/2026", status: "Active",
  },
  {
    id: 2, image: "/images/contest2.jpg", type: "Submissions",
    title: "Best Couple Photography 2026", prize: "$1,000 Travel Voucher",
    participants: 127, submissions: 248,
    startDate: "01/02/2026", endDate: "01/03/2026", status: "Ended",
  },
  {
    id: 3, image: "/images/contest3.jpg", type: "Poll",
    title: "Vote for Next Product Feature", prize: "Early Access + Swag Pack",
    participants: 127, submissions: 248,
    startDate: "01/02/2026", endDate: "01/03/2026", status: "Ended",
  },
  {
    id: 4, image: "/images/contest1.jpg", type: "Giveaway",
    title: "Ultimate Streamer Bundle", prize: "Elgato Gear + Mic",
    participants: 45, submissions: 10,
    startDate: "01/02/2026", endDate: "01/03/2026", status: "Draft",
  },
  {
    id: 5, image: "/images/contest2.jpg", type: "Submissions",
    title: "Summer Vibes Photo Contest", prize: "Canon DSLR Camera",
    participants: 300, submissions: 290,
    startDate: "01/01/2026", endDate: "01/02/2026", status: "Winner Declared",
  },
  {
    id: 6, image: "/images/contest3.jpg", type: "Poll",
    title: "Community Choice Awards", prize: "Amazon Gift Cards",
    participants: 127, submissions: 248,
    startDate: "01/02/2026", endDate: "01/03/2026", status: "Active",
  },
];

const statusStyles: Record<ContestStatus, string> = {
  Active: "bg-emerald-50 text-emerald-600",
  Ended: "bg-red-50 text-red-500",
  Draft: "bg-gray-100 text-gray-600",
  "Winner Declared": "bg-purple-50 text-purple-600",
};
const statusDot: Record<ContestStatus, string> = {
  Active: "bg-emerald-500",
  Ended: "bg-red-500",
  Draft: "bg-gray-400",
  "Winner Declared": "bg-purple-500",
};

function ContestCard({ data, onManage }: { data: ContestData; onManage: (id: number, type: ContestType) => void; }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden h-full group">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={data.image} alt={data.title}
          width={400} height={220}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-800 text-[10px] uppercase font-bold px-3 py-1 rounded-md shadow-sm tracking-wide">
          {data.type}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-[17px] font-bold text-gray-900 leading-tight mb-3 line-clamp-1">{data.title}</h3>
        <div className="flex items-center gap-2 text-[13px] text-gray-600 font-medium mb-5">
          <Trophy className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="line-clamp-1">{data.prize}</span>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[12px] text-gray-500 mb-5">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>{data.participants} participants</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            <span>{data.submissions} submissions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>Start: {data.startDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>End: {data.endDate}</span>
          </div>
        </div>

        <div className="mb-5">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusStyles[data.status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[data.status]}`} />
            <span className="text-[11px] font-bold">{data.status}</span>
          </div>
        </div>

        <button
          onClick={() => onManage(data.id, data.type)}
          className="mt-auto w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-gradient-to-b from-[#b91c1c] to-[#991b1b] hover:from-[#a51b1b] hover:to-[#851818] text-white text-[14px] font-medium shadow-sm transition-all active:scale-[0.98]"
        >
          <Settings className="w-4 h-4" /> Manage
        </button>
      </div>
    </div>
  );
}

export default function MyContestsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("All Contests");
  const filters = ["All Contests", "Draft", "Active", "Closed", "Winner Declared"];

  const filteredData = allContests.filter((item) => {
    if (filter === "All Contests") return true;
    if (filter === "Closed") return item.status === "Ended";
    return item.status === filter;
  });

  const handleManage = (id: number, type: ContestType) => {
    const typeMap: Record<ContestType, string> = {
      Giveaway: "giveaway",
      Submissions: "submissions",
      Poll: "poll",
    };
    router.push(`/admin/contests/${typeMap[type]}/${id}`);
  };

  const handleCreateContest = () => {
    router.push("/admin/create");
  };

  return (
    <div className="min-h-screen bg-white p-8 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Contests</h1>
          <p className="text-gray-500 text-sm">Manage all your contests in one place</p>
        </div>
        <button
          onClick={handleCreateContest}
          className="flex items-center gap-2 bg-[#A01C1C] hover:bg-[#851717] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Contests
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${filter === item ? "bg-[#A01C1C] text-white shadow-sm" : "bg-[#F3F4F6] text-gray-600 hover:bg-gray-200"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((contest) => (
            <ContestCard key={contest.id} data={contest} onManage={handleManage} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-lg font-medium">No contests found</p>
          <p className="text-sm">Try changing the filter status.</p>
        </div>
      )}
    </div>
  );
}