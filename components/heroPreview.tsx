// import { ArrowRight, Globe, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'

// const HeroPreview = () => {
//   return (
//     <div>
//       <div className='className="inline-flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full border transition-colors cursor-default w-fit px-5'>
//         WHAT YOU CAN DO
//       </div>
//       <div className='border rounded-[10px] mt-3 px-3 py-3 shadow'>
//         <div className='flex gap-3'>
//           <div className="w-10 h-10 rounded-[9px] bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
//             <Sparkles size={20} />
//           </div>
//           <div>
//             <h3 className='text-[15px] font-semibold text-zinc-900 leading-snug flex gap-2 text-left mb-2'>
//               AI Summarization
//             </h3>
//             <p className='text-sm leading-relaxed'>Get a concise breakdown of any PDF — key points, no noise.</p>
//           </div>
//         </div>
//         <div className="w-full h-px bg-zinc-100 my-3 max-w-5xl" />
//         <div className='flex gap-3'>
//           <div className="w-10 h-10 rounded-[9px] bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
//             <MessageSquare size={20} />
//           </div>
//           <div>
//             <h3 className='text-[15px] font-semibold text-zinc-900 leading-snug flex gap-2 text-left mb-2'>
//               Chat with your PDF
//             </h3>
//             <p className='text-sm leading-relaxed'>Ask anything and get cited answers grounded in your document.</p>
//           </div>
//         </div>
//         <div className="w-full h-px bg-zinc-100 my-3 max-w-5xl" />
//         <div className='flex gap-3'>
//           <div className="w-10 h-10 rounded-[9px] bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
//             <Globe size={20} />
//           </div>
//           <div>
//             <h3 className='text-[15px] font-semibold text-zinc-900 leading-snug flex gap-2 text-left mb-2'>
//               Real-time Web Search
//             </h3>
//             <p className='text-sm leading-relaxed'>Responses enhanced with live data when your PDF isn't enough.</p>
//           </div>
//         </div>
//         <div className="w-full h-px bg-zinc-100 my-3 max-w-5xl" />
//                 <div className="w-full h-px bg-zinc-100 my-3 max-w-5xl" />
//                 <div className='flex gap-3'>
//           <div className="w-10 h-10 rounded-[9px] bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
//             <ShieldCheck size={20} />
//           </div>
//           <div>
//             <h3 className='text-[15px] font-semibold text-zinc-900 leading-snug flex gap-2 text-left mb-2'>
//               Secure by default
//             </h3>
//             <p className='text-sm leading-relaxed'>End-to-end encrypted uploads. Your files stay yours.</p>
//           </div>
//         </div>
//       </div>
//       <div className='flex justify-end mt-3'>
//         <Link href="#pdf-tools" className='flex'>
//           <p>
//             PDF Tools included
//           </p>
//           <ArrowRight size={15} />
//         </Link>

//       </div>
//     </div>
//   )
// }

// export default HeroPreview

"use client"

import { ArrowUp, Bot, FileText, MoveUp } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import BrandIcon from './BrandIcon';

interface Message {
  role: "user" | "ai";
  text: string;
  typing?: boolean;
}

const DEMO_MESSAGES: Message[] = [
  { role: "user", text: "What are the key findings in this paper?" },
  {
    role: "ai",
    text: "The paper identifies **3 core findings**: reduced latency by 40%, improved throughput, and enhanced reliability under load.",
  },
  { role: "user", text: "Summarize the methodology section" },
  {
    role: "ai",
    text: "The methodology uses a **mixed-methods approach** combining quantitative benchmarks with qualitative case studies across 12 enterprise environments.",
  },
];

const FEATURES = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    label: "AI Summary",
    // color: "#0783F5",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    label: "Chat PDF",
    // color: "#3E88C8",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    label: "Web Search",
    // color: "#0783F5",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    label: "Encrypted",
    // color: "#0783F5",
  },
];

function TypingDots() {
  return(
    <span style={{display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 4px"}}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            // backgroundColor: "#0783F5",
            animation: "bounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.18}s`,
            display: "inline-block",
          }}
        />
      ))}
    </span>
  );
}

