import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PDFUpload from '@/components/pdfUpload'
import page from './summarize/page'



const Home = () => {
  return (
    <div className='px-4 md:px-12 flex flex-col justify-center items-center min-h-[85vh] relative mx-auto text-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-5'>
        <div className='text-left'>
          <h1 className='text-2xl md:text-[70px] lg:text-{78px] max-w-4xl'>Turn PDFs into Intelligent Conversations
          </h1>
          <p className='text-sm mt-2 md:text-base text-gray-700 mb-8 max-w-4xl'>Sumpdf enables you to summarize documents, extract valuable insights, and chat with your PDFs using AI. Upload your files, ask questions, and receive intelligent answers powered by your documents and enhanced with real-time web search.</p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-1 mt-8 place-items-center mb-10'>
            <section className="flex flex-col gap-1 border-r px-3">
              <h4 className="text-md font-semibold text-center">5+ PDF Tools</h4>
              <p className='items-start'>Everything in one place.</p>
            </section>
            <section className="flex flex-col gap-1 border-r px-3">
              <h4 className="text-md font-semibold text-center">Smart AI Analysis</h4>
              <p className='items-start'>Summarize and extract insights</p>
            </section>
            <section className="flex flex-col items-start gap-1 border-r px-3">
              <h4 className="text-md font-semibold text-center">Trusted Security</h4>
              <p className='items-start'>Encrypted document handling</p>
            </section>
          </div>
        </div>
        <div>
          <p>hello</p>
        </div>
      </div>
      
      {/* Inside your page/component */}
      {/* <PDFUpload /> */}

      <div className='mt-12'>
        <h1 className='text-1xl md:text-[30px] lg:text-{36px] font-bold mb-4'>PDF Tools</h1>
        <div>
          <h3 className='text-2xl md:text-[35px] lg:text-{40px] font-bold mb-4'>Everything you need for your PDFs</h3>
          <p>Summarize, convert, merge, compress, and sign powered by AI and built to handle any PDF workflow, fast.</p>
        </div>



        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-5'>
          <div className='rounded-2xl border border-border bg-white p-5 rounded-2xl border border-border bg-white p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer'>
            <h4 className='font-semibold text-base text-gray-900 mb-3'>Text to Summary</h4>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              Get instant, accurate summaries of long Texts key points extracted in seconds.
            </p>
            <Link href="/summarize">
              <Button className='mt-8 p-2 '>Use</Button>
            </Link>
          </div>

          <div className='rounded-2xl border border-border bg-white p-5 rounded-2xl border border-border bg-white p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer'>
            <h4 className='font-semibold text-base text-gray-900 mb-3'>Format conversion</h4>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              Convert PDFs to Word, Excel, PowerPoint, HTML, and more with a single click.
            </p>
            <Link href='/summarizePdf'>
              <Button className='mt-8 p-2 '>Use</Button>
            </Link>
          </div>

          <div className='rounded-2xl border border-border bg-white p-5 rounded-2xl border border-border bg-white p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer'>
            <h4 className='font-semibold text-base text-gray-900 mb-3'>Merge & split</h4>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              Combine multiple PDFs into one, or extract specific pages into a new file.
            </p>
            <Link href='/chat'>
              <Button className='mt-8 p-2 '>Use</Button>
            </Link>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home