"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ContestCard from "../Contest-Card/ContestCard";
import { ChevronsRight } from "lucide-react";

// Data kept exactly as requested (Added IDs for routing)
const trendingContests = [
  {
    id: 101,
    image: "/images/contest1.jpg",
    badge: "Giveaway",
    title: "Win a Premium Gaming Setup",
    prize: "$2,500 Gaming PC + Accessories",
    date: "Feb 15, 2025",
    participants: "1,145",
    status: "Active" as const,
  },
  {
    id: 102,
    image: "/images/contest2.jpg",
    badge: "Giveaway",
    title: "Best Travel Photo Contest",
    prize: "$1,000 Travel Voucher",
    date: "Feb 15, 2025",
    participants: "899",
    status: "Ended" as const,
  },
  {
    id: 103,
    image: "/images/contest3.jpg",
    badge: "Giveaway",
    title: "Best Travel Photo Contest",
    prize: "$1,000 Travel Voucher",
    date: "Feb 15, 2025",
    participants: "899",
    status: "Active" as const,
  },
  {
    id: 104,
    image: "/images/contest1.jpg",
    badge: "Giveaway",
    title: "Win a Premium Gaming Setup",
    prize: "$2,500 Gaming PC + Accessories",
    date: "Feb 15, 2025",
    participants: "1,145",
    status: "Active" as const,
  },
  {
    id: 105,
    image: "/images/contest2.jpg",
    badge: "Giveaway",
    title: "Best Travel Photo Contest",
    prize: "$1,000 Travel Voucher",
    date: "Feb 15, 2025",
    participants: "899",
    status: "Ended" as const,
  },
  {
    id: 106,
    image: "/images/contest3.jpg",
    badge: "Giveaway",
    title: "Best Travel Photo Contest",
    prize: "$1,000 Travel Voucher",
    date: "Feb 15, 2025",
    participants: "899",
    status: "Active" as const,
  },
];

export default function TrendingNow() {
  const router = useRouter();
  
  // Auth Check
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  // Navigation Logic
  const handleViewContest = (id: number) => {
    if (isAuthenticated) {
      router.push(`/contests/${id}`);
    } else {
      router.push("/auth/sign-in");
    }
  };

  return (
    <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-8">
      <div className="max-w-[1560px] mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 space-y-2">
          <h2 className="text-[clamp(26px,4vw,40px)] font-black text-gray-900 tracking-tight flex items-center justify-center gap-2">
            🔥 Trending Now
          </h2>
          <p className="text-[14px] sm:text-[15px] text-gray-400">
            Don&apos;t miss out on these active contests ending soon.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {trendingContests.map((contest, i) => (
            <ContestCard 
              key={i} 
              {...contest} 
              // Pass the click handler
              onViewContest={() => handleViewContest(contest.id)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <button 
            onClick={() => router.push('/contests')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#A01C1C] text-[#A01C1C] text-sm font-semibold hover:bg-red-50 transition-colors duration-200 cursor-pointer"
          >
            View All Contests
            <span className="w-6 h-6 rounded-full bg-[#A01C1C] flex items-center justify-center">
              <ChevronsRight className="w-3.5 h-3.5 text-white" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}