"use client"

import { useEffect } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { SentimentAnalyzer } from "@/components/sentiment-analyzer"
import { Sparkles } from "lucide-react"

// Subtle magic sparkle component
const MagicSparkle = ({
  top,
  left,
  delay = "0s",
}: {
  top: string
  left: string
  delay?: string
}) => {
  return (
    <Sparkles
      className="absolute text-violet-300/30 w-4 h-4 animate-pulse"
      style={{ top, left, animationDelay: delay }}
    />
  )
}

export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 selection:bg-violet-200 selection:text-violet-900">
      {/* Subtle magic sparkles */}
      <MagicSparkle top="15%" left="10%" delay="0.5s" />
      <MagicSparkle top="25%" left="85%" delay="1.2s" />
      <MagicSparkle top="70%" left="15%" delay="0.8s" />
      <MagicSparkle top="80%" left="80%" delay="1.5s" />

      {/* Minimal header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-light text-magic-gradient mb-4 tracking-tight">Winx Analyzer</h1>
        <p className="text-slate-600 text-lg font-light">Discover your magical essence ✨</p>
      </header>

      {/* Main analyzer component */}
      <div className="w-full max-w-md">
        <SentimentAnalyzer />
      </div>

      {/* Footer with credits */}
      <footer className="mt-16 text-center">
        <p className="text-slate-400 text-sm font-light mb-2">Made with magic and code</p>
        <p className="text-slate-400 text-xs">
          Built by <span className="text-violet-500 font-medium">@altagers.eth</span> with support from{" "}
          <span className="text-violet-500 font-medium">@sohey</span>
        </p>
      </footer>
    </div>
  )
}
