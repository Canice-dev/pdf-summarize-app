import { Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import XTwitterIcon from './twitterIcon'

const footer = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 text-left gap-4 p-5 bg-zinc-950 text-white px-8'>
      <div className='text-left'>
        <h3 className='text-[15px] font-semibold mb-3'>StudyFlow</h3>
        <p>AI-powered academic platform for everyone. Summarize text, Summarize PDF, and chat with <br /> PDFs all in one place.</p>
        <div className="gap-1.5 text-[12px] px-3 py-1.5 rounded-full border border w-fit mt-4 cursor-default">
          All systems operational
        </div>
      </div>
      <div>
        <h3 className='text-[15px] font-semibold mb-3 md:text-left'>Products</h3>
        <Link href="/summarize" className='hover:underline'>
          <p>Summarize text</p>
        </Link>
        <Link href="/summarizePdf" className='hover:underline'>
          <p>Summarize PDF</p>
        </Link>
        <Link href="/chat" className='hover:underline'>
          <p>Chat with PDF</p>
        </Link>
      </div>
      <div>
        <h3 className='text-[15px] font-semibold mb-3'>Get in touch</h3>
        <p>Have a question or feature request? We're a small team, and we read every message.</p>
        <div className='mt-3'>
          <XTwitterIcon />
        </div>
      </div>
    </div>
  )
}

export default footer