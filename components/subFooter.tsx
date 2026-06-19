"use client"

import React from 'react'

const SubFooter = () => {
  return (

    // <div className='bg-[#010013] text-white w-full mr-0 ml-0'>
    //   <div className='flex justify-between p-5'>
    //     <div className='text-left'>
    //       <p>SumPDF</p>
    //     </div>
    //       <p>© 2026 SumPDF. All rights reserved.</p>
    //   </div>
    // </div>
    <footer className="bg-zinc-950 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* top panel content (SumPDF / Products / Get in touch) */}
        
        <div className="flex items-center justify-between py-6">
          <p className="text-white">SumPDF</p>
          <p className="text-white">© 2026 SumPDF. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default SubFooter