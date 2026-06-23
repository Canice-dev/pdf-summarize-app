import { ArrowRight, Globe, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const HeroPreview = () => {
  return (
    <div>
      <div className='className="inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full border transition-colors cursor-default w-fit px-5'>
        WHAT YOU CAN DO
      </div>
      <div className='border rounded-[10px] mt-3 px-3 py-3 shadow'>
        <div className='flex gap-3'>
          <div className="w-10 h-10 rounded-[9px] bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className='text-[15px] font-semibold text-zinc-900 leading-snug flex gap-2 text-left mb-2'>
              AI Summarization
            </h3>
            <p className='text-sm leading-relaxed'>Get a concise breakdown of any PDF — key points, no noise.</p>
          </div>
        </div>
        <div className="w-full h-px bg-zinc-100 my-3 max-w-5xl" />
        <div className='flex gap-3'>
          <div className="w-10 h-10 rounded-[9px] bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
            <MessageSquare size={20} />
          </div>
          <div>
            <h3 className='text-[15px] font-semibold text-zinc-900 leading-snug flex gap-2 text-left mb-2'>
              Chat with your PDF
            </h3>
            <p className='text-sm leading-relaxed'>Ask anything and get cited answers grounded in your document.</p>
          </div>
        </div>
        <div className="w-full h-px bg-zinc-100 my-3 max-w-5xl" />
        <div className='flex gap-3'>
          <div className="w-10 h-10 rounded-[9px] bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
            <Globe size={20} />
          </div>
          <div>
            <h3 className='text-[15px] font-semibold text-zinc-900 leading-snug flex gap-2 text-left mb-2'>
              Real-time Web Search
            </h3>
            <p className='text-sm leading-relaxed'>Responses enhanced with live data when your PDF isn't enough.</p>
          </div>
        </div>
        <div className="w-full h-px bg-zinc-100 my-3 max-w-5xl" />
                <div className="w-full h-px bg-zinc-100 my-3 max-w-5xl" />
                <div className='flex gap-3'>
          <div className="w-10 h-10 rounded-[9px] bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className='text-[15px] font-semibold text-zinc-900 leading-snug flex gap-2 text-left mb-2'>
              Secure by default
            </h3>
            <p className='text-sm leading-relaxed'>End-to-end encrypted uploads. Your files stay yours.</p>
          </div>
        </div>
      </div>
      <div className='flex justify-end mt-3'>
        <Link href="#pdf-tools" className='flex'>
          <p>
            PDF Tools included
          </p>
          <ArrowRight size={15} />
        </Link>

      </div>
    </div>
  )
}

export default HeroPreview