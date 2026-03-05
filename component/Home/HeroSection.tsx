"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFF0F3]">

      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,180,180,0.35)_0%,transparent_70%)] -z-10" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(200,170,255,0.2)_0%,transparent_70%)] -z-10" />

      <div className="max-w-[1560px] mx-auto flex flex-col lg:flex-row items-center justify-between">

        {/* ── LEFT ── */}
        <div className="flex-1 py-10 sm:py-14 lg:py-20 sm:px-8  text-center lg:text-left space-y-5 lg:space-y-6 z-10">

          <h1 className="text-[clamp(32px,5vw,68px)] font-black text-gray-900 leading-[1.12] tracking-tight">
            Join Exciting{" "}
            <span className="text-[#B01C1C]">Contests</span>
            {" "}& Win
            <br className="hidden lg:block" />
            {" "}Amazing Prizes
          </h1>

          <p className="text-sm sm:text-base md:text-[17px] text-gray-500 leading-relaxed max-w-[520px] mx-auto lg:mx-0">
            Participate in giveaways, showcase your creativity, vote for favorites,
            and compete with thousands of users worldwide. Your next big win starts here.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
            <button className="w-full sm:w-auto h-11 sm:h-12 px-7 rounded-lg bg-[#A01C1C] hover:bg-[#861717] active:bg-[#6e1212] text-white text-sm font-semibold shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer whitespace-nowrap">
              Explore Contests
            </button>
            <button className="w-full sm:w-auto h-11 sm:h-12 px-7 rounded-lg bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-sm font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap">
              Create Contests
            </button>
          </div>
        </div>

        {/* ── RIGHT IMAGE ── */}
        <div className="flex-1 relative flex justify-center lg:justify-end items-end w-full self-end">
          <Image
            src="/images/hero-image.png"
            alt="Winner holding trophy"
            width={815}
            height={728}
            priority
            className="object-contain object-bottom w-[815px] sm:w-[420px] md:w-[520px] lg:w-[680px] xl:w-[815px] h-auto"
            style={{
              maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
            }}
          />
        </div>

      </div>
    </section>
  );
}