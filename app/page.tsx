import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, FileText, FileTextIcon, Globe, Lock, MessageCircle, PenLine } from 'lucide-react'
import FaqSection from '@/components/faqSection'
import CtaBanner from '@/components/ctaBanner'
import HowitWorks from '@/components/howItWorks'
import HeroPreview from '@/components/heroPreview'
import { instrumentSerif } from './layout'


const tools = [
  { icon: FileText, label: "AI summarization" },
  { icon: MessageCircle, label: "Chat with PDF" },
  { icon: Globe, label: "Real-time web search" },
  { icon: Lock, label: "End-to-end encrypted" },
  { icon: PenLine, label: "5+ PDF tools" },
];


const Home = () => {
  return (
    <div className='px-4 md:px-12 flex flex-col justify-center items-center min-h-[85vh] relative mx-auto text-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-5'>
        <div className='text-left'>
          <h1 className='text-2xl md:text-[70px] lg:text-{78px] max-w-4xl'>Turn PDFs into <span className={`block ${instrumentSerif.variable} font-serif italic text-[#1B3A6B]`}
          style={{ fontFamily: "var(--font-instrument)" }}>
            Intelligent Conversations
          </span> 
          </h1>
          <p className='text-md mt-2 md:text-base mb-8 max-w-4xl'>StudyFlow enables you to summarize documents, extract valuable insights, and chat with your PDFs using AI. Upload your files, ask questions, and receive intelligent answers from your documents and enhanced with real-time web search, if answers are not found in your document.</p>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 mb-10'>
            <section className="flex flex-col gap-1 border-r px-3">
              <h4 className="text-sm font-semibold">5+ PDF Tools</h4>
              <p className="text-xs">Everything in one place.</p>
            </section>
            <section className="flex flex-col gap-1 border-r px-3">
              <h4 className="text-sm font-semibold">Smart AI Analysis</h4>
              <p className="text-xs">Summarize and extract insights</p>
            </section>
            <section className="flex flex-col gap-1 border-r px-3">
              <h4 className="text-sm font-semibold">Trusted Security</h4>
              <p className="text-xs">Encrypted document handling</p>
            </section>
            <section className="flex flex-col gap-1 px-3">
              <h4 className="text-sm font-semibold">Real-time Web Search</h4>
              <p className="text-xs">Answers backed by live data</p>
            </section>
          </div>
        </div>
        <div>
          <HeroPreview />
        </div>
      </div>
      {/* Tools pill row */}
      <div className="flex items-center flex-wrap gap-2 max-w-5xl px-5">
        <span className="text-[11px] font-medium tracking-widest uppercase text-gray-700 mr-3">
          Includes
        </span>
        {tools.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full border transition-colors cursor-default"
          >
            <Icon size={12} />
            {label}
          </div>
        ))}
      </div>
      <div className="w-full h-px bg-zinc-100 my-10 max-w-5xl" />


      
      {/* Inside your page/component */}
      {/* <PDFUpload /> */}

      <div className='mt-12 scroll-mt-24' id='pdf-tools'>
        <h1 className='text-[15px] font-medium tracking-[.1em] uppercase mb-3'>PDF Tools</h1>
        <div className='mb-4'>
          <h3 className='font-bold mb-3 text-[clamp(1.8rem,3.5vw,2.6rem)]'>Everything you need for your PDFs</h3>
          <p>Summarize, convert, merge, compress, and sign powered by AI and built to handle any PDF workflow, fast.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-5'>
          <div className='rounded-2xl border border-border bg-white p-5 rounded-2xl border border-border bg-white p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer'>
           
            <h3 className='text-[15px] font-semibold text-zinc-900 leading-snug mb-4 flex items-center justify-center gap-2'>
              <div className="w-9 h-9 rounded-[9px] bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
                <BookOpen size={16} />
              </div>
              SUMMARIZE TEXT
            </h3>
            {/* text-muted-foreground for lighter texts */}
            <p className='text-sm leading-relaxed mb-8'>
              Extract the key points from any text in seconds.<br/>Get the gist of any text in seconds.
            </p>
            <Link href="/summarize">
              <Button>
                Summarize
                <ArrowRight size={13} />
              </Button>
            </Link>
          </div>
          <div className='rounded-2xl border border-border bg-white p-5 rounded-2xl border border-border bg-white p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer'>
            <h3 className='text-[15px] font-semibold text-zinc-900 leading-snug mb-4 flex items-center justify-center gap-2'>
              <div className="w-9 h-9 rounded-[9px] bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
                <FileTextIcon size={16} />
              </div>
              SUMMARIZE PDF
            </h3>
            <p className='text-sm leading-relaxed'>
              Extract the key points from any PDF in seconds. Research papers, contracts, reports, get the gist without reading every page.
            </p>
            <Link href='/summarizePdf'>
              <Button className='mt-8 px-6 py-4 '>
                Summarize
                <ArrowRight size={13} />
              </Button>
            </Link>
          </div>
          <div className='rounded-2xl border border-border bg-white p-5 rounded-2xl border border-border bg-white p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer'>
            <h3 className='text-[15px] font-semibold text-zinc-900 leading-snug mb-4 flex items-center justify-center gap-2'>
              <div className="w-9 h-9 rounded-[9px] bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
                <MessageCircle size={16} />
              </div>
              ASK YOUR PDF ANYTHING
            </h3>
            <p className='text-sm leading-relaxed'>
              Ask a question about your PDF and get a direct answers pulled straight from your PDF document.<br/> Chat with your PDF like it's a person who's read every page.
            </p>
            <Link href='/chat'>
              <Button className='mt-8 px-6 py-4 '>
                Chat
                <ArrowRight size={13} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-zinc-100 my-10 max-w-5xl" />
      <FaqSection />
      <div className="w-full h-px bg-zinc-100 my-10 max-w-5xl" />
      <HowitWorks />
      <div className="w-full h-px bg-zinc-100 my-10 max-w-5xl" />      
      <CtaBanner />
      {/* <div className="w-full h-px bg-zinc-100 my-10 max-w-5xl" />   */}
    </div>
  )
}

export default Home