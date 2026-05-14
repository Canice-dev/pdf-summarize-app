"use client"

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { db } from '@/config/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SummaryPage = () => {

  const {textid} = useParams();
  const [data, setData] = useState({
    id:"",
    summary:"",
    userEmail:"",
    userText:""
  })

  const getSummary = async () => {
    const docRef = doc(db, "Summaries", textid as string);
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
    if(textid){
      getSummary();
    }
  },[textid]);

  return (
    
    <div className="flex flex-col items-center gap-4 p-4">
      <div className='md:hidden md:flex pt-5 pb-2 justify-between items-center flex w-full text-lg font-semibold'>
        <p>Your Text</p>
        <p className='w-1/2'>Your Summary</p>
      </div>
      <div className="w-full flex border rounded-xl overflow-hidden bg-white hidden md:flex shadow-sm min-h-[60vh]">
        <textarea
          className="w-1/2 p-4 text-sm text-gray-700 resize-none outline-none md:border-r"
          disabled
          value={data.userText}
          />
        <textarea
          className="w-1/2 p-4 text-sm text-gray-700 resize-none outline-none md:border-r"
          disabled
          value={data.summary}
          />
      </div>
      <div className='bg-white w-full h-[70vh] shadow-md rounded-2xl md:hidden'>
        <Tabs defaultValue="summary" className="h-full">
          <TabsList className='rounded-none bg-white'>
            <TabsTrigger value="summary">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>

      <button
        className=" bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 transition-all"
      >
        Generate a New Summary
      </button>
    </div>

  )
}



//


// const SummaryPage = () => {

//   const { textid } = useParams();  // ✅ lowercase d matches folder [textid]

//   const [data, setData] = useState({
//     id: "",
//     summary: "",
//     userEmail: "",
//     userText: ""
//   });


//   useEffect(() => {
//     if (!textid) return;

//     const getSummary = async () => {
//       try {
//         const docRef = doc(db, "Summaries", textid as string);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           console.log("✅ Document found:", docSnap.data());
//           const { id, summary, userEmail, userText } = docSnap.data();
//           setData({ id, summary, userEmail, userText });
//         } else {
//           console.log("❌ No document for ID:", textid);
//           toast("No Summary found for the given text");
//         }
//       } catch (err) {
//         console.error("🔥 Firestore error:", err);
//       }
//     };

//     getSummary();
//   }, [textid]);

//   return (
//     <div className="flex flex-col items-center gap-4 p-4">
//       <div className='md:hidden md:flex pt-5 pb-2 justify-between items-center flex w-full text-lg font-semibold'>
//         <p>Your Text</p>
//         <p className='w-1/2'>Your Summary</p>
//       </div>
//       <div className="w-full flex border rounded-xl overflow-hidden bg-white shadow-sm min-h-[60vh]">
//         <textarea
//           className="w-1/2 p-4 text-sm text-gray-700 resize-none outline-none md:border-r"
//           disabled
//           defaultValue={data.userText}
//         />
//         <textarea
//           className="w-1/2 p-4 text-sm text-gray-700 resize-none outline-none"
//           disabled
//           defaultValue={data.summary}
//         />
//       </div>
//       <Button className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 transition-all">
//         Generate a New Summary
//       </Button>
//     </div>
//   );
// };

export default SummaryPage