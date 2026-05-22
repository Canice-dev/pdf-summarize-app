"use client"


import { db } from '@/config/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SummaryPdf = () => {
  const { id } = useParams();

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
    const docRef = doc(db, "Summaries", id as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { id, summary, userEmail, userText } = docSnap.data();
      setData({ id, summary, userEmail, userText });
    } else {
      toast("No Summary found for the given text");
    }
  };

  useEffect(() => {
    if (id) getSummary();
  }, [id]);

  return(
    <div>
      <div>
      <textarea 
        value={data.summary}
      />
    </div>
    </div>
  )
};

export default SummaryPdf;