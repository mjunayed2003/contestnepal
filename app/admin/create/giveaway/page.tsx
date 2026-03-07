"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, UploadCloud, Calendar, Pencil } from "lucide-react";
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
  taskInstructions: string;
  requireScreenshot: boolean;
  requireText: boolean;
  maxSubmissions: string;
  // Step 3
  numberOfWinners: string;
  announcementSchedule: "immediately" | "scheduled";
  announcementDate: string;
}

const steps = [
  { id: 1, label: "Basic Information" },
  { id: 2, label: "Participation Requirements" },
  { id: 3, label: "Winner Settings" },
  { id: 4, label: "Review & Publish" },
];

const defaultForm: FormData = {
  title: "",
  description: "",
  location: "Global",
  rules: "",
  banner: null,
  startDate: "",
  endDate: "",
  taskInstructions: "",
  requireScreenshot: false,
  requireText: false,
  maxSubmissions: "01",
  numberOfWinners: "01",
  announcementSchedule: "immediately",
  announcementDate: "",
};

export default function GiveawayFormPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormData>(defaultForm);

  const update = (field: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handlePublish = () => {
    console.log("Publishing contest:", form);
    router.push("/admin/contests");
  };

  return (
    <div className="max-w-4xl mx-auto py-6 pb-20">

      {/* Stepper */}
      <div className="flex items-center justify-between mb-16 relative px-10">
        <div className="absolute left-10 right-10 top-6 h-[1px] bg-gray-200 -z-10 hidden md:block" />

        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center gap-3 bg-[#F8F9FB] px-4 cursor-pointer"
            onClick={() => step.id < currentStep && setCurrentStep(step.id)}
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-200",
              currentStep > step.id  && "bg-[#A01C1C] text-white border-[#A01C1C]",
              currentStep === step.id && "bg-[#A01C1C] text-white border-[#A01C1C] ring-4 ring-[#A01C1C]/20",
              currentStep < step.id  && "bg-white text-gray-400 border-gray-200",
            )}>
              {String(step.id).padStart(2, "0")}
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
        {currentStep === 1 && <Step1BasicInfo form={form} update={update} />}
        {currentStep === 2 && <Step2Requirements form={form} update={update} />}
        {currentStep === 3 && <Step3WinnerSettings form={form} update={update} />}
        {currentStep === 4 && <Step4Review form={form} goToStep={setCurrentStep} />}
      </Card>

      {/* Navigation */}
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
            onClick={handlePublish}
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

// ─── STEP 1 ───────────────────────────────────────────────────
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
      <h2 className="text-xl font-bold text-[#A01C1C]">Basic Contest Information</h2>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">
          Contest Title <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="Enter Contest Title"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="h-11 bg-white focus-visible:ring-[#A01C1C]"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <Textarea
          placeholder="Detailed description of the contest..."
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="bg-white min-h-[100px] focus-visible:ring-[#A01C1C]"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Select Location</label>
        <select
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          className="w-full h-11 px-3 rounded-md border border-gray-200 bg-white text-sm outline-none focus:ring-1 focus:ring-[#A01C1C]"
        >
          <option>Global</option>
          <option>Kathmandu</option>
          <option>Dhaka</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">
          Rules & Guidelines <span className="text-red-500">*</span>
        </label>
        <Textarea
          placeholder="Contest rules and participation guidelines..."
          value={form.rules}
          onChange={(e) => update("rules", e.target.value)}
          className="bg-white focus-visible:ring-[#A01C1C]"
        />
      </div>

      {/* Banner Upload */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">
          Upload Banner or Image <span className="text-red-500">*</span>
        </label>
        <label className="block">
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <div className={cn(
            "border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors",
            preview ? "border-green-400 bg-green-50" : "border-gray-200 hover:bg-gray-50"
          )}>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="preview" className="h-32 object-contain rounded-lg mb-2" />
            ) : (
              <UploadCloud className="w-10 h-10 text-[#A01C1C] mb-3" />
            )}
            <p className="text-sm font-medium text-[#A01C1C]">
              {form.banner ? form.banner.name : <>Upload a file <span className="text-gray-600">or drag & drop</span></>}
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF UP TO 10MB</p>
          </div>
        </label>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Start Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type="date"
              value={form.startDate}
              onChange={(e) => update("startDate", e.target.value)}
              className="h-11 bg-white focus-visible:ring-[#A01C1C]"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">
            End Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type="date"
              value={form.endDate}
              min={form.startDate}
              onChange={(e) => update("endDate", e.target.value)}
              className="h-11 bg-white focus-visible:ring-[#A01C1C]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STEP 2 ───────────────────────────────────────────────────
function Step2Requirements({
  form, update,
}: {
  form: FormData;
  update: (f: keyof FormData, v: FormData[keyof FormData]) => void;
}) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C]">Participation Requirements</h2>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">
          Task Instructions <span className="text-red-500">*</span>
        </label>
        <Textarea
          placeholder="Example: Follow our Facebook page and like the post..."
          value={form.taskInstructions}
          onChange={(e) => update("taskInstructions", e.target.value)}
          className="bg-white h-[100px] focus-visible:ring-[#A01C1C]"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700">
          Submission Requirements <span className="text-red-500">*</span>
        </label>
        <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.requireScreenshot}
              onChange={(e) => update("requireScreenshot", e.target.checked)}
              className="w-4 h-4 accent-[#A01C1C] rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">Screenshot required</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.requireText}
              onChange={(e) => update("requireText", e.target.checked)}
              className="w-4 h-4 accent-[#A01C1C] rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">Text input required</span>
          </label>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Max Submissions Per User</label>
        <Input
          type="number"
          min="1"
          value={form.maxSubmissions}
          onChange={(e) => update("maxSubmissions", e.target.value)}
          className="h-11 mt-2 bg-white w-full focus-visible:ring-[#A01C1C]"
        />
      </div>
    </div>
  );
}

