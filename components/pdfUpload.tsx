// "use client"

// import { useState } from "react"

// const PDFUpload = () => {
//   const [file, setFile] = useState<File | null>(null)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0]
//     if (selected) setFile(selected)
//   }

//   return (
//     <div>
//       <input
//         type="file"
//         accept=".pdf"
//         onChange={handleFileChange}
//         className="bg-white w-full h-[70vh] shadow-md rounded-2xl flex p-2"
//       />
//       {file && <p>Selected: {file.name}</p>}
//     </div>
//   )
// }

// export default PDFUpload

// "use client"

// import { useState, useRef, DragEvent } from "react"
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogTitle } from "./ui/dialog";
// import { DialogContent, DialogDescription, DialogHeader } from "./ui/dialog";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "@/config/firebaseConfig";
// import { useGetUserInfo } from "@/hooks/useGetUserInfo";
// import { toast } from "sonner";
// import { GoogleGenAI } from "@google/genai";
// import Link from "next/link";


// const PDFUpload = () => {
//   const [open, setOpen] = useState(false)
//   const [file, setFile] = useState<File | null>(null)
//   const [dragging, setDragging] = useState(false)
//   const inputRef = useRef<HTMLInputElement>(null)
//   const [loading, setLoading] = useState(false)

//   // im using a pdf file to test the upload functionality
//   const [summary, setSummary] = useState("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0]
//     if (selected) setFile(selected)
//   }

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     setDragging(false)
//     const dropped = e.dataTransfer.files?.[0]
//     if (dropped && dropped.type === "application/pdf") setFile(dropped)
//   }

//   const { isAuth, userEmail} = useGetUserInfo();


//   const signInWithGoogle = async () => {
//     const result = await signInWithPopup(auth, provider)

//     const authInfo = {
//       userId: result.user.uid,
//       userEmail: result.user.email,
//       name: result.user.displayName,
//       isAuth: true,
//     };

//     if(typeof window !== "undefined") {
//       localStorage.setItem("authInfo", JSON.stringify(authInfo));
//     }
//   };

//   const SummaryPDF = async() => {
//     if(!isAuth) {
//       setOpen(true);
//       return;
//     }

//     const MIN_SIZE = 2 * 1024        // 2KB

//     if (!file) return

//     if(file.size < MIN_SIZE) {
//       // Handle Ssmall file type
//       toast("Document is too small to summarize.");
//     }

//     // const prompt = `Summarize this text: ${file.name}`;
//     // const result = await 

// //
//     try {
//       setLoading(true)
//       setSummary("")

//       // Convert PDF to base64
//       const base64 = await new Promise<string>((resolve, reject) => {
//         const reader = new FileReader()
//         reader.onload = () => {
//           const result = reader.result as string
//           resolve(result.split(",")[1]) // strip the data:application/pdf;base64, prefix
//         }
//         reader.onerror = reject
//         reader.readAsDataURL(file)
//       })

//           // Send to Gemini
//     const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: [
//         {
//           role: "user",
//           parts: [
//             { inlineData: { mimeType: "application/pdf", data: base64 } },
//             { text: "Please summarize this PDF clearly and concisely. Highlight the key points." },
//           ],
//         },
//       ],
//     });

//     setSummary(response.text ?? "Could not generate summary.");


//     // const data = await response.json()
//     // const text = data.content?.[0]?.text || "Could not generate summary."
//     // setSummary(text)

//   } catch (err) {
//     toast("Something went wrong. Please try again.")
//     console.error(err)
//   } finally {
//     setLoading(false)
//   }
// }






//   return (
//     <div className="w-full max-w-xl mx-auto flex flex-col gap-3">

