"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, UploadCloud, Calendar, Edit2, Plus, X, AlertCircle } from "lucide-react";
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
  question: string;
  // Step 2
  options: string[];
  // Step 3
  pollStartDate: string;
  pollEndDate: string;
  pollRules: string;
}

const defaultForm: FormData = {
  title: "",
  description: "",
  location: "Global",
  rules: "",
  banner: null,
  question: "",
  options: ["", ""],
  pollStartDate: "",
  pollEndDate: "",
  pollRules: "",
};

// ─── STEPS ────────────────────────────────────────────────────
const steps = [
  { id: 1, label: "Poll Information" },
  { id: 2, label: "Poll Options" },
  { id: 3, label: "Poll Rules" },
  { id: 4, label: "Review & Publish" },
];

export default function PollContestPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormData>(defaultForm);

  const update = (field: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handlePublish = () => {
    console.log("Publishing poll:", form);
    router.push("/admin/contests");
  };

  return (
    <div className="max-w-5xl mx-auto py-8 pb-20">
      
      {/* ─── STEPPER ─── */}
      <div className="flex items-center justify-between mb-16 relative px-4 md:px-20">
        <div className="absolute left-16 right-16 top-6 -translate-y-1/2 h-[1px] border-t-2 border-dashed border-gray-300 -z-10 hidden md:block" />
        
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center gap-3 bg-[#F8F9FB] px-4 z-10 cursor-pointer"
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
        {currentStep === 1 && <Step1PollInfo form={form} update={update} />}
        {currentStep === 2 && <Step2PollOptions form={form} update={update} />}
        {currentStep === 3 && <Step3PollRules form={form} update={update} />}
        {currentStep === 4 && <Step4Review form={form} goToStep={setCurrentStep} />}
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

// --- STEP 1: Poll Information ---
function Step1PollInfo({
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
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Poll Information</h2>
      
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Contest Title <span className="text-red-500">*</span></label>
        <Input
          placeholder="Enter Contest Title"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="h-11 bg-white border-gray-200"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Description <span className="text-red-500">*</span></label>
        <Textarea
          placeholder="Detailed description of the contest..."
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="bg-white min-h-[80px] border-gray-200"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Select Location <span className="text-red-500">*</span></label>
        <select
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          className="w-full h-11 px-3 rounded-md border border-gray-200 bg-white text-sm text-gray-600 outline-none focus:ring-1 focus:ring-red-500"
        >
          <option>Global</option>
          <option>Kathmandu</option>
          <option>Dhaka</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Rules & Guidelines <span className="text-red-500">*</span></label>
        <Textarea
          placeholder="Contest rules and participation guidelines..."
          value={form.rules}
          onChange={(e) => update("rules", e.target.value)}
          className="bg-white min-h-[80px] border-gray-200"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Upload Banner or Image <span className="text-red-500">*</span></label>
        <label className="block cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <div className={cn(
            "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors",
            preview ? "border-green-400 bg-green-50" : "border-gray-200"
          )}>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="preview" className="h-28 object-contain rounded-lg mb-2" />
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

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Poll Question <span className="text-red-500">*</span></label>
        <Input
          placeholder="What question do you want to ask?"
          value={form.question}
          onChange={(e) => update("question", e.target.value)}
          className="h-11 bg-white border-gray-200"
        />
      </div>
    </div>
  );
}

// --- STEP 2: Poll Options ---
function Step2PollOptions({
  form, update,
}: {
  form: FormData;
  update: (f: keyof FormData, v: FormData[keyof FormData]) => void;
}) {
  const MAX_OPTIONS = 6;

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...form.options];
    updated[index] = value;
    update("options", updated);
  };

  const addOption = () => {
    if (form.options.length < MAX_OPTIONS) {
      update("options", [...form.options, ""]);
    }
  };

  const removeOption = (index: number) => {
    if (form.options.length <= 2) return; // minimum 2 options
    const updated = form.options.filter((_, i) => i !== index);
    update("options", updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Poll Options</h2>
      
      {form.options.map((option, index) => (
        <div key={index} className="space-y-1.5 relative">
          <label className="text-sm font-bold text-gray-700">
            Option {index + 1} <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <Input
              placeholder={`Enter option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="h-11 bg-white border-gray-200"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeOption(index)}
              disabled={form.options.length <= 2}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <X size={18} />
            </Button>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        onClick={addOption}
        disabled={form.options.length >= MAX_OPTIONS}
        className="mt-2 border-dashed border-gray-300 text-gray-600 hover:border-[#A01C1C] hover:text-[#A01C1C] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Plus size={16} className="mr-2" /> Add Option (max 6)
      </Button>

      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-xs text-yellow-700 mt-4">
        You must have at least 2 options and can add up to 6 options total.
      </div>
    </div>
  );
}

// --- STEP 3: Poll Rules ---
function Step3PollRules({
  form, update,
}: {
  form: FormData;
  update: (f: keyof FormData, v: FormData[keyof FormData]) => void;
}) {
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
            <Input
              type="date"
              value={form.pollStartDate}
              onChange={(e) => update("pollStartDate", e.target.value)}
              className="h-11 bg-white pl-4 border-gray-200"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700">Poll End Date <span className="text-red-500">*</span></label>
          <div className="relative">
            <Input
              type="date"
              value={form.pollEndDate}
              min={form.pollStartDate}
              onChange={(e) => update("pollEndDate", e.target.value)}
              className="h-11 bg-white pl-4 border-gray-200"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700">Rules & Guidelines <span className="text-red-500">*</span></label>
        <Textarea
          placeholder="Additional rules or guidelines for poll participants"
          value={form.pollRules}
          onChange={(e) => update("pollRules", e.target.value)}
          className="bg-white min-h-[100px] border-gray-200"
        />
      </div>
    </div>
  );
}

// --- STEP 4: Review & Publish ---
function Step4Review({
  form, goToStep,
}: {
  form: FormData;
  goToStep: (step: number) => void;
}) {
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

  const filledOptions = form.options.filter((o) => o.trim() !== "");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C] mb-6">Review & Publish (Poll)</h2>
      
      <div className="space-y-6">

        {/* Poll Information */}
        <div className="pb-2">
          <SectionHeader title="Poll Information" step={1} />
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
            <p className="text-xs text-gray-500">Title: <span className="text-gray-800 ml-1">{form.title || "—"}</span></p>
            <p className="text-xs text-gray-500">Question: <span className="text-gray-800 ml-1">{form.question || "—"}</span></p>
            <p className="text-xs text-gray-500">Location: <span className="text-gray-800 ml-1">{form.location || "—"}</span></p>
            <p className="text-xs text-gray-500">Banner: <span className="text-gray-800 ml-1">{form.banner?.name || "—"}</span></p>
          </div>
        </div>

        {/* Poll Options */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">
              Poll Options <span className="text-gray-400 text-xs ml-1">({filledOptions.length} added)</span>
            </span>
            <Button
              variant="ghost"
              onClick={() => goToStep(2)}
              className="text-[#A01C1C] hover:text-[#851616] h-auto p-0 text-xs hover:bg-transparent flex gap-1 font-medium"
            >
              <Edit2 size={14} /> Edit
            </Button>
          </div>
          {filledOptions.length > 0 ? (
            <ul className="space-y-1">
              {filledOptions.map((opt, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#A01C1C]/10 text-[#A01C1C] flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
                  {opt}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-400">No options added yet.</p>
          )}
        </div>

        {/* Poll Rules */}
        <div className="pb-2">
          <SectionHeader title="Poll Rules" step={3} />
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
            <p className="text-xs text-gray-500">Dates: <span className="text-gray-800 ml-1">
              {form.pollStartDate && form.pollEndDate ? `${form.pollStartDate} — ${form.pollEndDate}` : "—"}
            </span></p>
            <p className="text-xs text-gray-500">Voting: <span className="text-gray-800 ml-1">One vote per user</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}