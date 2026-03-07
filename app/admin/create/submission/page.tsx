"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, UploadCloud, Calendar, Edit2, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── TYPES ────────────────────────────────────────────────────
interface FormData {
  // Step 1
  title: string;
  description: string;
  location: string;
  rules: string;
  banner: File | null;
  startDate: string;
  endDate: string;
  // Step 2
  requireImage: boolean;
  requireText: boolean;
  requireTextImage: boolean;
  maxSubmissions: string;
  // Step 3
  oneVotePerUser: boolean;
  publicLeaderboard: boolean;
  votingStartDate: string;
  votingEndDate: string;
}

const defaultForm: FormData = {
  title: "",
  description: "",
  location: "Current Location",
  rules: "",
  banner: null,
  startDate: "",
  endDate: "",
  requireImage: false,
  requireText: false,
  requireTextImage: false,
  maxSubmissions: "01",
  oneVotePerUser: false,
  publicLeaderboard: false,
  votingStartDate: "",
  votingEndDate: "",
};

// Steps Definition (5 Steps for Submission Contest)
const steps = [
  { id: 1, label: "Basic Information" },
  { id: 2, label: "Submission Rules" },
  { id: 3, label: "Voting Rules" },
  { id: 4, label: "Winner Logic" },
  { id: 5, label: "Review & Publish" },
];

export default function SubmissionContestPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormData>(defaultForm);

  const update = (field: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handlePublish = () => {
    console.log("Publishing contest:", form);
    router.push("/admin/contests");
  };

  return (
    <div className="max-w-5xl mx-auto py-8 pb-20">
      
      {/* ─── STEPPER ─── */}
      <div className="flex items-center justify-between mb-16 relative px-4 md:px-12">
        <div className="absolute left-10 right-10 top-6 -translate-y-1/2 h-[1px] border-t-2 border-dashed border-gray-300 -z-10 hidden md:block" />
        
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center gap-3 bg-[#F8F9FB] px-2 z-10 cursor-pointer"
            onClick={() => step.id < currentStep && setCurrentStep(step.id)}
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
              currentStep === step.id
                ? "bg-[#A01C1C] text-white border-[#A01C1C] ring-4 ring-[#A01C1C]/20"
                : currentStep > step.id
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
        {currentStep === 1 && <Step1BasicInfo form={form} update={update} />}
        {currentStep === 2 && <Step2SubmissionRules form={form} update={update} />}
        {currentStep === 3 && <Step3VotingRules form={form} update={update} />}
        {currentStep === 4 && <Step4WinnerLogic />}
        {currentStep === 5 && <Step5Review form={form} goToStep={setCurrentStep} />}
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

        {currentStep === 5 ? (
          <Button 
            className="h-12 px-10 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-lg shadow-sm"
            onClick={handlePublish}
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

// --- STEP 1: Basic Information ---
function Step1BasicInfo({
  form, update,
}: {
  form: FormData;
  update: (f: keyof FormData, v: FormData[keyof FormData]) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    update("banner", file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Basic Contest Information</h2>
      
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Contest Title <span className="text-red-500">*</span></label>
        <Input
          placeholder="Enter Contest Title"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="h-11 bg-white border-gray-200 focus-visible:ring-[#A01C1C]"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Description <span className="text-red-500">*</span></label>
        <Textarea
          placeholder="Detailed description of the contest..."
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="bg-white min-h-[100px] border-gray-200 focus-visible:ring-[#A01C1C]"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Select Location (Optional)</label>
        <select
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          className="w-full h-11 px-3 rounded-md border border-gray-200 bg-white text-sm text-gray-600 outline-none focus:ring-1 focus:ring-red-500"
        >
          <option>Current Location</option>
          <option>Kathmandu</option>
          <option>Dhaka</option>
          <option>Global</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Rules & Guidelines <span className="text-red-500">*</span></label>
        <Textarea
          placeholder="Contest rules and participation guidelines..."
          value={form.rules}
          onChange={(e) => update("rules", e.target.value)}
          className="bg-white min-h-[80px] border-gray-200 focus-visible:ring-[#A01C1C]"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Upload Banner or Image <span className="text-red-500">*</span></label>
        <label className="block cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <div className={cn(
            "border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors",
            preview ? "border-green-400 bg-green-50" : "border-gray-200"
          )}>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="preview" className="h-32 object-contain rounded-lg mb-2" />
            ) : (
              <UploadCloud className="w-10 h-10 text-[#A01C1C] mb-3" />
            )}
            <p className="text-sm font-bold text-[#A01C1C]">
              {form.banner ? form.banner.name : <>Upload a file <span className="text-gray-500 font-normal">or drag & drop</span></>}
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF UP TO 10MB</p>
          </div>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700">Start Date <span className="text-red-500">*</span></label>
          <div className="relative">
            <Input
              type="date"
              value={form.startDate}
              onChange={(e) => update("startDate", e.target.value)}
              className="h-11 bg-white pl-4 border-gray-200 focus-visible:ring-[#A01C1C]"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700">End Date <span className="text-red-500">*</span></label>
          <div className="relative">
            <Input
              type="date"
              value={form.endDate}
              min={form.startDate}
              onChange={(e) => update("endDate", e.target.value)}
              className="h-11 bg-white pl-4 border-gray-200 focus-visible:ring-[#A01C1C]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- STEP 2: Submission Rules ---
function Step2SubmissionRules({
  form, update,
}: {
  form: FormData;
  update: (f: keyof FormData, v: FormData[keyof FormData]) => void;
}) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Submission Rules</h2>
      
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Submission Requirements <span className="text-red-500">*</span></label>
        <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.requireImage}
              onChange={(e) => update("requireImage", e.target.checked)}
              className="w-4 h-4 accent-[#A01C1C] rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">Image</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.requireText}
              onChange={(e) => update("requireText", e.target.checked)}
              className="w-4 h-4 accent-[#A01C1C] rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">Text</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.requireTextImage}
              onChange={(e) => update("requireTextImage", e.target.checked)}
              className="w-4 h-4 accent-[#A01C1C] rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">Text + Image</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Max Submissions Per User</label>
        <Input
          type="number"
          min="1"
          value={form.maxSubmissions}
          onChange={(e) => update("maxSubmissions", e.target.value)}
          className="h-11 w-full mt-2 bg-white border-gray-200 focus-visible:ring-[#A01C1C]"
        />
      </div>
    </div>
  );
}

