"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle2, FileText, XCircle } from "lucide-react";
import { useState } from "react";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ProgressEvent = {
  stage: "parsing" | "chunking" | "embedding" | "storing" | "done" | "error";
  message?: string;
  percent?: number;
  error?: string;
};

export default function PDFUpload() {
  const [progress, setProgress] = useState<ProgressEvent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open,setOpen] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const {isAuth, userEmail} = useGetUserInfo();


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMessage(null);
    setProgress(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.body) throw new Error("No response stream.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Accumulate chunks and split on newlines (NDJSON)
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? ""; // keep incomplete last line

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event: ProgressEvent = JSON.parse(line);
            setProgress(event);

            if (event.stage === "done") {
              setMessage({ type: "success", text: event.message ?? "Done!" });
              e.target.value = "";
            } else if (event.stage === "error") {
              setMessage({
                type: "error",
                text: event.error ?? "An error occurred.",
              });
            }
          } catch {
            // malformed line — skip
          }
        }
      }
    } catch {
      setMessage({
        type: "error",
        text: "Failed to upload and process the PDF file.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const percent = progress?.percent ?? 0;
  const isDone = progress?.stage === "done";
  const isError = progress?.stage === "error";

  const uploadPdf = async () => {
    if(!isAuth) {
      setOpen(true);
      return;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Upload PDF</h1>
          <p className="text-sm text-muted-foreground">
            Add documents to your knowledge base
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-5">
            {/* File input */}
            <div className="space-y-2">
              <Label htmlFor="pdf-upload" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                PDF file
              </Label>
              <Input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={isLoading}
                className="cursor-pointer"
              />
            </div>

            {/* Progress bar — visible while loading or on completion */}
            {(isLoading || isDone) && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span className="truncate max-w-[80%]">
                    {progress?.message ?? "Starting…"}
                  </span>
                  <span className="font-mono font-medium tabular-nums">
                    {percent}%
                  </span>
                </div>

                {/* Track */}
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  {/* Fill */}
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${percent}%`,
                      background: isError
                        ? "hsl(var(--destructive))"
                        : isDone
                        ? "hsl(142 71% 45%)"   // green when done
                        : "hsl(var(--primary))",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Result alert */}
            {message && (
              <Alert
                variant={message.type === "error" ? "destructive" : "default"}
                className={
                  message.type === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400"
                    : undefined
                }
              >
                {message.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 !text-green-600 dark:!text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {message.type === "error" ? "Error" : "Success"}
                </AlertTitle>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <Link href='/chat'>
          <Button className='mt-8 px-6 py-4 '>
            Chat with PDF
            <ArrowRight size={13} />
          </Button>
        </Link>
      </div>
    </div>
  );
}