function ChatBubble({ msg, visible }: { msg: Message; visible: boolean }) {
  const isAI = msg.role === "ai";
  return (
    <div
      style={{
        display: "flex",
        textAlign: "start",
        justifyContent: isAI ? "flex-start" : "flex-end",
        marginBottom: 10,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.45s cubic-bezier(0.32,0.72,0,1), transform 0.45s cubic-bezier(0.32,0.72,0,1)",
      }}
    >
      {isAI && (
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 8,
            flexShrink: 0,
            fontSize: 10,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.02em",
            alignSelf: "flex-end",
          }}
        >
          <Bot />
        </div>
      )}
      <div
        style={{
          // maxWidth: "74%",
          padding: "9px 13px",
          borderRadius: isAI ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
          background: isAI ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #1B3A68 0%, #0F4DA0 100%)",
          border: isAI ? "0.5px solid rgba(255,255,255,0.09)" : "none",
          fontSize: 11.5,
          lineHeight: 1.55,
          color: isAI ? "rgba(255,255,255,0.85)" : "#fff",
        }}
      >
        {msg.typing ? (
          <TypingDots />
        ) : (
          <span
            dangerouslySetInnerHTML={{
              __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<span style="color:#60AAFF;font-weight:600">$1</span>'),
            }}
          />
        )}
      </div>
    </div>
  );
}

