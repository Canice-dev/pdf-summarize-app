// "use client"

// import { Button } from '@/components/ui/button'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { db } from '@/config/firebaseConfig'
// import { doc, getDoc } from 'firebase/firestore'
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { toast } from 'sonner'

// const SummaryPage = () => {

//   const {textid} = useParams();
//   const [data, setData] = useState({
//     id:"",
//     summary:"",
//     userEmail:"",
//     userText:""
//   })

//   const getSummary = async () => {
//     const docRef = doc(db, "Summaries", textid as string);
//     const docSnap = await getDoc(docRef);

//     if(docSnap.exists()){
//       console.log("Document: ", docSnap.data());
//       const {id, summary, userEmail, userText} = docSnap.data();
//       setData({id, summary, userEmail, userText});
//     }else{
//       console.log("No such document!");
//       toast("No Summary found for the given text")
//     }
//   };

//   useEffect(() => {
//     if(textid){
//       getSummary();
//     }
//   },[textid]);

//   return (
    
//     <div className="flex flex-col items-center gap-4 p-4">
//       <div className='pt-5 pb-2 justify-between items-center flex w-full text-lg font-semibold'>
//         <p>Your Text</p>
//         <p className='w-1/2'>Your Summary</p>
//       </div>
//       <div className="bg-white w-full h-[70vh] shadow-md rounded-2xl hidden lg:flex p-2 ">
//         <textarea
//           className="w-1/2 p-4 text-sm text-gray-700 h-[70vh] resize-none outline-none md:border-r"
//           disabled
//           value={data.userText}
//           />
//         <textarea
//           className="w-1/2 p-4 text-sm text-gray-700 h-[70vh] resize-none outline-none md:border-r"
//           disabled
//           value={data.summary}
//           />
//       </div>

//             {/* ===== SMALL & MEDIUM SCREENS: Tabs ===== */}
//       <div className='lg:hidden w-full'>
//         <Tabs defaultValue="account" className="w-full">
//           <TabsList>
//             <TabsTrigger value="User Text">User Text</TabsTrigger>
//             <TabsTrigger value="Summary">Summary</TabsTrigger>
//           </TabsList>
//           <TabsContent value="User Text">
//             <textarea
//               className="w-full p-4 text-sm text-gray-700 h-[70vh] resize-none outline-none md:border-r"
//               disabled
//               value={data.userText}
//               />
//           </TabsContent>
//           <TabsContent value="Summary">
//             <textarea
//               className="w-full p-4 text-sm text-gray-700 h-[70vh]  outline-none md:border-r"
//               disabled
//               value={data.summary}
//               />
//           </TabsContent>
//         </Tabs>
//       </div>
        
//       <button
//         className=" bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 transition-all"
//       >
//         Generate a New Summary
//       </button>
//     </div>

//   )

// }

// export default SummaryPage



"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { db } from '@/config/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SummaryPage = () => {
  const { textid } = useParams();

  const [data, setData] = useState({
    id: "", summary: "", userEmail: "", userText: ""
  });

  // ✅ JS-based screen check — bypasses Tailwind lg: class generation issue
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const check = () => setIsLargeScreen(window.innerWidth >= 1024);
    check(); // run once on mount
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const getSummary = async () => {
    const docRef = doc(db, "Summaries", textid as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { id, summary, userEmail, userText } = docSnap.data();
      setData({ id, summary, userEmail, userText });
    } else {
      toast("No Summary found for the given text");
    }
  };

  useEffect(() => {
    if (textid) getSummary();
  }, [textid]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">

      {isLargeScreen ? (
        // ✅ LARGE SCREEN: side-by-side textareas
        <>
          <div className="flex justify-between items-center w-full text-lg font-semibold pt-5 pb-2">
            <p>Your Text</p>
            <p>Your Summary</p>
          </div>
          <div className="bg-white w-full h-[70vh] shadow-md rounded-2xl flex p-2">
            <textarea
              className="w-1/2 p-4 text-sm text-gray-700 h-full resize-none outline-none border-r"
              disabled
              value={data.userText}
            />
            <textarea
              className="w-1/2 p-4 text-sm text-gray-700 h-full resize-none outline-none"
              disabled
              value={data.summary}
            />
          </div>
        </>
      ) : (
        // ✅ SMALL & MEDIUM: Tabs
        <div className="w-full pt-5">
          <Tabs defaultValue="userText" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="userText" className="flex-1">Your Text</TabsTrigger>
              <TabsTrigger value="summary" className="flex-1">Your Summary</TabsTrigger>
            </TabsList>
            <div>
              <TabsContent value="userText">
              <Card>
                <CardHeader>
                  <CardTitle>user Text</CardTitle>
                  <CardDescription>Here's the text you provided for summarization.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {data.userText}
                </CardContent>
              </Card>
            </TabsContent>
            </div>
            
            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Your Summary</CardTitle>
                  <CardDescription>Here's the summary generated for your text.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {data.summary}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      <button className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all">
        Generate a New Summary
      </button>
    </div>
  );
};

export default SummaryPage;
