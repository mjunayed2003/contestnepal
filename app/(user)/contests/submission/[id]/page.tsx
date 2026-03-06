"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Share2, Trophy, Clock, Users, 
  CheckCircle, UploadCloud, FileText, CheckSquare, AlertCircle 
} from "lucide-react";

export default function SubmissionDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  // --- STATE ---
  const [step, setStep] = useState(0); // 0 = Overview, 1 = Form, 2 = Success
  const [loading, setLoading] = useState(false);

  // Form States
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [agreed, setAgreed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- MOCK DATA ---
  const contest = {
    id: params.id,
    title: "Win a Premium Gaming Setup", // Using the title from your card
    type: "submission",
    deadline: "25 June 2026",
    status: "Active",
    description: "Best landscape photography wins! Results are now live. Submit your best shot of your gaming rig or landscape.",
    prizeName: "$2,500 Gaming PC + Accessories",
    participants: 1145,
    timeLeft: "25 : 36 : 55",
    image: "/images/contest1.jpg", // Ensure this path exists
    hasJoined: false, // Change to 'true' to see the "Joined" view
  };

  // --- HANDLERS ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      // Redirect Logic
      setTimeout(() => {
        // router.push("/dashboard"); 
      }, 3000);
    }, 2000);
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
                {/* Badges */}
                <div className="flex gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                    <FileText size={14} /> Submission
                  </span>
                  
                  {contest.hasJoined ? (
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                      <CheckCircle size={14} /> Submitted
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> {contest.status}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">{contest.title}</h1>
                <p className="flex items-center gap-2 text-gray-500 text-sm mb-8"><Clock size={16} /> Deadline: {contest.deadline}</p>

                {/* If already submitted */}
                {contest.hasJoined ? (
                   <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-center gap-4 text-blue-800 animate-in fade-in">
                      <div className="p-3 bg-blue-100 rounded-full"><FileText size={24} /></div>
                      <div>
                          <h4 className="font-bold">Submission Received</h4>
                          <p className="text-sm">Your entry is currently under review by the judges.</p>
                      </div>
                   </div>
                ) : (
                   // Normal View
                   <>
                      <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">About this contest</h3>
                        <p className="text-gray-600 leading-relaxed">{contest.description}</p>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Rules & Requirements</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                           <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Original work only</li>
                           <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Max 1000 words / High res image</li>
                           <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> English language supported</li>
                        </ul>
                      </div>

                      <div className="bg-[#FFF5F7] rounded-xl p-5 border border-red-100">
                        <h4 className="font-bold text-[#A01C1C] flex items-center gap-2 mb-2"><AlertCircle size={18} /> How to participate</h4>
                        <p className="text-sm text-gray-600">Submit your entry using the form. Make sure it meets all requirements. Our community will vote on the best submissions.</p>
                        <button onClick={() => setStep(1)} className="mt-4 px-6 py-3 bg-[#A01C1C] hover:bg-[#861717] text-white font-bold rounded-lg shadow-md transition-transform active:scale-95">
                           Start Entry
                        </button>
                      </div>
                   </>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="w-full lg:w-[350px] shrink-0 space-y-5">
                 <div className="flex gap-3 justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition"><Share2 size={16} /> Share</button>
                    {!contest.hasJoined && (
                        <button onClick={() => setStep(1)} className="px-5 py-2 rounded-lg bg-[#A01C1C] text-white font-bold text-sm shadow hover:bg-[#861717]">Participate Now</button>
                    )}
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
                    <div className="flex justify-between items-center text-sm mt-4"><span className="text-gray-500">Entries</span><span className="font-bold text-gray-900">50</span></div>
                </div>
              </div>
            </div>
          )}


          {/* ================= STEP 1: SUBMISSION FORM ================= */}
          {step === 1 && (
             <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Submit Entry</h2>
                    <p className="text-gray-500 text-sm mt-1">Upload your work for <span className="text-[#A01C1C] font-semibold">{contest.title}</span>.</p>
                </div>

                {/* File Upload Section */}
                <div className="space-y-6">
                    <div>
                        <p className="text-sm font-semibold text-gray-800 mb-2">Upload Image & File</p>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*,.pdf,.doc"
                            onChange={handleFileSelect} 
                        />
                        <div 
                            onClick={() => fileInputRef.current?.click()} 
                            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition cursor-pointer ${file ? "border-green-500 bg-green-50" : "border-gray-300 hover:bg-gray-50"}`}
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${file ? "bg-green-100 text-green-600" : "bg-white border shadow-sm text-[#A01C1C]"}`}>
                                {file ? <CheckCircle size={28} /> : <UploadCloud size={28} />}
                            </div>
                            <h4 className="text-lg font-bold text-gray-800">{file ? file.name : "Upload a file or drag & drop"}</h4>
                            <p className="text-xs text-gray-400 mt-1">{file ? "Click to replace" : "PNG, JPG, gif UP TO 10MB"}</p>
                        </div>
                    </div>

                    {/* Description Input */}
                    <div>
                        <p className="text-sm font-semibold text-gray-800 mb-2">Caption or Description</p>
                        <textarea 
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full h-32 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] transition"
                            placeholder="Tell us about yourself..."
                        ></textarea>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-3 p-2">
                        <div className="relative flex items-center">
                           <input 
                              type="checkbox" 
                              id="rules"
                              checked={agreed}
                              onChange={(e) => setAgreed(e.target.checked)}
                              className="w-5 h-5 accent-[#A01C1C] cursor-pointer" 
                           />
                        </div>
                        <label htmlFor="rules" className="text-sm text-gray-600 cursor-pointer select-none">
                            <span className="font-semibold text-gray-800 block">I agree to the rules</span>
                            I confirm this is my original work and I grant permission for it to be displayed.
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex gap-4">
                    <button 
                       onClick={() => setStep(0)} // Back to overview
                       className="w-full py-3.5 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition"
                    >
                       Cancel
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        disabled={!file || !agreed || loading}
                        className={`w-full py-3.5 text-white rounded-xl font-bold shadow-lg transition-all flex justify-center items-center gap-2
                            ${(!file || !agreed) ? "bg-gray-300 cursor-not-allowed" : "bg-[#A01C1C] hover:bg-[#861717]"}`}
                    >
                        {loading ? "Uploading..." : "Submit Entry"}
                    </button>
                </div>
             </div>
          )}


          {/* ================= STEP 2: SUCCESS VIEW ================= */}
          {step === 2 && (
            <div className="max-w-md mx-auto py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
                {/* Red Badge as per screenshot */}
                <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 bg-[#A01C1C] opacity-10 rounded-full animate-ping"></div>
                    <div className="relative w-full h-full bg-[#A01C1C] rounded-full flex items-center justify-center shadow-lg text-white">
                        <CheckCircle size={40} strokeWidth={3} />
                    </div>
                </div>
                
                <h2 className="text-3xl font-bold text-[#A01C1C] mb-2">Submission Received</h2>
                <p className="text-gray-500 font-medium mb-8">Your entry is now pending review. Good luck!</p>

                <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-400 animate-pulse">
                    Redirecting to dashboard...
                </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}