"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import ContestCard from "@/component/Contest-Card/ContestCard";

// Filter types defined here
type FilterType = "All Contests" | "Giveaways" | "Submissions" | "Pools";

const filters: FilterType[] = ["All Contests", "Giveaways", "Submissions", "Pools"];

// Mock Data (Categories must match exact spelling used in logic below)
const allContests = [
  { id: 1, image: "/images/contest1.jpg", badge: "Giveaway", title: "Win a Premium Gaming Setup", prize: "$2,500 Gaming PC", date: "Feb 15, 2025", participants: "1,145", status: "Active" as const, category: "Giveaways" },
  { id: 2, image: "/images/contest2.jpg", badge: "Photo", title: "Best Travel Photo Contest", prize: "$1,000 Voucher", date: "Feb 18, 2025", participants: "899", status: "Ended" as const, category: "Submissions" },
  { id: 3, image: "/images/contest3.jpg", badge: "Design", title: "UI/UX Design Challenge", prize: "MacBook Pro M3", date: "Mar 01, 2025", participants: "530", status: "Active" as const, category: "Submissions" },
  { id: 4, image: "/images/contest1.jpg", badge: "Pool", title: "Predict the Next Champion", prize: "$500 Cash", date: "Feb 20, 2025", participants: "2,400", status: "Active" as const, category: "Pools" },
  { id: 5, image: "/images/contest1.jpg", badge: "Giveaway", title: "Win a Premium Gaming Setup", prize: "$2,500 Gaming PC", date: "Feb 15, 2025", participants: "1,145", status: "Active" as const, category: "Giveaways" },
  { id: 6, image: "/images/contest2.jpg", badge: "Photo", title: "Best Travel Photo Contest", prize: "$1,000 Voucher", date: "Feb 18, 2025", participants: "899", status: "Ended" as const, category: "Submissions" },
  { id: 7, image: "/images/contest3.jpg", badge: "Design", title: "UI/UX Design Challenge", prize: "MacBook Pro M3", date: "Mar 01, 2025", participants: "530", status: "Active" as const, category: "Submissions" },
  { id: 8, image: "/images/contest1.jpg", badge: "Pool", title: "Predict the Next Champion", prize: "$500 Cash", date: "Feb 20, 2025", participants: "2,400", status: "Active" as const, category: "Pools" },
];

export default function ExploreContestsPage() {
  const router = useRouter();
  const [active, setActive] = useState<FilterType>("All Contests");
  const [search, setSearch] = useState("");

  const { isAuthenticated } = useSelector((state: any) => state.auth);

  // --- UPDATED LOGIC HERE ---
  // We now accept 'category' as a second parameter
  const handleContestClick = (contestId: number | string, category: string) => {

    // 1. Determine the path based on category
    let path = "";

    if (category === "Giveaways") {
      path = `/contests/giveaway/${contestId}`;
    } else if (category === "Submissions") {
      path = `/contests/submission/${contestId}`;
    } else if (category === "Pools") {
      path = `/contests/pool/${contestId}`;
    } else {
      // Fallback if category doesn't match
      path = `/contests/${contestId}`;
    }

    // 2. Auth Check & Redirect
    if (isAuthenticated) {
      router.push(path);
    } else {
      // Redirect to sign-in, then back to the specific contest page
      router.push(`/auth/sign-in?redirect=${encodeURIComponent(path)}`);
    }
  };

  const filtered = allContests.filter((c) => {
    const matchCategory = active === "All Contests" || (active === "Submissions" && c.category === "Submissions") || (active === "Giveaways" && c.category === "Giveaways") || (active === "Pools" && c.category === "Pools");

    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main className="w-full min-h-screen bg-white">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14">

        <div className="mb-6 space-y-1">
          <h1 className="text-[clamp(22px,3vw,32px)] font-black text-gray-900 tracking-tight">
            Explore Contests
          </h1>
          <p className="text-[14px] text-gray-400 max-w-[440px]">
            Join the excitement! Browse active contests or log in to participate.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`
                  px-5 py-2 rounded-lg text-[13px] font-semibold border transition-all duration-200
                  ${active === f
                    ? "bg-[#A01C1C] border-[#A01C1C] text-white shadow-md"
                    : "bg-white border-gray-200 text-gray-600 hover:border-[#A01C1C] hover:text-[#A01C1C]"
                  }
                `}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-auto sm:min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A01C1C]" />
            <input
              type="text"
              placeholder="Search contests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 text-[13px] text-gray-700 outline-none focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((contest) => (
              <ContestCard
                key={contest.id}
                {...contest}
                // --- UPDATED CALL HERE ---
                // Passing both ID and Category to the handler
                onViewContest={() => handleContestClick(contest.id, contest.category)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search className="w-12 h-12 mb-3 text-gray-200" />
            <p>No contests found matching your criteria.</p>
          </div>
        )}

      </div>
    </main>
  );
}