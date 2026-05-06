import React from 'react'
import Link from 'next/link'
import { Button } from '@base-ui/react'


const Home = () => {
  return (
    <div className='px-4 mg:px-12 flex-col justify-center items-center-[85vh] relative mx-auto text-center'>
      <h1 className='text-3xl md:text-[70px] lg:text-{78px] font-bold max-w-4xl'>Summarize smarter, not harder</h1>
      <p className='text-sm mt:2 md:text-base text-center text-gray-700 mb-8 max-w-4xl'>tranform text with ai</p>

      <Link href="/summarize">
        <Button>Get Started</Button>
      </Link>
    </div>
  )
}

export default Home