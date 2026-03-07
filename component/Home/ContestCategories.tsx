"use client";

import { ChevronsRight } from "lucide-react";

const categories = [
  {
    title: "Giveaways",
    description: "Simple task-based contests. Follow, share, and enter for a chance to win random draws.",
    count: "45 active contests",
    browseLabel: "Browse Giveaways",
  },
  {
    title: "Creative Submissions",
    description: "Upload photos, designs, or text. Let the community vote on your work to win prizes.",
    count: "45 active contests",
    browseLabel: "Browse Submission",
  },
  {
    title: "Polls & Voting",
    description: "Cast your vote on trending topics. Instant results and participation rewards.",
    count: "45 active contests",
    browseLabel: "Browse Poll",
  },
];

export default function ContestCategories() {
  return (
    <section className="w-full bg-[#FFFFFF] py-16 sm:py-20 px-4 sm:px-8">
      <div className="max-w-[1560px] mx-auto">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-14 space-y-3">
          <h2 className="text-[clamp(28px,4vw,44px)] font-black text-gray-900 tracking-tight">
            Contest Categories
          </h2>
          <p className="text-[15px] sm:text-[16px] text-gray-400">
            Choose your favorite type and start participating today
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="relative rounded-2xl border border-gray-100 bg-white p-7 sm:p-8 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Watermark icon */}
              <div
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[180px] sm:text-[200px] font-black text-[#A01C1C]/[0.04] select-none leading-none"
                aria-hidden="true"
              >
                ❯❯
              </div>

              {/* Icon box */}
              <div className="w-12 h-12 rounded-xl bg-[#A01C1C] flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-[20px] sm:text-[22px] font-bold text-gray-900 mb-3">
                {cat.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-gray-400 leading-relaxed mb-8">
                {cat.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-[13px] sm:text-[14px] text-gray-400">
                  {cat.count}
                </span>
                <button className="flex items-center gap-1 text-[#A01C1C] text-[13px] sm:text-[14px] font-semibold hover:gap-2 transition-all duration-200 cursor-pointer">
                  {cat.browseLabel}
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}