const HeroPreview = () => {


  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [showTyping, setShowTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "summary">("chat");
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [summaryProgress, setSummaryProgress] = useState(0);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
 
  // Animate chat messages sequentially
  useEffect(() => {
    if (activeTab !== "chat") return;
    setVisibleMessages(0);
    setShowTyping(false);
 
    const timings = [400, 1200, 2400, 3200];
    const typingAt = [800, 2000];
 
    timings.forEach((t, i) => {
      setTimeout(() => setVisibleMessages(i + 1), t);
    });
    typingAt.forEach((t, i) => {
      setTimeout(() => setShowTyping(true), t);
      setTimeout(() => setShowTyping(false), t + 600);
    });
  }, [activeTab]);
 
  // Summary tab animation
  useEffect(() => {
    if (activeTab !== "summary") return;
    setSummaryVisible(false);
    setSummaryProgress(0);
    setPdfUploaded(false);
 
    setTimeout(() => setPdfUploaded(true), 300);
    setTimeout(() => setSummaryVisible(true), 700);
 
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setSummaryProgress(Math.min(progress, 100));
      if (progress >= 100) clearInterval(interval);
    }, 18);
 
    return () => clearInterval(interval);
  }, [activeTab]);
 
  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visibleMessages, showTyping]);
 
  const summaryPoints = [
    { text: "3 systemic inefficiencies diagnosed each traced to root cause", delay: "0ms" },
    { text: "40% latency reduction reported across all test environments", delay: "120ms" },
    { text: "Zero data retention end-to-end encryption enforced at every layer", delay: "240ms" },
    { text: "12 enterprise environments validated globally", delay: "360ms" },
  ];

  return (
    <div>
      <style>{` 
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
 
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
 
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(7, 131, 245, 0.25); }
          70% { box-shadow: 0 0 0 8px rgba(7, 131, 245, 0); }
          100% { box-shadow: 0 0 0 0 rgba(7, 131, 245, 0); }
        }
 
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
 
        @keyframes progressGlow {
          0% { box-shadow: 0 0 4px rgba(7, 131, 245, 0.4); }
          50% { box-shadow: 0 0 10px rgba(7, 131, 245, 0.7); }
          100% { box-shadow: 0 0 4px rgba(7, 131, 245, 0.4); }
        }
 
        .hero-tab-btn:hover { background: rgba(255,255,255,0.08) !important; }
        .feature-pill:hover { background: rgba(7, 131, 245, 0.15) !important; border-color: rgba(7, 131, 245, 0.35) !important; }
      `}</style>
 
      {/* ── Inner Core ── */}
      <div
        style={{
          boxShadow: "0 8px 20px rgba(0,0,0,0.45), 0 8px 24px rgba(7,131,245,0.08)",
          background: "#0E1628",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {/* ── Window Chrome Bar ── */}
        <div
          style={{
            background: "#D7E3F5",
            borderBottom: "0.5px solid rgba(255,255,255,0.07)",
            padding: "13px 16px",
          }}
        >
          <div className='text-center'><BrandIcon /></div>
        </div>
        

        {/* ── Tab Switcher ── */}
        <div
          style={{
            display: "flex",
            gap: 4,
            padding: "12px 16px 0",
          }}
        >
          {(["chat", "summary"] as const).map((tab) => (
            <button
              key={tab}
              className="hero-tab-btn"
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "7px 14px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontSize: 11.5,
                fontWeight: 600,
                fontFamily: "inherit",
                letterSpacing: "0.01em",
                background: activeTab === tab ? "rgba(7,131,245,0.18)" : "transparent",
                color: activeTab === tab ? "#D7E3F5" : "white",
                borderBottom: activeTab === tab ? "1.5px solid #0783F5" : "1.5px solid transparent",
                transition: "all 0.3s cubic-bezier(0.32,0.72,0,1)",
                textTransform: "capitalize",
              }}
            >
              {tab === "chat" ? "Chat with PDF" : "AI Summary"}
            </button>
          ))}
        </div>

        {/* ── Hairline Divider ── */}
        <div style={{ height: "0.5px", background: "rgba(255,255,255,0.07)", margin: "0 16px" }} />

        {/* ── PDF Header Strip ── */}
        <div
          style={{
            margin: "12px 16px",
            padding: "10px 14px",
            background: "#10172A",
            border: "0.5px solid #3E6BB0",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #1B3A68 0%, #0783F5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg> */}
            <FileText size={14} stroke='#fff' />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.9)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              research_paper.pdf
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>
              2.4 MB · 56 pages · Indexed
            </div>
          </div>
          <div
            style={{
              padding: "6px 15px",
              borderRadius: 20,
              background: "#3E6BB0",
              border: "0.5px solid #10172A",
              fontSize: 9.5,
              fontWeight: 600,
              color: "white",
              letterSpacing: "0.04em",
              animation: "pulseRing 2.5s ease-out infinite",
            }}
          >
            READY
          </div>
        </div>

        {/* ── CHAT TAB ── */}
        {activeTab === "chat" && (
          <div style={{ padding: "0 16px" }}>
            {/* Messages */}
            <div
              ref={chatRef}
              style={{
                minHeight: 200,
                maxHeight: 200,
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {DEMO_MESSAGES.map((msg, i) => (
                <ChatBubble key={i} msg={msg} visible={i < visibleMessages} />
              ))}
              {showTyping && (
                <ChatBubble
                  msg={{ role: "ai", text: "", typing: true }}
                  visible={showTyping}
                />
              )}
            </div>

            {/* Input Bar */}
            <div
              style={{
                marginTop: 10,
                marginBottom: 14,
                padding: "10px 12px",
                background: "rgba(255,255,255,0.04)",
                border: "0.5px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{  color: "white", flex: 1, textAlign: "start" }}>
                Ask anything about your PDF…
              </span>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 50,
                  background: "#3E6BB0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  cursor: "pointer"
                }}
              >
                <ArrowUp stroke='white' />
              </div>
            </div>
          </div>
        )}

        {/* ── SUMMARY TAB ── */}
        {activeTab === "summary" && (
          <div style={{ padding: "0 16px 16px" }}>
            {/* Progress Bar */}
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <span style={{ color: "#D7E3F5", fontWeight: 500 }}>
                  Analyzing document…
                </span>
                <span style={{ color: "#D7E3F5", fontWeight: 600 }}>
                  {summaryProgress}%
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  background: "rgba(255, 255, 255, 0.07)",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${summaryProgress}%`,
                    background: "linear-gradient(90deg, #1B3A68, #0783F5)",
                    borderRadius: 4,
                    transition: "width 0.05s linear",
                    animation: summaryProgress < 100 ? "progressGlow 1s ease-in-out infinite" : "none",
                  }}
                />
              </div>
            </div>

            {/* Summary Points */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "12px 14px",
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#D7E3F5", letterSpacing: "0.1em", marginBottom: 10 }}>
                KEY FINDINGS
              </div>
              {summaryPoints.map((pt) => (
                <div
                  // key={i}
                  style={{
                    // display: "start",
                    textAlign: "start",
                    gap: 9,
                    // marginBottom: i < summaryPoints.length - 1 ? 9 : 0,
                    opacity: summaryVisible ? 1 : 0,
                    animation: summaryVisible ? `fadeSlideUp 0.4s cubic-bezier(0.32,0.72,0,1) ${pt.delay} both` : "none",
                  }}
                >
                  <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}></span>
                  <span style={{ fontSize: 15, color: "#D7E3F5", lineHeight: 1.55 }}>
                    {pt.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Word count stat strip */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { label: "Pages", value: "56" },
                { label: "Words", value: "16.8k" },
                { label: "Read time", value: "~1 min" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "0.5px solid rgba(255,255,255,0.07)",
                    borderRadius: 10,
                    padding: "8px 10px",
                    textAlign: "center",
                    opacity: summaryVisible ? 1 : 0,
                    animation: summaryVisible ? `fadeSlideUp 0.4s cubic-bezier(0.32,0.72,0,1) ${i * 80 + 400}ms both` : "none",
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#D7E3F5" }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: "#D7E3F5", marginTop: 2, fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom Feature Pills ── */}
        <div
          style={{
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            padding: "11px 16px",
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="feature-pill"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 10px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.04)",
                border: "0.5px solid #D7E3F5",
                cursor: "default",
                transition: "all 0.25s cubic-bezier(0.32,0.72,0,1)",
              }}
            >
              <span style={{ fontSize: 10.5, fontWeight: 600, color: "#D7E3F5", letterSpacing: "0.01em" }}>
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroPreview