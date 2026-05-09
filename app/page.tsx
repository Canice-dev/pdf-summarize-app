import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PDFUpload from '@/components/pdfUpload'
import page from './summarize/page'



const Home = () => {
  return (
    <div className='px-4 mg:px-12 flex-col justify-center items-center-[85vh] relative mx-auto text-center'>
      <h1 className='text-3xl md:text-[70px] lg:text-{78px] font-bold max-w-4xl'>Turn PDFs into Intelligent Conversations
      </h1>
      <p className='text-sm mt:2 md:text-base text-center text-gray-700 mb-8 max-w-4xl'>AI-powered PDF summarizer that extracts key insights instantly. Supports OCR, format conversion, merge, encrypt and more.</p>
      
      
      

      {/* Inside your page/component */}
      <PDFUpload />

      <Link href="/summarize">
        <Button variant="outline" className='mt-8'>Go to Summarize Page</Button>
      </Link>
    </div>
  )
}

export default Home