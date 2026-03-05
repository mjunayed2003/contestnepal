"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Join",
    description:
      "Browse contests and find ones that match your interests. Sign up with just a few clicks and you're ready to participate.",
  },
  {
    number: "02",
    title: "Participate or Vote",
    description:
      "Complete tasks, submit your creative work, or vote for your favorite entries. Every action brings you closer to winning.",
  },
  {
    number: "03",
    title: "Win",
    description:
      "Winners are announced when contests end. Claim your prizes and celebrate your SUCCess with the community.",
  },
];

const tickerItems = ["GIVEAWAY", "SUBMISSION", "POLL"];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-white overflow-hidden">

      {/* Main Content */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-[50px] pt-14 sm:pt-20 pb-16 sm:pb-20">

        {/* Top Row: Badge + Button */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8 sm:mb-10">
          <div className="space-y-4">
            {/* Badge */}
            <div className="inline-block border border-[#A01C1C] text-[#A01C1C] text-sm font-semibold px-5 py-2 rounded-full">
              How It Works
            </div>
            {/* Heading */}
            <h2 className="text-[clamp(24px,4vw,42px)] font-black text-gray-900 tracking-tight leading-tight max-w-[560px]">
              Three simple steps to start winning
            </h2>
          </div>

          {/* Participate Now Button */}
          <div className="shrink-0">
            <button className="flex items-center gap-3 h-12 pl-6 pr-2 rounded-full bg-[#A01C1C] hover:bg-[#861717] text-white text-[14px] font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-md shadow-red-200">
              Participate Now
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4 text-[#A01C1C]" />
              </span>
            </button>
          </div>
        </div>

        {/* Staggered Cards */}
        <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="w-full lg:flex-1 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-7"
              style={{
                marginTop: i === 0 ? "0px" : i === 1 ? "clamp(0px, 4vw, 80px)" : "clamp(0px, 8vw, 160px)",
              }}
            >
              {/* Icon + Number Row */}
              <div className="flex items-start justify-between mb-8 sm:mb-10">
                {/* Hexagon Icon */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12">
                  <Image
                    src="/images/howitwork.svg"
                    alt="step icon"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Step Number */}
                <span className="text-[clamp(28px,4vw,48px)] font-black text-gray-200 leading-none select-none">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-900 mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] sm:text-[14px] text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="w-full bg-[#A01C1C] py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 6 }).flatMap((_, i) =>
            tickerItems.map((item) => (
              <span
                key={`${i}-${item}`}
                className="inline-flex items-center gap-3 mx-5 text-white text-[13px] sm:text-[14px] font-bold tracking-widest uppercase"
              >
                <svg className="w-3.5 h-3.5 text-white shrink-0" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0l1.8 5.5H16l-4.9 3.6L12.9 16 8 12.4 3.1 16l1.8-6.9L0 5.5h6.2z" />
                </svg>
                {item}
              </span>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </section>
  );
}