//       {/* Drop Zone */}
//       <div
//         onClick={() => inputRef.current?.click()}
//         onDrop={handleDrop}
//         onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
//         onDragLeave={() => setDragging(false)}
//         className={`
//           group flex flex-col items-center justify-center gap-4
//           rounded-2xl border-2 border-dashed p-14 cursor-pointer
//           transition-all duration-300
//           ${dragging
//             ? "border-violet-500 bg-violet-50 scale-[1.02]"
//             : "border-gray-200 bg-gray-50 hover:border-violet-400 hover:bg-violet-50"
//           }
//         `}
//         // onChange={(e) => setFile(e.target.files?.[0] || null)}
//       >
//         {/* Icon */}
//         <div className={`
//           rounded-2xl p-4 transition-all duration-300
//           ${dragging ? "bg-violet-200" : "bg-gray-200 group-hover:bg-violet-200"}
//         `}>
//           <svg xmlns="http://www.w3.org/2000/svg" className="size-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//         </div>

//         {file ? (
//           <div className="flex flex-col items-center gap-1">
//             <p className="text-violet-700 font-semibold">{file.name}</p>
//             <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center gap-2 text-center">
//             <p className="text-gray-700 font-semibold text-base">
//               Drop your PDF here, or{" "}
//               <span className="text-violet-600 underline underline-offset-2">browse</span>
//             </p>
//             <p className="text-gray-400 text-sm">PDF files only · Max 10MB</p>
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

//       {/* Submit Button */}
//       <Link href="/summaryPdf/[id]">
//         {file && (
//         <Button className="w-full bg-black hover:bg-gray-900 active:scale-[0.98] transition-all text-white font-semibold py-3 rounded-2xl" onClick={SummaryPDF}>
//           Summarize PDF
//         </Button>
//       )}
//       </Link>
      
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Sign in with Google</DialogTitle>
//             <DialogDescription>
//               To access this feature, please sign in with your Google account. We use Google authentication to ensure a secure and seamless login experience. Your data will be protected and we will not share your information with third parties.
//             </DialogDescription>
//             <Button className="mt-8" onClick={signInWithGoogle}>
//               Sign in with Google
//             </Button>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>

//     </div>
//   )
// }

// export default PDFUpload


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
import { GoogleGenAI } from "@google/genai"
import { Link } from "lucide-react"

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
    const result = await signInWithPopup(auth, provider)
    const authInfo = {
      userId: result.user.uid,
      userEmail: result.user.email,
      name: result.user.displayName,
      isAuth: true,
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("authInfo", JSON.stringify(authInfo))
    }
  }

  const SummaryPDF = async () => {
    // 1. Auth guard
    if (!isAuth) {
      setOpen(true)
      return
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

      // 5. Send to Gemini
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY })

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [
              { inlineData: { mimeType: "application/pdf", data: base64 } },
              { text: "Please summarize this PDF clearly and concisely. Highlight the key points." },
            ],
          },
        ],
      })

      const text = response.text ?? "Could not generate summary."

      // 6. Save to Firestore
      const docRef = await addDoc(collection(db, "summaries"), {
        summary: text,
        fileName: file.name,
        userEmail: userEmail,
        createdAt: new Date(),
      })

      // 7. Navigate to the dynamic summary page with the real Firestore ID
      router.push(`/summaryPdf/${docRef.id}`)

    } catch (err) {
      toast("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-3">

      {/* Drop Zone */}
      {/* Drop Zone */}
    <div
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

    {/* Submit Button */}
    {file && (
      <Button
        onClick={SummaryPDF}
        disabled={loading}
        className="w-full bg-[#1a1a1a] hover:bg-[#333] active:scale-[0.985] transition-all text-white font-medium py-3.5 rounded-2xl disabled:opacity-40"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="size-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Summarizing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l14 9-14 9V3z" />
            </svg>
            Summarize PDF
          </span>
        )}
      </Button>
    )}

    {/* Hint row */}
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
    <Button>Summarize pdf</Button>
      {/* Submit Button — no Link wrapper */}
      {file && (
        <Button
          onClick={SummaryPDF}
          disabled={loading}
          className="w-full bg-black hover:bg-gray-900 active:scale-[0.98] transition-all text-white font-semibold py-3 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="size-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Summarizing...
            </span>
          ) : (
            "Summarize PDF"
          )}
        </Button>
      )}

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