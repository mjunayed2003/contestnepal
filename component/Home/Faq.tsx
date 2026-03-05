"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    question: "How do I join a contest?",
    answer:
      "Simply browse our contests, click on one that interests you, and follow the participation instructions. Some contests require simple tasks, while others need creative submissions.",
  },
  {
    question: "How are winners selected?",
    answer:
      "Winners are selected based on the contest type. Giveaways use random draws, creative submissions are judged by community votes or a panel, and polls are determined by participation.",
  },
  {
    question: "What are the voting rules?",
    answer:
      "Each user gets one vote per contest entry. Votes are anonymous and cannot be changed once submitted. Attempting to manipulate votes will result in disqualification.",
  },
  {
    question: "How does the submission approval process work?",
    answer:
      "Submissions are reviewed by our moderation team within 24 hours. They check for guideline compliance before making your entry visible to the community.",
  },
  {
    question: "Can I participate in multiple contests?",
    answer:
      "Yes! You can join as many contests as you like. Each contest has its own set of rules, so make sure to read them carefully before participating.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="w-full bg-[#FAF7F4] py-16 sm:py-20 px-4 sm:px-8">
      <div className="max-w-[800px] mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 space-y-3">
          <h2 className="text-[clamp(28px,4vw,44px)] font-black text-gray-900 tracking-tight">
            FAQ
          </h2>
          <p className="text-[15px] sm:text-[16px] text-gray-400">
            Everything you need to know about Contest Hub
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#8B1212] border-[#8B1212]"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                >
                  <span
                    className={`text-[15px] sm:text-[16px] font-semibold ${
                      isOpen ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {i + 1}. {faq.question}
                  </span>

                  <span
                    className={`shrink-0 ml-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      isOpen
                        ? "bg-white/20 text-white"
                        : "border border-gray-300 text-[#A01C1C]"
                    }`}
                  >
                    {isOpen ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-[13px] sm:text-[14px] text-white/85 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}