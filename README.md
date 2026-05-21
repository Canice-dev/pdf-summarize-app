This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## PROJECT GOALS

AI Academic Assistant for Nigerian Students

## features

summarizes PDFs,
generates CBT questions,
explains courses,
turns lecture notes into flashcards,
works for Nigerian university courses.

You already seem interested in PDF summarization and exam prep, so this fits your experience.

Why it can work

Most AI study apps are built for Western schools. Nigerian students need:

past questions,
CBT prep,
low-data mode,
WhatsApp sharing,
local course structures.
MVP Features
Upload PDF
AI summary
Generate likely exam questions
Explain difficult topics
Chat with lecture notes
Tech Stack
Next.js
Node.js/Express
OpenAI API or Claude API
PostgreSQL
Firebase/Auth
Monetization
Freemium
₦500–₦2,000 monthly subscriptions
School partnerships

## how to start

How To Start Properly
Step 1 — Don’t build a huge app first

Build only:

login,
PDF upload,
AI summary,
question generation.

That’s enough.

Step 2 — Get users fast

Post in:

WhatsApp groups,
faculty groups,
Telegram,
classmates.
Step 3 — Improve based on complaints

Most successful startups start ugly.

Skills You’ll Gain

Even if it fails, you’ll learn:

full-stack development,
APIs,
deployment,
databases,
authentication,
product design,
marketing,
startup thinking.

That alone can help you get internships/jobs.

Startup Names You Could Use

For an AI academic platform:

StudyFlow
Nota AI
Cerebro
Scholarly
Nexora
AcadIQ
Summiq
Learnexa
NoteMind
CribAI
Important Advice

Don’t try to:

compete with Google,
build 20 features,
make it perfect.

A simple app that solves ONE painful problem is better than a giant unfinished platform.

The startup that usually wins is the one that:

launches fast,
improves consistently,
listens to users.







"use client"

