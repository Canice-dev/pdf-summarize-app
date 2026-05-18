"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { db } from '@/config/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface SummaryData {
  id: string
  summary: string
  userEmail: string
  fileName: string
  createdAt: { seconds: number }
}

const PDFSummaryPage = () => {
  const { id } = useParams<{ id: string }>()

  const [data, setData] = useState<SummaryData>({
    id: "", summary: "", userEmail: "", fileName: "", createdAt: { seconds: 0 }
  })
  const [loading, setLoading] = useState(true)

  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const check = () => setIsLargeScreen(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const getSummary = async () => {
    try {
      const docRef = doc(db, "summaries", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setData(docSnap.data() as SummaryData)
      } else {
        toast("No summary found.")
      }
    } catch (err) {
      console.error(err)
      toast("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) getSummary()
  }, [id])

  const formattedDate = data.createdAt?.seconds
    ? new Date(data.createdAt.seconds * 1000).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric"
      })
    : ""

  // PDF metadata panel (replaces userText panel)
  const PDFInfoPanel = () => (
    <div className="flex flex-col gap-3 p-4 text-sm text-gray-600">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400 uppercase tracking-wide">File name</span>
        <span className="font-medium text-gray-800">{data.fileName}</span>
      </div>
      {formattedDate && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-400 uppercase tracking-wide">Summarized on</span>
          <span className="font-medium text-gray-800">{formattedDate}</span>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400 uppercase tracking-wide">Account</span>
        <span className="font-medium text-gray-800">{data.userEmail}</span>
      </div>

      {/* PDF icon */}
      <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 py-12 text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="size-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-sm">PDF content not stored</span>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="size-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">

      {isLargeScreen ? (
        <>
          <div className="flex justify-between items-center w-full text-lg font-semibold pt-5 pb-2">
            <p>PDF Info</p>
            <p>Your Summary</p>
          </div>
          <div className="bg-white w-full h-[70vh] shadow-md rounded-2xl flex p-2">
            <div className="w-1/2 h-full overflow-y-auto border-r">
              <PDFInfoPanel />
            </div>
            <textarea
              className="w-1/2 p-4 text-sm text-gray-700 h-full resize-none outline-none"
              disabled
              value={data.summary}
            />
          </div>
        </>
      ) : (
        <div className="w-full pt-5">
          <Tabs defaultValue="summary" className="flex-col">
            <TabsList className="w-full justify-start gap-4 px-0">
              <TabsTrigger value="info" className="flex-1">PDF Info</TabsTrigger>
              <TabsTrigger value="summary" className="flex-1">Your Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>PDF Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <PDFInfoPanel />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Your Summary</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {data.summary}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      <button className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all">
        <a href="/">Summarize another PDF</a>
      </button>

    </div>
  )
}

export default PDFSummaryPage