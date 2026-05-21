// "use client";

// import { Button } from "@/components/ui/button";
// import { 
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import React, { useState } from "react";





// import { signInWithPopup } from 'firebase/auth';





// import React, { useState } from 'react'
// import { auth } from "@/config/firebaseConfig";

// const SummarizePage = () => {
//   const [open, setOpen] = useState(false);

//   const signWithGoogle = async () => {
//     const results = await signInWithPopup(auth, provider);
//   }
//   return (
//     <div className="border border-gray-300 rounded-md p-2 m-2 h-[90vh] focus:outline-none focus:ring-2 flex flex-col justify-center items-center focus:ring-blue-500">
//       <div className='bg-white w-full h-[70vh] shadow-md rounded-2xl flex p-2'>
//         <textarea className='w-full rounded-1-2xl p-5 resize-none md:border-r focus:outline-none border-2px' placeholder="Paste your text here..." />

//         <textarea disabled className='w-full rounded-1-2xl p-5 resize-none md:border-r focus:outline-none border-2px' placeholder="Your summary will appear here..." />
//       </div>
//       <button className='mt-8 bg-black text-white px-4 py-2 rounded cursor-pointer'>Generate Summary</button>
//     </div>
//   )
// }

// export default SummarizePage













// to get the summary of the text
// claude AI


"use client"

import { use, useState } from "react"
import { GoogleGenAI } from "@google/genai"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { signInWithPopup } from "firebase/auth"
import { auth, db, provider } from "@/config/firebaseConfig"
import { useGetUserInfo } from "@/hooks/useGetUserInfo"
import { toast } from "sonner"
import { generateAIResponse } from "@/config/AIConfig"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"


const SummarizePage = () => {
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [open,setOpen] = useState(false)
  const [userText, setUserText] = useState("")

  const {isAuth,userEmail} = useGetUserInfo();

  const router = useRouter();


  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);

    const authInfo = {
      user: results.user.uid,
      userEmail: results.user.email,
      name: results.user.displayName,
      isAuth: true
    };

    if(typeof window !== "undefined") {
      localStorage.setItem("auth", JSON.stringify(authInfo));
    }

  };


  const handleSummarize = async () => {
    if (!inputText.trim()) return

    try {
      setLoading(true)
      setSummary("")

      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_TEXT_API_KEY })

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Please summarize the following text clearly and concisely. Highlight the key points:\n\n${inputText}`,
              },
            ],
          },
        ],
      })

      setSummary(response.text ?? "Could not generate summary.")
    } catch (err) {
      console.error(err)
      setSummary("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const generateSummary = async () => {
    if(!auth){
      setOpen(true);
      return;
    }

    if(userText.split("").length < 10){
      toast("text is too short to summarize");
      return;
    }

    setLoading(true);

    const prompt = `Summarize this text: ${userText}`;
    const result = await generateAIResponse(prompt);

    setLoading(false);

    console.log("Summarized text:", result);

    saveSummary(result);
  };

  const saveSummary = async (result: string) => {
    setLoading(true);
    const id = Date.now().toString();

    await setDoc(doc(db, "Summaries", id),{
      userText,
      summary: result,
      userEmail,
      id
    })

    setLoading(false);

    router.push(`/summary/${id}`);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Two-panel area */}
      <div className="w-full flex border rounded-xl overflow-hidden bg-white shadow-sm min-h-[60vh]">
        {/* Left - Input */}
        <textarea
          onChange={(e) => setUserText(e.target.value)}
          className="w-1/2 p-4 text-sm text-gray-700 resize-none outline-none md:border-r"
          placeholder="Paste your text here..."
          // value={inputText}
          // onChange={(e) => setInputText(e.target.value)}
        />

        {/* Right - Output */}
        {/* <div className="w-1/2 p-4 text-sm text-gray-500 hidden md:inline-flex">
          {loading ? (
            <p className="animate-pulse">Summarizing...</p>
          ) : summary ? (
            <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
          ) : (
            <p>Your summary will appear here...</p>
          )}
        </div> */}

        <textarea
          className="w-1/2 p-4 text-sm text-gray-700 resize-none outline-none md:border-r"
          placeholder=""
          disabled
          />
      </div>

      {/* Button */}
      <button
        // onClick={handleSummarize}
        // disabled={loading || !inputText.trim()}
        className=" bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 transition-all"
        disabled={loading}
        onClick={generateSummary}
      >
        {loading ? "Generating..." : "Generate Summary"} 
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in with google</DialogTitle>
            <DialogDescription>
              Please Sign in with your Google account to continue.
            </DialogDescription>
            <Button className="mt-8" onClick={signInWithGoogle}>Sign In with Google</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SummarizePage