import { useState, useRef, DragEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTitle, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog"
import { signInWithPopup } from "firebase/auth"
import { auth, provider, db } from "@/config/firebaseConfig"
import { collection, addDoc } from "firebase/firestore"
import { useGetUserInfo } from "@/hooks/useGetUserInfo"
import { toast } from "sonner"
// import { GoogleGenAI } from "@google/genai"
import * as pdfjsLib from "pdfjs-dist"
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`



const PDFUpload = () => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { isAuth, userEmail } = useGetUserInfo()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) setFile(selected)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped && dropped.type === "application/pdf") setFile(dropped)
  }

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

  const SummaryPDF = async () => {
    // 1. Auth guard
    if (!isAuth) {
      setOpen(true)
      return;
    }

    // 2. File guard
    if (!file) return

    // 3. Size guard
    const MIN_SIZE = 2 * 1024 // 2KB
    if (file.size < MIN_SIZE) {
      toast("Document is too small to summarize.")
      return
    }

    try {
      setLoading(true)

      // 4. Convert PDF to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          resolve(result.split(",")[1])
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      const extractTextFromPDF = async (file: File): Promise<string> => {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        let fullText = ""

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          const pageText = content.items.map((item: any) => item.str).join(" ")
          fullText += `${pageText}\n`
        }

        return fullText
      }


      //
      const binaryStr = atob(base64)
      const bytes = new Uint8Array(binaryStr.length)
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i)
      }

      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise
      let fullText = ""

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const pageText = content.items.map((item: any) => item.str).join(" ")
        fullText += `\n--- Page ${i} ---\n${pageText}`
      }


  //     // 6. Save to Firestore
  //     const docRef = await addDoc(collection(db, "summaries"), {
  //       summary: text,
  //       fileName: file.name,
  //       userEmail: userEmail,
  //       createdAt: new Date(),
  //     })

  //     // 7. Navigate to the dynamic summary page with the real Firestore ID
  //     router.push(`/summaryPdf/${docRef.id}`)

    } catch (err) {
      toast("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-3 p-3">

      {/* Drop Zone */}
    <div
      // onChange={(e) => setUserText(e.target.value)}
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      className={`
        group relative flex flex-col items-center justify-center gap-4
        rounded-2xl border-[1.5px] border-dashed p-14 cursor-pointer
        overflow-hidden transition-all duration-200
        ${dragging
          ? "border-solid border-violet-600 bg-violet-50 scale-[1.015]"
          : file
          ? "border-solid border-violet-500 bg-violet-50"
          : "border-gray-200 bg-gray-50 hover:border-violet-400 hover:bg-violet-50"
        }
      `}
    >
      {/* Drag overlay */}
      <div className={`
        absolute inset-0 flex flex-col items-center justify-center gap-2
        bg-violet-50 rounded-2xl transition-opacity duration-200
        ${dragging ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-9 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m0 0l-4-4m4 4l4-4" />
        </svg>
        <p className="text-sm font-medium text-violet-600">Drop to upload</p>
      </div>

      {/* Icon */}
      <div className={`
        w-16 h-16 rounded-[18px] flex items-center justify-center
        border transition-all duration-200
        ${dragging || file
          ? "bg-violet-700 border-transparent"
          : "bg-white border-gray-100 group-hover:bg-violet-700 group-hover:border-transparent"
        }
      `}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`size-7 transition-colors duration-200 ${dragging || file ? "text-white" : "text-violet-500 group-hover:text-white"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>

      {/* Label or file pill */}
      {file ? (
        <div
          className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-2.5"
          onClick={(e) => e.stopPropagation()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-violet-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
          </svg>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">{file.name}</p>
            <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setFile(null) }}
            className="ml-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center shrink-0 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-gray-700 font-medium text-[15px]">
            Drop your PDF here, or{" "}
            <span className="text-violet-600 underline underline-offset-2">browse</span>
          </p>
          <p className="text-gray-400 text-sm">PDF files only · max 10 MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
    <div className="flex items-center justify-center gap-5 mt-1">
      {[
        { label: "End-to-end secure" },
        { label: "AI reads it for you" },
        { label: "~10 second summary" },
      ].map(({  label }) => (
        <span key={label} className="flex items-center gap-1.5 text-xs text-gray-400">
          {label}
        </span>
      ))}
    </div>
    <Button onClick={SummaryPDF}>Summarize pdf</Button>

      {/* Auth Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in with Google</DialogTitle>
            <DialogDescription>
              To access this feature, please sign in with your Google account. We use Google authentication to ensure a secure and seamless login experience. Your data will be protected and we will not share your information with third parties.
            </DialogDescription>
            <Button className="mt-8" onClick={signInWithGoogle}>
              Sign in with Google
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default PDFUpload



// "use client"

// import { useState, useRef, DragEvent } from "react"
// import { Dialog, DialogTitle, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog"
// import { Button } from "@/components/ui/button"
// import { signInWithPopup } from "firebase/auth"
// import { auth, provider, db } from "@/config/firebaseConfig"
// import { toast } from "sonner"





// interface PDFUploadProps {
//   onFileSelect?: (file: File | null) => void
// }

// const PDFUpload = ({ onFileSelect }: PDFUploadProps) => {
//   const [open, setOpen] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const [file, setFile] = useState<File | null>(null)
//   const [dragging, setDragging] = useState(false)
//   const inputRef = useRef<HTMLInputElement>(null)

  // const PDFUpload = () => {
//   const [open, setOpen] = useState(false)
//   const [file, setFile] = useState<File | null>(null)
//   const [dragging, setDragging] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const inputRef = useRef<HTMLInputElement>(null)
//   const router = useRouter()

//   const signInWithGoogle = async () => {
//   const results = await signInWithPopup(auth, provider);
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0]
//     if (selected && selected.type === "application/pdf") {
//       setFile(selected)
//       onFileSelect?.(selected)
//     }
//   }

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     setDragging(false)
//     const dropped = e.dataTransfer.files?.[0]
//     if (dropped && dropped.type === "application/pdf") {
//       setFile(dropped)
//       onFileSelect?.(dropped)
//     }
//   }

//   const removeFile = () => {
//     setFile(null)
//     onFileSelect?.(null)
//     if (inputRef.current) {
//       inputRef.current.value = ""
//     }
//   }

//   const SummaryPDF = async () => {
//   // 1. Auth guard
//     if (!isAuth) {
//       setOpen(true)
//       return
//     }
//   }

//   // 2. File guard
//   if (!file) return

//   // 3. Size guard
//   const MIN_SIZE = 2 * 1024 // 2KB
//   if (file.size < MIN_SIZE) {
//     toast("Document is too small to summarize.")
//     return
//   }

//   return (
//     <div className="w-full max-w-xl mx-auto flex flex-col gap-3">
//       {/* Drop Zone */}
//       <div
//         onClick={() => inputRef.current?.click()}
//         onDrop={handleDrop}
//         onDragOver={(e) => {
//           e.preventDefault()
//           setDragging(true)
//         }}
//         onDragLeave={() => setDragging(false)}
//         className={`
//           group relative flex flex-col items-center justify-center gap-4
//           rounded-2xl border-[1.5px] border-dashed p-14 cursor-pointer
//           overflow-hidden transition-all duration-200
//           ${dragging
//             ? "border-solid border-violet-600 bg-violet-50 scale-[1.015]"
//             : file
//             ? "border-solid border-violet-500 bg-violet-50"
//             : "border-gray-200 bg-gray-50 hover:border-violet-400 hover:bg-violet-50"
//           }
//         `}
//       >
//         {/* Drag overlay */}
//         <div
//           className={`
//             absolute inset-0 flex flex-col items-center justify-center gap-2
//             bg-violet-50 rounded-2xl transition-opacity duration-200
//             ${dragging ? "opacity-100" : "opacity-0 pointer-events-none"}
//           `}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="size-9 text-violet-600"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1.5}
//               d="M12 4v16m0 0l-4-4m4 4l4-4"
//             />
//           </svg>
//           <p className="text-sm font-medium text-violet-600">Drop to upload</p>
//         </div>

//         {/* Icon */}
//         <div
//           className={`
//             w-16 h-16 rounded-[18px] flex items-center justify-center
//             border transition-all duration-200
//             ${dragging || file
//               ? "bg-violet-700 border-transparent"
//               : "bg-white border-gray-100 group-hover:bg-violet-700 group-hover:border-transparent"
//             }
//           `}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className={`size-7 transition-colors duration-200 ${
//               dragging || file ? "text-white" : "text-violet-500 group-hover:text-white"
//             }`}
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1.5}
//               d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//             />
//           </svg>
//         </div>

//         {/* Label or file pill */}
//         {file ? (
//           <div
//             className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-2.5"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="size-5 text-violet-600 shrink-0"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
//             </svg>
//             <div className="min-w-0">
//               <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
//                 {file.name}
//               </p>
//               <p className="text-xs text-gray-400">
//                 {(file.size / 1024 / 1024).toFixed(2)} MB
//               </p>
//             </div>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation()
//                 removeFile()
//               }}
//               className="ml-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center shrink-0 transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="size-3 text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center gap-1.5 text-center">
//             <p className="text-gray-700 font-medium text-[15px]">
//               Drop your PDF here, or{" "}
//               <span className="text-violet-600 underline underline-offset-2">
//                 browse
//               </span>
//             </p>
//             <p className="text-gray-400 text-sm">PDF files only · max 10 MB</p>
//           </div>
//         )}

//         <input
//           ref={inputRef}
//           type="file"
//           accept=".pdf"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//       </div>

//       <Button onClick={() => setOpen(!open)}>Summarize pdf</Button>

//        {/* Auth Dialog */}
//        <Dialog open={open} onOpenChange={setOpen}>
//          <DialogContent>
//            <DialogHeader>
//              <DialogTitle>Sign in with Google</DialogTitle>
//              <DialogDescription>
//                To access this feature, please sign in with your Google account. We use Google authentication to ensure a secure and seamless login experience. Your data will be protected and we will not share your information with third parties.
//              </DialogDescription>
//              <Button className="mt-8" onClick={signInWithGoogle}>
//                Sign in with Google
//              </Button>
//            </DialogHeader>
//          </DialogContent>
//        </Dialog>

//     </div>
//   )
// }

// export default PDFUpload