// --- STEP 3: Voting Rules ---
function Step3VotingRules({
  form, update,
}: {
  form: FormData;
  update: (f: keyof FormData, v: FormData[keyof FormData]) => void;
}) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Voting Rules</h2>
      
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Voting Options <span className="text-red-500">*</span></label>
        <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.oneVotePerUser}
              onChange={(e) => update("oneVotePerUser", e.target.checked)}
              className="w-4 h-4 accent-[#A01C1C] rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">One vote per user (recommended)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.publicLeaderboard}
              onChange={(e) => update("publicLeaderboard", e.target.checked)}
              className="w-4 h-4 accent-[#A01C1C] rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">Public leaderboard (show vote counts)</span>
          </label>
        </div>
      </div>
  
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700">Voting Start Date <span className="text-red-500">*</span></label>
          <div className="relative">
            <Input
              type="date"
              value={form.votingStartDate}
              min={form.startDate}
              onChange={(e) => update("votingStartDate", e.target.value)}
              className="h-11 bg-white pl-4 border-gray-200 focus-visible:ring-[#A01C1C]"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700">Voting End Date <span className="text-red-500">*</span></label>
          <div className="relative">
            <Input
              type="date"
              value={form.votingEndDate}
              min={form.votingStartDate || form.startDate}
              max={form.endDate}
              onChange={(e) => update("votingEndDate", e.target.value)}
              className="h-11 bg-white pl-4 border-gray-200 focus-visible:ring-[#A01C1C]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- STEP 4: Winner Logic ---
