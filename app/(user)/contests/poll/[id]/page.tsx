"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Share2, Trophy, Clock, Users, 
  CheckCircle, Vote, AlertCircle 
} from "lucide-react";

export default function PollDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  // --- STATE ---
  const [step, setStep] = useState(0); // 0 = Overview, 1 = Vote, 2 = Results
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // --- MOCK DATA ---
  const contest = {
    id: params.id,
    title: "Community Choice: Next Feature",
    type: "poll",
    deadline: "28 Feb 2026",
    status: "Active",
    description: "Help us decide which feature to prioritize next. Every vote counts!",
    prizeName: "Community Recognition",
    participants: 2400,
    timeLeft: "02 : 05 : 10",
    image: "/images/contest3.jpg", // Ensure path exists
    hasJoined: false, // Change to 'true' to see Results view directly
    options: [
      { id: 1, label: "Dark Mode 2.0", percent: 60 },
      { id: 2, label: "Mobile App", percent: 20 },
      { id: 3, label: "API Access", percent: 20 },
    ]
  };

  // If user already joined, show results immediately
  React.useEffect(() => {
    if (contest.hasJoined) {
      setStep(2);
    }
  }, [contest.hasJoined]);

  // --- HANDLERS ---
  const handleVoteSubmit = () => {
    if (!selectedOption) return;
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setStep(2); // Go to Results
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20 font-sans">
      
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        <Link href="/contests" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#A01C1C] font-medium transition-colors">
          <ArrowLeft size={20} /> Back to contests
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-8">
        <div className="relative w-full h-[250px] sm:h-[350px] rounded-[24px] overflow-hidden shadow-sm bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-80" />
            <Image src={contest.image} alt="Banner" fill className="object-cover opacity-80" priority />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-[24px] shadow-xl border border-gray-100 p-6 sm:p-10 min-h-[500px]">
          
          {/* ================= STEP 0: OVERVIEW ================= */}
          {step === 0 && (
            <div className="flex flex-col lg:flex-row gap-10">
              
              {/* Left Content */}
              <div className="flex-1">
                <div className="flex gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <Vote size={14} /> Poll
                  </span>
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> {contest.status}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">{contest.title}</h1>
                <p className="flex items-center gap-2 text-gray-500 text-sm mb-8"><Clock size={16} /> Deadline: {contest.deadline}</p>

                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">About this contest</h3>
                    <p className="text-gray-600 leading-relaxed">{contest.description}</p>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Rules & Requirements</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> One vote per person</li>
                        <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Must be an active member</li>
                    </ul>
                </div>

                <div className="bg-[#FFF5F7] rounded-xl p-5 border border-red-100">
                    <h4 className="font-bold text-[#A01C1C] flex items-center gap-2 mb-2"><AlertCircle size={18} /> How to participate</h4>
                    <p className="text-sm text-gray-600">Simply cast your vote for your preferred option. You can only vote once.</p>
                    <button onClick={() => setStep(1)} className="mt-4 px-6 py-3 bg-[#A01C1C] hover:bg-[#861717] text-white font-bold rounded-lg shadow-md transition-transform active:scale-95">
                        Start Entry
                    </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-[350px] shrink-0 space-y-5">
                <div className="flex gap-3 justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition"><Share2 size={16} /> Share</button>
                    <button onClick={() => setStep(1)} className="px-5 py-2 rounded-lg bg-[#A01C1C] text-white font-bold text-sm shadow hover:bg-[#861717]">Participate Now</button>
                </div>

                <div className="bg-[#F6F7FF] rounded-xl p-6">
                    <div className="flex items-center gap-2 text-[#5D5FEF] font-bold mb-3"><Trophy size={18} /> Grand Prize</div>
                    <h3 className="text-xl font-bold text-gray-900">{contest.prizeName}</h3>
                    <p className="text-xs text-gray-500 mt-1">Plus recognition on our platform</p>
                </div>

                <div className="bg-[#F8F9FB] rounded-xl p-6 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Users size={18} className="text-[#A01C1C]"/> Contest Stats</h4>
                    <div className="flex justify-between items-center mb-4 text-sm"><span className="text-gray-500">Participants</span><span className="font-bold text-gray-900">{contest.participants} Person</span></div>
                    <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Time left</span><span className="text-red-600 font-mono font-bold bg-white px-2 py-1 rounded border border-gray-200">{contest.timeLeft}</span></div>
                </div>
              </div>
            </div>
          )}


          {/* ================= STEP 1: VOTE OPTIONS ================= */}
          {step === 1 && (
             <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">{contest.title}</h2>
                    <p className="text-gray-500 text-sm mt-1">Which feature should we prioritize?</p>
                </div>

                <div className="space-y-4">
                    {contest.options.map((option) => (
                        <div 
                            key={option.id}
                            onClick={() => setSelectedOption(option.id)}
                            className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedOption === option.id ? "border-[#A01C1C] bg-red-50 ring-1 ring-[#A01C1C]" : "border-gray-200 hover:border-gray-300"}`}
                        >
                            <span className="font-semibold text-gray-800">{option.label}</span>
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${selectedOption === option.id ? "border-[#A01C1C]" : "border-gray-300"}`}>
                                {selectedOption === option.id && <div className="w-3 h-3 rounded-full bg-[#A01C1C]"></div>}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <button 
                        onClick={handleVoteSubmit} 
                        disabled={!selectedOption || loading}
                        className={`w-full py-3.5 text-white rounded-xl font-bold shadow-lg transition-all flex justify-center items-center gap-2
                            ${(!selectedOption) ? "bg-gray-300 cursor-not-allowed" : "bg-[#A01C1C] hover:bg-[#861717]"}`}
                    >
                        {loading ? "Casting Vote..." : "Cast Vote"}
                    </button>
                </div>
             </div>
          )}


          {/* ================= STEP 2: RESULTS (SUCCESS) ================= */}
          {step === 2 && (
            <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
                
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">{contest.title}</h2>
                    <p className="text-gray-500 text-sm mt-1">Which feature should we prioritize?</p>
                </div>

                {/* Progress Bars */}
                <div className="space-y-6">
                    {contest.options.map((option) => {
                        const isVoted = selectedOption === option.id || (contest.hasJoined && option.id === 3); // Simulate previous vote if mock data says joined
                        return (
                            <div key={option.id}>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-semibold text-gray-800 text-sm">
                                        {option.label}
                                        {isVoted && <span className="text-[#A01C1C] ml-1">(You)</span>}
                                    </span>
                                    
                                    {/* Circle Percentage Badge */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 ${isVoted ? "border-[#A01C1C] text-[#A01C1C]" : "border-purple-200 text-purple-600"}`}>
                                        {option.percent}%
                                    </div>
                                </div>
                                
                                {/* Bar */}
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-1000 ${isVoted ? "bg-[#A01C1C]" : "bg-gray-300"}`} 
                                        style={{ width: `${option.percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Buttons */}
                <div className="mt-10 flex gap-4">
                    <button className="flex-1 py-3 bg-green-50 border border-green-200 text-green-700 font-bold rounded-lg">
                        Thanks for voting
                    </button>
                    <button 
                        onClick={() => router.push('/contests')}
                        className="flex-1 py-3 bg-[#A01C1C] text-white font-bold rounded-lg hover:bg-[#861717] transition-colors"
                    >
                        Back to Contests
                    </button>
                </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}