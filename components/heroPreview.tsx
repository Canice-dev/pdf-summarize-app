import { useState, useEffect } from 'react';
import { FileText, Sparkles } from 'lucide-react';

const STEPS = [700, 1500, 2600, 3300, 4300];
const CYCLE_LENGTH = 7200;

export default function HeroPreview() {
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setStep(0);
    const timers = STEPS.map((ms, i) => setTimeout(() => setStep(i + 1), ms));
    const reset = setTimeout(() => setCycle(c => c + 1), CYCLE_LENGTH);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(reset);
    };
  }, [cycle]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');`}</style>

      <div className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: existing headline, simplified for comparison */}
        <div>
          <h1
            className="font-bold text-gray-900"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)', lineHeight: 1.08 }}
          >
            Turn PDFs into Intelligent Conversations
          </h1>
          <p className="mt-6 text-gray-500 text-lg max-w-md">
            Upload your files, ask questions, and receive intelligent answers powered by your documents.
          </p>
        </div>

        {/* Right: new concept */}
        <div className="relative flex items-center justify-center py-8">
          <div className="relative w-full max-w-sm">
            {/* offset card for depth */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-gray-50 rounded-2xl border border-gray-100" />

            <div className="relative bg-white rounded-2xl border border-gray-100 shadow-2xl p-5">
              {/* file header */}
              <div
                className={`flex items-center gap-2 pb-4 mb-4 border-b border-gray-100 transition-opacity duration-500 ${
                  step >= 1 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Q3-Report.pdf</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-400">Connected</span>
                  </div>
                </div>
              </div>

              {/* conversation */}
              <div className="space-y-3" style={{ minHeight: '150px' }}>
                <div
                  className={`flex justify-end transition-all duration-500 ${
                    step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  <div
                    className="bg-gray-900 text-white text-sm rounded-2xl rounded-br-md px-4 py-2.5"
                    style={{ maxWidth: '85%' }}
                  >
                    What's the refund policy on page 12?
                  </div>
                </div>

                {step >= 3 && (
                  <div className="flex justify-start">
                    <div
                      className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2.5"
                      style={{ maxWidth: '88%' }}
                    >
                      {step < 4 ? (
                        <div className="flex gap-1 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      ) : (
                        <div className="text-sm text-gray-700 leading-relaxed">
                          Full refunds are available within 30 days of purchase.
                          <span className="inline-flex items-center ml-1.5 px-1.5 py-0.5 rounded bg-white border border-gray-200 text-xs font-medium text-gray-500 align-middle">
                            Page 12
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* floating badge */}
            <div
              className={`absolute -top-4 -right-4 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transition-all duration-500 ${
                step >= 5 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-6'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Summarized in 4s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}