function Step4WinnerLogic() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Winner Logic</h2>
      
      <div className="bg-[#EF44440D] border border-blue-100 rounded-lg p-6">
        <h4 className="text-sm font-bold text-blue-800 mb-2">Automatic Winner Selection</h4>
        <p className="text-xs text-blue-600 leading-relaxed">
          Winner will be automatically determined based on highest votes. You will need to confirm the winner before results are published.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-sm text-gray-500">Winner Selection Method</span>
          <span className="text-sm font-medium text-gray-900">Highest Votes</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-sm text-gray-500">Organizer Confirmation</span>
          <span className="text-sm font-medium text-gray-900">Required</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-500">Tie-Breaking</span>
          <span className="text-sm font-medium text-gray-900">Manual Selection</span>
        </div>
      </div>
    </div>
  );
}

// --- STEP 5: Review & Publish ---
function Step5Review({
  form, goToStep,
}: {
  form: FormData;
  goToStep: (step: number) => void;
}) {
  const submissionType = [
    form.requireImage     && "Image",
    form.requireText      && "Text",
    form.requireTextImage && "Text + Image",
  ].filter(Boolean).join(", ") || "—";

  const SectionHeader = ({ title, step }: { title: string; step: number }) => (
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-bold text-gray-800">{title}</h3>
      <Button
        variant="ghost"
        onClick={() => goToStep(step)}
        className="text-[#A01C1C] hover:text-[#851616] h-auto p-0 text-xs hover:bg-transparent flex gap-1 font-medium"
      >
        <Edit2 size={12} /> Edit
      </Button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Review & Publish (Content Submission + Voting Contest)</h2>
      
      <div className="space-y-6">
        
        {/* Basic Info */}
        <div className="pb-2">
          <SectionHeader title="Basic Information" step={1} />
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
            <p className="text-xs text-gray-500">Title: <span className="text-gray-800 ml-1">{form.title || "—"}</span></p>
            <p className="text-xs text-gray-500">Location: <span className="text-gray-800 ml-1">{form.location || "—"}</span></p>
            <p className="text-xs text-gray-500">Dates: <span className="text-gray-800 ml-1">
              {form.startDate && form.endDate ? `${form.startDate} — ${form.endDate}` : "—"}
            </span></p>
            <p className="text-xs text-gray-500">Banner: <span className="text-gray-800 ml-1">{form.banner?.name || "—"}</span></p>
          </div>
        </div>

        {/* Submission Rules */}
        <div className="pb-2">
          <SectionHeader title="Submission Rules" step={2} />
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
            <p className="text-xs text-gray-500">Type: <span className="text-gray-800 ml-1">{submissionType}</span></p>
            <p className="text-xs text-gray-500">Max submissions: <span className="text-gray-800 ml-1">{form.maxSubmissions || "—"}</span></p>
          </div>
        </div>

        {/* Voting Rules */}
        <div className="pb-2">
          <SectionHeader title="Voting Rules" step={3} />
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
            <p className="text-xs text-gray-500">One vote per user: <span className="text-gray-800 ml-1">{form.oneVotePerUser ? "Yes" : "No"}</span></p>
            <p className="text-xs text-gray-500">Public leaderboard: <span className="text-gray-800 ml-1">{form.publicLeaderboard ? "Yes" : "No"}</span></p>
            <p className="text-xs text-gray-500">Voting dates: <span className="text-gray-800 ml-1">
              {form.votingStartDate && form.votingEndDate ? `${form.votingStartDate} — ${form.votingEndDate}` : "—"}
            </span></p>
          </div>
        </div>

        {/* Winner Logic */}
        <div className="pb-2">
          <SectionHeader title="Winner Logic" step={4} />
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
            <p className="text-xs text-gray-500">Selection: <span className="text-gray-800 ml-1">Highest Votes</span></p>
            <p className="text-xs text-gray-500">Confirmation: <span className="text-gray-800 ml-1">Required</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}