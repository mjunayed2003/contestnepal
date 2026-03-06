"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, UploadCloud, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Steps Definition
const steps = [
  { id: 1, label: "Basic Information" },
  { id: 2, label: "Participation Requirements" },
  { id: 3, label: "Winner Settings" },
  { id: 4, label: "Review & Publish" },
];

export default function GiveawayFormPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto py-6 pb-20">
      
      {/* Stepper */}
      <div className="flex items-center justify-between mb-16 relative px-10">
        {/* Connector Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gray-200 -z-10 hidden md:block" />
        
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-3 bg-[#F8F9FB] px-4">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
              currentStep >= step.id 
                ? "bg-[#A01C1C] text-white border-[#A01C1C]" 
                : "bg-white text-gray-400 border-gray-200"
            )}>
              {String(step.id).padStart(2, '0')}
            </div>
            <span className={cn(
              "text-xs font-semibold whitespace-nowrap",
              currentStep >= step.id ? "text-[#A01C1C]" : "text-gray-400"
            )}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card className="border-gray-100 shadow-sm p-8 min-h-[500px]">
        {currentStep === 1 && <Step1BasicInfo />}
        {currentStep === 2 && <Step2Requirements />}
        {currentStep === 3 && <Step3WinnerSettings />}
        {currentStep === 4 && <Step4Review />}
      </Card>

      {/* Navigation Footer */}
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={currentStep === 1 ? () => router.back() : prevStep}
          className="h-12 px-8 border-red-100 text-[#A01C1C] hover:bg-red-50 hover:text-[#A01C1C]"
        >
          <ArrowLeft size={16} className="mr-2" /> Back
        </Button>

        {currentStep === 4 ? (
          <Button 
            className="h-12 px-8 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => router.push('/admin/contests')} // Final action
          >
            Publish Contest <ArrowRight size={16} className="ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={nextStep}
            className="h-12 px-8 bg-[#A01C1C] hover:bg-[#851616] text-white"
          >
            Continue <ArrowRight size={16} className="ml-2" />
          </Button>
        )}
      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                SUB COMPONENTS                              */
/* -------------------------------------------------------------------------- */

function Step1BasicInfo() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Basic Contest Information</h2>
      
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Contest Title <span className="text-red-500">*</span></label>
        <Input placeholder="Enter Contest Title" className="h-11 bg-white" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Description <span className="text-red-500">*</span></label>
        <Textarea placeholder="Detailed description of the contest..." className="bg-white min-h-[100px]" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Select Location</label>
        <select className="w-full h-11 px-3 rounded-md border border-gray-200 bg-white text-sm outline-none focus:ring-1 focus:ring-red-500">
          <option>Kathmandu</option>
          <option>Dhaka</option>
          <option>Global</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Rules & Guidelines <span className="text-red-500">*</span></label>
        <Textarea placeholder="Contest rules and participation guidelines..." className="bg-white" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Upload Banner or Image <span className="text-red-500">*</span></label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer">
          <UploadCloud className="w-10 h-10 text-[#A01C1C] mb-3" />
          <p className="text-sm font-medium text-[#A01C1C]">Upload a file <span className="text-gray-600">or drag & drop</span></p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF UP TO 10MB</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Start Date <span className="text-red-500">*</span></label>
          <div className="relative">
            <Input placeholder="mm/dd/yyyy" className="h-11 bg-white pl-4" />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">End Date <span className="text-red-500">*</span></label>
          <div className="relative">
            <Input placeholder="mm/dd/yyyy" className="h-11 bg-white pl-4" />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Step2Requirements() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Participation Requirements</h2>
      
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Task Instructions <span className="text-red-500">*</span></label>
        <Textarea placeholder="Example: Follow our Facebook page and like the post..." className="bg-white h-[100px]" />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700">Submission Requirements <span className="text-red-500">*</span></label>
        <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-[#A01C1C] rounded border-gray-300 focus:ring-[#A01C1C]" />
                <span className="text-sm text-gray-600">Screenshot required</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-[#A01C1C] rounded border-gray-300 focus:ring-[#A01C1C]" />
                <span className="text-sm text-gray-600">Text input required</span>
            </label>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Max Submissions Per User</label>
        <Input defaultValue="01" className="h-11 bg-white" />
      </div>
    </div>
  );
}

function Step3WinnerSettings() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Winner Settings</h2>
      
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Number of Winners <span className="text-red-500">*</span></label>
        <Input defaultValue="01" className="h-11 bg-white" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Winner Selection Method</label>
        <div className="bg-[#F8F9FF] border border-blue-100 text-slate-600 px-4 py-3 rounded-md text-sm">
            Manual Selection (locked for giveaway contests)
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <label className="text-sm font-semibold text-gray-700">Announcement Schedule <span className="text-red-500">*</span></label>
        <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="schedule" defaultChecked className="w-4 h-4 text-[#A01C1C] border-gray-300 focus:ring-[#A01C1C]" />
                <span className="text-sm text-gray-600">Immediately after closing</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="schedule" className="w-4 h-4 text-[#A01C1C] border-gray-300 focus:ring-[#A01C1C]" />
                <span className="text-sm text-gray-600">Scheduled date</span>
            </label>
        </div>
        
        {/* Conditional Date Input could go here if "Scheduled date" selected */}
        <div className="relative mt-2">
            <Input placeholder="mm/dd/yyyy" className="h-11 bg-white pl-4" />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

function Step4Review() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Review & Publish (Giveaway Contest)</h2>
      
      <div className="space-y-6">
        {/* Section 1 */}
        <div className="pb-4 border-b border-gray-100">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-900">Basic Information</h3>
                <Button variant="ghost" className="text-[#A01C1C] h-auto p-0 text-xs hover:bg-transparent flex gap-1">Edit</Button>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-4 space-y-2">
                <p className="text-xs text-gray-500">Title: <span className="text-gray-800 ml-1">Summer Photography Challenge</span></p>
                <p className="text-xs text-gray-500">Dates: <span className="text-gray-800 ml-1">Aug 1, 2026 — Oct 31, 2026</span></p>
            </div>
        </div>

        {/* Section 2 */}
        <div className="pb-4 border-b border-gray-100">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-900">Participation Requirements</h3>
                <Button variant="ghost" className="text-[#A01C1C] h-auto p-0 text-xs hover:bg-transparent flex gap-1">Edit</Button>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-4 space-y-2">
                <p className="text-xs text-gray-500">Task: <span className="text-gray-800 ml-1">Follow Facebook & Upload Screenshot</span></p>
                <p className="text-xs text-gray-500">Max submissions: <span className="text-gray-800 ml-1">01</span></p>
            </div>
        </div>

        {/* Section 3 */}
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-900">Winner Settings</h3>
                <Button variant="ghost" className="text-[#A01C1C] h-auto p-0 text-xs hover:bg-transparent flex gap-1">Edit</Button>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-4 space-y-2">
                <p className="text-xs text-gray-500">Number of winners: <span className="text-gray-800 ml-1">01</span></p>
                <p className="text-xs text-gray-500">Selection: <span className="text-gray-800 ml-1">Manual Selection</span></p>
            </div>
        </div>
      </div>
    </div>
  );
}