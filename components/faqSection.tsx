"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What file types does SumPDF support?",
    a: "SumPDF works with PDF files of any size. Support for Word documents (.docx) and plain text files is coming soon.",
  },
  {
    q: "How does the AI summarization work?",
    a: "Your PDF is processed by a large language model that reads the full document and extracts the core ideas, key points, and important details — then returns a clean, structured summary.",
  },
  {
    q: "Is my document stored after I upload it?",
    a: "Documents are processed in-memory and not stored on our servers unless you explicitly save a summary. Your data stays yours.",
  },
  {
    q: "Can I chat with my PDF after summarizing it?",
    a: "Yes. After uploading, you can ask any question about your document and get a direct answer with the source page referenced.",
  },
  {
    q: "Is there a file size limit?",
    a: "Free accounts can upload PDFs up to 10MB. Pro accounts support files up to 100MB with no page count limit.",
  },
  {
    q: "Do I need an account to use SumPDF?",
    a: "You can summarize up to 3 documents without an account. Sign up for free to save summaries, access chat, and unlock more tools.",
  },
];

// export default function FaqSection() {
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="font-[family-name:var(--font-outfit)] bg-white py-16 px-6 md:px-12">
      <h1 className='text-[15px] font-medium tracking-[.1em] uppercase text-gray-700 mb-3'>FAQ</h1>
      <div className='mb-4'>
        <h3 className='font-bold mb-3 text-[clamp(1.8rem,3.5vw,2.6rem)]'>Frequently asked questions</h3>
        <p>Can't find what you're looking for? where are some related FAQ questions.</p>
      </div>
      {/* Accordion */}
      <div className="max-w-5xl divide-y divide-zinc-100 border-y border-zinc-100 ">
        {faqs.map(({ q, a }, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
              >
                <span className="text-[14px] font-medium text-zinc-900 leading-snug">
                  {q}
                </span>
                <span
                  className={`w-5 h-5 rounded-full border border-zinc-200 flex items-center justify-center flex-shrink-0 text-zinc-400 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <Plus size={12} />
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? "max-h-48 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-[13.5px] leading-relaxed text-zinc-500 max-w-[60ch]">
                  {a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FaqSection;