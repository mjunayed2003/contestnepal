"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Share2, Trophy, Clock, Users, 
  CheckCircle, Twitter, Mail, UploadCloud 
} from "lucide-react";

export default function GiveawayDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  // --- STATE ---
  const [step, setStep] = useState(0); // 0=Overview, 1=Tasks, 2=Upload, 3=Success
  const [loading, setLoading] = useState(false);
  
  // Task Validation State
  const [tasks, setTasks] = useState({ twitter: false, newsletter: false });
  
  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- MOCK DATA ---
  const contest = {
    id: params.id,
    title: "Weekly Gift Card Drop",
    deadline: "25 June 2026",
    status: "Active",
    description: "Weekly chance to win a $50 Amazon Gift Card. Complete simple tasks to enter.",
    prizeName: "$50 Amazon Gift Card",
    participants: 120,
    timeLeft: "25 : 16 : 55",
    image: "/images/contest1.jpg",
    hasJoined: false, // <--- Change to true to test "Joined" view
  };

  // --- HANDLERS ---
  const handleParticipate = () => {
    if (contest.hasJoined) return;
    setStep(1);
  };

  const handleTaskToggle = (task: keyof typeof tasks) => {
    setTasks(prev => ({ ...prev, [task]: !prev[task] }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFinalSubmit = () => {
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      // Redirect logic
      setTimeout(() => {
        // router.push("/dashboard"); 
      }, 3000);
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

      {/* Hero Image */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-8">
        <div className="relative w-full h-[250px] sm:h-[350px] rounded-[24px] overflow-hidden shadow-sm bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-80" />
            <Image src={contest.image} alt="Banner" fill className="object-cover opacity-80" priority />
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-[24px] shadow-xl border border-gray-100 p-6 sm:p-10 min-h-[500px]">
          
          {/* ================= STEP 0: OVERVIEW ================= */}
          {step === 0 && (
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1">
                <div className="flex gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide">Giveaway</span>
                  {contest.hasJoined ? (
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                      <CheckCircle size={14} /> Joined
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> {contest.status}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">{contest.title}</h1>
                <p className="flex items-center gap-2 text-gray-500 text-sm mb-8"><Clock size={16} /> Deadline: {contest.deadline}</p>

                {contest.hasJoined ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center gap-4 text-green-800 animate-in fade-in">
                        <CheckCircle size={32} />
                        <div>
                            <h4 className="font-bold">Entry Confirmed</h4>
                            <p className="text-sm">You have successfully joined this giveaway.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">About this contest</h3>
                            <p className="text-gray-600 leading-relaxed">{contest.description}</p>
                        </div>

                        <div className="bg-[#FFF5F7] rounded-xl p-5 border border-red-100">
                            <h4 className="font-bold text-[#A01C1C] flex items-center gap-2 mb-2"><Trophy size={18} /> How to participate</h4>
                            <p className="text-sm text-gray-600">Complete the tasks listed to earn your chance to win.</p>
                            <button onClick={handleParticipate} className="mt-4 px-6 py-3 bg-[#A01C1C] hover:bg-[#861717] text-white font-bold rounded-lg shadow-md transition-transform active:scale-95">Start Entry</button>
                        </div>
                    </>
                )}
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-[350px] shrink-0 space-y-5">
                <div className="flex gap-3 justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition"><Share2 size={16} /> Share</button>
                    {!contest.hasJoined && (
                        <button onClick={handleParticipate} className="px-5 py-2 rounded-lg bg-[#A01C1C] text-white font-bold text-sm shadow hover:bg-[#861717]">Participate Now</button>
                    )}
                </div>
                <div className="bg-[#F6F7FF] rounded-xl p-6">
                    <div className="flex items-center gap-2 text-[#5D5FEF] font-bold mb-3"><Trophy size={18} /> Grand Prize</div>
                    <h3 className="text-xl font-bold text-gray-900">{contest.prizeName}</h3>
                </div>
                <div className="bg-[#F8F9FB] rounded-xl p-6 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Users size={18} className="text-[#A01C1C]"/> Contest Stats</h4>
                    <div className="flex justify-between items-center mb-4 text-sm"><span className="text-gray-500">Participants</span><span className="font-bold text-gray-900">{contest.participants}</span></div>
                    <div className="flex justify-between items-center text-sm"><span className="text-gray-500">Time left</span><span className="text-red-600 font-mono font-bold bg-white px-2 py-1 rounded border border-gray-200">{contest.timeLeft}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 1: TASKS ================= */}
          {step === 1 && (
             <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Required Tasks</h2>
                    <p className="text-gray-500 text-sm mt-1">Complete these to continue</p>
                </div>

                <div className="space-y-4">
                    {/* Twitter Task */}
                    <div onClick={() => handleTaskToggle("twitter")} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${tasks.twitter ? "border-[#A01C1C] bg-red-50" : "border-gray-200 hover:border-gray-300"}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><Twitter size={20} /></div>
                            <div><p className="font-semibold text-gray-900">Follow on Twitter</p><p className="text-xs text-gray-500">@Contest_Official</p></div>
                        </div>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${tasks.twitter ? "bg-[#A01C1C] border-[#A01C1C]" : "border-gray-300"}`}>
                             {tasks.twitter && <CheckCircle size={14} className="text-white" />}
                        </div>
                    </div>

                    {/* Newsletter Task */}
                    <div onClick={() => handleTaskToggle("newsletter")} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${tasks.newsletter ? "border-[#A01C1C] bg-red-50" : "border-gray-200 hover:border-gray-300"}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center"><Mail size={20} /></div>
                            <div><p className="font-semibold text-gray-900">Subscribe Newsletter</p><p className="text-xs text-gray-500">Weekly updates</p></div>
                        </div>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${tasks.newsletter ? "bg-[#A01C1C] border-[#A01C1C]" : "border-gray-300"}`}>
                             {tasks.newsletter && <CheckCircle size={14} className="text-white" />}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <button onClick={() => setStep(0)} className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
                    <button 
                        onClick={() => setStep(2)} 
                        disabled={!tasks.twitter || !tasks.newsletter} // Validation
                        className={`flex-1 py-3 rounded-lg font-bold text-white shadow-lg transition-all ${(!tasks.twitter || !tasks.newsletter) ? "bg-gray-300 cursor-not-allowed" : "bg-[#A01C1C] hover:bg-[#861717]"}`}
                    >
                        Next Step
                    </button>
                </div>
             </div>
          )}

          {/* ================= STEP 2: UPLOAD ================= */}
          {step === 2 && (
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                <button onClick={() => setStep(1)} className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"><ArrowLeft size={16}/> Back</button>
                
                <h3 className="font-bold text-gray-800 mb-4">Upload Screenshot (Optional)</h3>
                
                {/* Hidden File Input */}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileSelect} 
                />

                <div 
                    onClick={() => fileInputRef.current?.click()} 
                    className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition cursor-pointer ${file ? "border-green-500 bg-green-50" : "border-gray-300 hover:bg-gray-50"}`}
                >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${file ? "bg-green-100 text-green-600" : "bg-red-50 text-[#A01C1C]"}`}>
                        {file ? <CheckCircle size={32} /> : <UploadCloud size={32} />}
                    </div>
                    <h4 className="text-lg font-bold text-gray-800">{file ? file.name : "Upload a file"}</h4>
                    <p className="text-xs text-gray-400 mt-2">{file ? "Click to change" : "PNG, JPG, GIF up to 10MB"}</p>
                </div>

                <button 
                    onClick={handleFinalSubmit}
                    disabled={loading}
                    className="w-full mt-8 py-3.5 bg-gradient-to-r from-[#A01C1C] to-[#800e0e] text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex justify-center items-center gap-2"
                >
                    {loading ? "Processing..." : "Confirm Entry"}
                </button>
            </div>
          )}

          {/* ================= STEP 3: SUCCESS ================= */}
          {step === 3 && (
            <div className="max-w-md mx-auto py-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm"><CheckCircle size={40} className="text-green-600" /></div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Entry Confirmed!</h2>
                <p className="text-gray-500 mb-8">Good luck! You've successfully entered the giveaway.</p>
                <div className="p-3 bg-gray-50 rounded text-sm text-gray-400 animate-pulse">Redirecting to dashboard...</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}