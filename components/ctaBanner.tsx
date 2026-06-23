"use client"

import { Upload, ArrowRight } from "lucide-react";
import { Button } from '@/components/ui/button'
import Link from "next/link";

const stats = [
  { number: "5+", label: "PDF Tools" },
  { number: "<10s", label: "Summary time" },
  { number: "0", label: "Fee required" },
];

const CtaBanner = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-5'>
      <div className='text-left'>
        <h2 className='text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold tracking-[-0.04em] leading-[1.0]'>
          Stop reading.
          <br />
          <span>Start Knowing.</span>
          <div className="w-1/2 h-px bg-zinc-100 my-6" />
        </h2>
        <p className='text-md mt-2 md:text-base mb-8 max-w-4xl'>Upload any PDF and get the gist in seconds. No setup, no credit card, no friction.</p>
        <div className="w-full h-px bg-zinc-100 my-10 max-w-5xl" />
        <div className="flex items-end gap-8 mt-10 pt-10 border-t border-white/[0.06]">
            {stats.map(({ number, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-[1.4rem] font-bold tracking-[-0.04em] tabular-nums">
                  {number}
                </span>
                <span className="text-[11px] uppercase tracking-[.04em]">
                  {label}
                </span>
              </div>
            ))}
          </div>

      </div>
      <div className="relative z-10 flex flex-col items-start md:items-end gap-4 justify-end">
        <Link href="#how-it-works">
          <Button className='mt-8 px-6 py-4' variant="outline">
            See how it works
            <ArrowRight size={12} />
          </Button>
        </Link>
        <Link href="#pdf-tools">
          <Button className='mt-8 px-6 py-4'>
            Upload a PDF
            <Upload size={14} />
          </Button>
        </Link>
          <p className='text-md mt-2 md:text-base mb-8 max-w-4xl'>
            Free — no payment required
          </p>
        </div>
    </div>
  );
}

export default CtaBanner;