"use client"

import { db } from '@/config/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SummaryPage = () => {

  const {textId} = useParams();
  const [data, setData] = useState({
    id:"",
    summary:"",
    userEmail:"",
    userText:""
  })

  const getSummary = async () => {
    const docRef = doc(db, "Summaries", textId as string);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Document: ", docSnap.data());
      const {id, summary, userEmail, userText} = docSnap.data();
      setData({id, summary, userEmail, userText});
    }else{
      console.log("No such document!");
      toast("No Summary found for the given text")
    }
  };

  useEffect(() => {
    if(textId){
      getSummary();
    }
  },[textId]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className='md:hidden md:flex pt-5 pb-2 justify-between items-center flex w-full text-lg font-semibold'>
        <p>Your Text</p>
        <p className='w-1/2'>Your Summary</p>
      </div>
      <div className="w-full flex border rounded-xl overflow-hidden bg-white shadow-sm min-h-[60vh]">
        <textarea
          className="w-1/2 p-4 text-sm text-gray-700 resize-none outline-none md:border-r"
          disabled
          defaultValue={data.userText}
          />
        <textarea
          className="w-1/2 p-4 text-sm text-gray-700 resize-none outline-none md:border-r"
          disabled
          defaultValue={data.summary}
          />
      </div>

      <button
        className=" bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 transition-all"
      >
        Generate a New Summary
      </button>
    </div>

  )
}

export default SummaryPage