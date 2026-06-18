import React from 'react'

const footer = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-5'>
      <div className='text-left'>
        <h3 className='text-[15px] font-semibold mb-3'>SumPDF</h3>
        <p>AI-powered academic platform for everyone. Summarize text, Summarize PDF, and chat with PDFs all in one place.</p>
        <div className="gap-1.5 text-[12px] px-3 py-1.5 rounded-full border border w-fit mt-4 cursor-default">
          All systems operational
        </div>
      </div>
      <div>
        <h3 className='text-[15px] font-semibold mb-3'>Products</h3>
        <p>Summarize text</p>
        <p>Summarize PDF</p>
        <p>Chat with PDF</p>
      </div>
      <div>
        <h3 className='text-[15px] font-semibold mb-3'>Company</h3>
        <p>About</p>
        <p>Pricing</p>
        <p>Blog</p>
        <p>Changelog</p>
      </div>
      <div>hello</div>
    </div>
  )
}

export default footer