// ─── STEP 3 ───────────────────────────────────────────────────
function Step3WinnerSettings({
  form, update,
}: {
  form: FormData;
  update: (f: keyof FormData, v: FormData[keyof FormData]) => void;
}) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C]">Winner Settings</h2>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">
          Number of Winners <span className="text-red-500">*</span>
        </label>
        <Input
          type="number"
          min="1"
          value={form.numberOfWinners}
          onChange={(e) => update("numberOfWinners", e.target.value)}
          className="h-11 bg-white w-full mt-2 focus-visible:ring-[#A01C1C]"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Winner Selection Method</label>
        <div className="bg-[#F8F9FF] border border-blue-100 text-slate-600 px-4 py-3 rounded-md text-sm">
          Manual Selection (locked for giveaway contests)
        </div>
      </div>

      {/* Announcement Schedule — radio logic */}
      <div className="space-y-3 pt-2">
        <label className="text-sm font-semibold text-gray-700">
          Announcement Schedule <span className="text-red-500">*</span>
        </label>

        <div className="space-y-3">
          {/* Option 1 */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={cn(
              "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
              form.announcementSchedule === "immediately"
                ? "border-[#A01C1C]"
                : "border-gray-300 group-hover:border-gray-400"
            )}>
              {form.announcementSchedule === "immediately" && (
                <div className="w-2 h-2 rounded-full bg-[#A01C1C]" />
              )}
            </div>
            <input
              type="radio"
              name="schedule"
              className="hidden"
              checked={form.announcementSchedule === "immediately"}
              onChange={() => {
                update("announcementSchedule", "immediately");
                update("announcementDate", "");
              }}
            />
            <span className="text-sm text-gray-600">Immediately after closing</span>
          </label>

          {/* Option 2 */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={cn(
              "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
              form.announcementSchedule === "scheduled"
                ? "border-[#A01C1C]"
                : "border-gray-300 group-hover:border-gray-400"
            )}>
              {form.announcementSchedule === "scheduled" && (
                <div className="w-2 h-2 rounded-full bg-[#A01C1C]" />
              )}
            </div>
            <input
              type="radio"
              name="schedule"
              className="hidden"
              checked={form.announcementSchedule === "scheduled"}
              onChange={() => update("announcementSchedule", "scheduled")}
            />
            <span className="text-sm text-gray-600">Scheduled date</span>
          </label>
        </div>

        {/* Conditional date input */}
        {form.announcementSchedule === "scheduled" && (
          <div className="relative mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <Input
              type="date"
              value={form.announcementDate}
              min={form.endDate}
              onChange={(e) => update("announcementDate", e.target.value)}
              className="h-11 bg-white focus-visible:ring-[#A01C1C]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── STEP 4 ───────────────────────────────────────────────────
function Step4Review({
  form, goToStep,
}: {
  form: FormData;
  goToStep: (step: number) => void;
}) {
  const sections = [
    {
      title: "Basic Information",
      step: 1,
      rows: [
        { label: "Title",       value: form.title       || "—" },
        { label: "Description", value: form.description || "—" },
        { label: "Location",    value: form.location    || "—" },
        { label: "Start Date",  value: form.startDate   || "—" },
        { label: "End Date",    value: form.endDate     || "—" },
        { label: "Banner",      value: form.banner?.name || "—" },
      ],
    },
    {
      title: "Participation Requirements",
      step: 2,
      rows: [
        { label: "Task Instructions",  value: form.taskInstructions || "—"  },
        { label: "Screenshot required",value: form.requireScreenshot ? "Yes" : "No" },
        { label: "Text required",      value: form.requireText       ? "Yes" : "No" },
        { label: "Max submissions",    value: form.maxSubmissions   || "—"  },
      ],
    },
    {
      title: "Winner Settings",
      step: 3,
      rows: [
        { label: "Number of winners",   value: form.numberOfWinners || "—" },
        { label: "Selection method",    value: "Manual Selection"          },
        { label: "Announcement",        value: form.announcementSchedule === "immediately"
            ? "Immediately after closing"
            : `Scheduled — ${form.announcementDate || "—"}` },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-xl font-bold text-[#A01C1C]">Review & Publish (Giveaway Contest)</h2>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div
            key={section.title}
            className={cn("pb-5", idx < sections.length - 1 && "border-b border-gray-100")}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-gray-900">{section.title}</h3>
              <button
                onClick={() => goToStep(section.step)}
                className="flex items-center gap-1 text-xs text-[#A01C1C] hover:underline"
              >
                <Pencil size={12} /> Edit
              </button>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-4 space-y-2">
              {section.rows.map(({ label, value }) => (
                <p key={label} className="text-xs text-gray-500">
                  {label}: <span className="text-gray-800 ml-1">{value}</span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}