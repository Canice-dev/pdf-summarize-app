"use client"

import { Cpu, Sparkles, Upload } from 'lucide-react';
import React from 'react'
import { number } from 'zod';

const HowitWorks = () => {
  return (
    <div className='mt-12 scroll-mt-24' id='how-it-works'>
      <h1 className='text-[15px] font-medium tracking-[.1em] uppercase mb-3'>How it Works</h1>
        <div className='mb-8'>
          <h3 className='font-bold mb-3 text-[clamp(1.8rem,3.5vw,2.6rem)]'>From upload to insight in three steps</h3>
          <p>No learning curve. No complicated setup. Just upload and let the AI do the work.</p>
        </div>
        <div>
          <div>
            <div className='flex flex-col-1 gap-5 mb-3'>
              <p className='border w-7 rounded-full'>1</p>
              <div className='flex gap-2'>
                <Upload size={20} />
                <h3 className='text-[15px] font-semibold'>
                  Upload your PDF
                </h3>
              </div>
            </div>
            <p>Drag and drop or select any PDF from your device. Up to 10MB on the free plan.</p>
            <div className="gap-1.5 text-[12px] px-3 py-1.5 rounded-full border border w-fit mt-4 cursor-default">
              Any PDF format
            </div>
          </div>
          <div className="w-full h-px bg-zinc-100 my-3" />
          <div className='mt-8'>
            <div className='flex flex-col-1 gap-5 mb-3'>
              <p className='border w-7 rounded-full'>2</p>
              <div className='flex gap-2'>
                <Cpu size={20} />
                <h3 className='text-[15px] font-semibold'>
                  AI reads everything
                </h3>
              </div>
            </div>
            <p>Our language model processes the full document structure, tables, clauses, and all.</p>
            <div className="gap-1.5 text-[12px] px-3 py-1.5 rounded-full border border w-fit mt-4 cursor-default">
              Under 10 seconds
            </div>
          </div>
          <div className="w-full h-px bg-zinc-100 my-3" />
          <div className='mt-8'>
            <div className='flex flex-col-1 gap-5 mb-3'>
              <p className='border w-7 rounded-full'>3</p>
              <div className='flex gap-2'>
                <Sparkles size={20} />
                <h3 className='text-[15px] font-semibold'>
                  Get your summary
                </h3>
              </div>
            </div>
            <p>Receive a clean, structured summary. Then ask follow-up questions anytime.</p>
            <div className="gap-1.5 text-[12px] px-3 py-1.5 rounded-full border border w-fit mt-4 cursor-default">
              Chat included
            </div>
          </div>
        </div>
    </div>
  );
}

export default HowitWorks;