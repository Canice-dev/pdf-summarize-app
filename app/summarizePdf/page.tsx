import React from 'react'
import Link from 'next/link'
import PDFUpload from '@/components/pdfUpload'



function summarizePdf() {
  return (
    <div className='pt-5'>
      <PDFUpload />
    </div>

  )
}

export default summarizePdf








// {/* Inside your page/component */}
// <PDFUpload />