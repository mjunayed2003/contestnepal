"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, UploadCloud, Calendar, Edit2, Plus, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── STEPS DEFINITION (4 Steps for Poll) ───
const steps = [
  { id: 1, label: "Poll Information" },
  { id: 2, label: "Poll Options" },
  { id: 3, label: "Poll Rules" },
  { id: 4, label: "Review & Publish" },
];

export default function PollContestPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-5xl mx-auto py-8 pb-20">
      
      {/* ─── STEPPER ─── */}
      <div className="flex items-center justify-between mb-16 relative px-4 md:px-20">
        {/* Connector Line */}
        <div className="absolute left-16 right-16 top-6 -translate-y-1/2 h-[1px] border-t-2 border-dashed border-gray-300 -z-10 hidden md:block" />
        
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-3 bg-[#F8F9FB] px-4 z-10">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
              currentStep >= step.id 
                ? "bg-[#A01C1C] text-white border-[#A01C1C]" 
                : "bg-[#E5E7EB] text-gray-500 border-gray-200"
            )}>
              {String(step.id).padStart(2, '0')}
            </div>
            <span className={cn(
              "text-xs font-bold whitespace-nowrap",
              currentStep >= step.id ? "text-[#A01C1C]" : "text-gray-500"
            )}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* ─── FORM CONTENT CARD ─── */}
      <Card className="border-gray-100 shadow-sm p-8 min-h-[500px] bg-white rounded-xl">
        {currentStep === 1 && <Step1PollInfo />}
        {currentStep === 2 && <Step2PollOptions />}
        {currentStep === 3 && <Step3PollRules />}
        {currentStep === 4 && <Step4Review />}
      </Card>

      {/* ─── NAVIGATION FOOTER ─── */}
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={currentStep === 1 ? () => router.back() : prevStep}
          className="h-12 px-10 border-red-100 text-[#A01C1C] hover:bg-red-50 hover:text-[#A01C1C] font-semibold rounded-lg"
        >
          <ArrowLeft size={18} className="mr-2" /> Back
        </Button>

        {currentStep === 4 ? (
          <Button 
            className="h-12 px-10 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-lg shadow-sm"
            onClick={() => router.push('/admin/contests')}
          >
            Publish Contest <ArrowRight size={18} className="ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={nextStep}
            className="h-12 px-10 bg-[#A01C1C] hover:bg-[#851616] text-white font-semibold rounded-lg shadow-sm"
          >
            Continue <ArrowRight size={18} className="ml-2" />
          </Button>
        )}
      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                SUB COMPONENTS                              */
/* -------------------------------------------------------------------------- */

// --- STEP 1: Poll Information ---
function Step1PollInfo() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Poll Information</h2>
      
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Contest Title <span className="text-red-500">*</span></label>
        <Input placeholder="Enter Contest Title" className="h-11 bg-white border-gray-200" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Description <span className="text-red-500">*</span></label>
        <Textarea placeholder="Detailed description of the contest..." className="bg-white min-h-[80px] border-gray-200" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Select Location <span className="text-red-500">*</span></label>
        <select className="w-full h-11 px-3 rounded-md border border-gray-200 bg-white text-sm text-gray-600 outline-none focus:ring-1 focus:ring-red-500">
          <option>Kathmandu</option>
          <option>Dhaka</option>
          <option>Global</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Rules & Guidelines <span className="text-red-500">*</span></label>
        <Textarea placeholder="Contest rules and participation guidelines..." className="bg-white min-h-[80px] border-gray-200" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Upload Banner or Image <span className="text-red-500">*</span></label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition-colors">
          <UploadCloud className="w-10 h-10 text-[#A01C1C] mb-3" />
          <p className="text-sm font-bold text-[#A01C1C]">Upload a file <span className="text-gray-500 font-normal">or drag & drop</span></p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF UP TO 10MB</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Poll Question <span className="text-red-500">*</span></label>
        <Input placeholder="What question do you want to ask?" className="h-11 bg-white border-gray-200" />
      </div>
    </div>
  );
}

// --- STEP 2: Poll Options ---
function Step2PollOptions() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Poll Options</h2>
      
      {[1, 2, 3, 4].map((num) => (
        <div key={num} className="space-y-1.5 relative">
          <label className="text-sm font-bold text-gray-700">Option {num} <span className="text-red-500">*</span></label>
          <div className="flex items-center gap-3">
            <Input placeholder={`Enter option ${num}`} className="h-11 bg-white border-gray-200" />
            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                <X size={18} />
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline" className="mt-2 border-dashed border-gray-300 text-gray-600 hover:border-[#A01C1C] hover:text-[#A01C1C]">
        <Plus size={16} className="mr-2" /> Add Option (max 6)
      </Button>

      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-xs text-yellow-700 mt-4">
        You must have at least 2 options and can add up to 6 options total.
      </div>
    </div>
  );
}

// --- STEP 3: Poll Rules ---
function Step3PollRules() {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
        <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Poll Rules</h2>
        
        {/* Info Box */}
        <div className="bg-[#EFF6FF] border border-blue-100 rounded-lg p-4">
          <h4 className="text-sm font-bold text-blue-800 mb-1">Voting Rules</h4>
          <p className="text-xs text-blue-600 leading-relaxed">
             One vote per user (locked) - This ensures fair polling results.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Poll Start Date <span className="text-red-500">*</span></label>
            <div className="relative">
              <Input placeholder="mm/dd/yyyy" className="h-11 bg-white pl-4 border-gray-200" />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Poll End Date <span className="text-red-500">*</span></label>
            <div className="relative">
              <Input placeholder="mm/dd/yyyy" className="h-11 bg-white pl-4 border-gray-200" />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700">Rules & Guidelines <span className="text-red-500">*</span></label>
            <Textarea placeholder="Additional rules or guidelines for poll participants" className="bg-white min-h-[100px] border-gray-200" />
        </div>
      </div>
    );
  }

// --- STEP 4: Review & Publish ---
function Step4Review() {
  const SectionHeader = ({ title, onEdit }: { title: string, onEdit?: () => void }) => (
    <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        <Button variant="ghost" className="text-[#A01C1C] hover:text-[#851616] h-auto p-0 text-xs hover:bg-transparent flex gap-1 font-medium">
            <Edit2 size={12} /> Edit
        </Button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Review & Publish (Poll)</h2>
      
      <div className="space-y-6">
        
        {/* Poll Information */}
        <div className="pb-2">
            <SectionHeader title="Poll Information" />
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                <p className="text-xs text-gray-500">Title: <span className="text-gray-400">............................</span></p>
                <p className="text-xs text-gray-500">Question: <span className="text-gray-400">............................</span></p>
            </div>
        </div>

        {/* Poll Options (Single Row Box) */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
             <span className="text-sm font-medium text-gray-700">Poll Options</span>
             <Button variant="ghost" className="text-[#A01C1C] hover:text-[#851616] h-auto p-0 text-xs hover:bg-transparent flex gap-1 font-medium">
                <Edit2 size={14} /> Edit
            </Button>
        </div>

        {/* Poll Rules */}
        <div className="pb-2">
            <SectionHeader title="Poll Rules" />
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                <p className="text-xs text-gray-500">Dates: <span className="text-gray-400">............................</span></p>
                <p className="text-xs text-gray-500">Voting: <span className="text-gray-600">One vote per user</span></p>
            </div>
        </div>

      </div>
    </div>
  );
}