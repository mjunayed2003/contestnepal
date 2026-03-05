"use client";

import Image from "next/image";
import { Trophy, Clock, Users } from "lucide-react";

export type ContestStatus = "Active" | "Ended";

export interface ContestCardProps {
  id?: string | number;
  image: string;
  badge?: string;
  title: string;
  prize: string;
  date: string;
  participants: number | string;
  status: ContestStatus;
  onViewContest: () => void;
}

export default function ContestCard({
  image,
  badge = "Giveaway",
  title,
  prize,
  date,
  participants,
  status,
  onViewContest,
}: ContestCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">

      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden group">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
          {badge}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
        <h3 className="text-[16px] font-bold text-gray-900 leading-snug line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
          <Trophy className="w-3.5 h-3.5 text-[#A01C1C] shrink-0" />
          <span className="font-medium">{prize}</span>
        </div>

        <div className="flex items-center gap-4 text-[12px] text-gray-400 mt-1">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span>{participants} Joined</span>
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                <span className={`w-2 h-2 rounded-full shrink-0 ${status === "Active" ? "bg-green-500" : "bg-red-500"}`} />
                <span className={`text-[11px] font-bold uppercase tracking-wide ${status === "Active" ? "text-green-600" : "text-red-500"}`}>
                    {status}
                </span>
            </div>

            <button
                onClick={onViewContest}
                className="flex-1 h-9 rounded-lg bg-[#A01C1C] hover:bg-[#861717] text-white text-[13px] font-semibold transition-colors"
            >
                View Contest
            </button>
        </div>
      </div>
    </div>
  );
}