"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Gift, Image as ImageIcon, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CreateContestPage() {
  const router = useRouter();

  const contestTypes = [
    {
      id: "giveaway",
      title: "Giveaway Contest",
      desc: "Task-based participation with manual winner selection",
      icon: Gift,
      color: "text-red-600 bg-red-50",
      active: true, // For demo purpose showing selected state
    },
    {
      id: "submission",
      title: "Content Submission + Voting",
      desc: "Users submit content and win based on votes",
      icon: ImageIcon,
      color: "text-blue-600 bg-blue-50",
      active: false,
    },
    {
      id: "poll",
      title: "Poll Contest",
      desc: "Single-question poll with real-time results",
      icon: BarChart3,
      color: "text-orange-600 bg-orange-50",
      active: false,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-6">
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900">Create New Contest</h1>
        <p className="text-gray-500 mt-1">Choose the type of contest you want to create</p>
      </div>

      {/* Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {contestTypes.map((type) => (
          <Link href={`/admin/create/${type.id}`} key={type.id}>
            <Card className={`
              h-full p-6 cursor-pointer transition-all hover:shadow-md border-2
              ${type.active ? "border-red-100 shadow-sm ring-1 ring-red-50" : "border-gray-100 hover:border-red-50"}
            `}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${type.color}`}>
                <type.icon size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{type.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Info Alert */}
      <div className="bg-[#F4F6FF] border border-[#E0E7FF] rounded-xl p-4 text-sm text-gray-700">
        <span className="font-bold text-[#A01C1C]">Important:</span> Once you select a contest category, it cannot be changed later. Choose carefully based on your contest goals.
      </div>

    </div>
  );
}