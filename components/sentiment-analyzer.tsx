"use client"

import { useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import type { WinxCharacter } from "@/lib/characters"
import Image from "next/image"
import { WinxButton } from "./winx-button"
import { ShareResultButton } from "./share-result-button"
import { Sparkles } from "lucide-react"

type AnalysisResult = {
  character: WinxCharacter
}

export function SentimentAnalyzer() {
  const { context } = useMiniKit()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    const userFid = context?.user?.fid

    if (!userFid) {
      setError("Please connect your Farcaster account to analyze your posts!")
      setLoading(false)
      setResult(null)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    console.log(`Frontend: Analyzing FID: ${userFid}`)

    try {
      const response = await fetch("/api/analyze-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fid: userFid }),
      })
      const data = await response.json()
      if (!response.ok || data.error) throw new Error(data.error || "Analysis failed")
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return <ResultScreen result={result} onReset={() => setResult(null)} />
  }

  return (
    <div className="w-full">
      {/* Main card */}
      <div className="magic-bg-card magic-border rounded-3xl p-8 text-center magic-glow">
        <div className="mb-8">
          <Sparkles className="w-12 h-12 text-violet-400 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-slate-700 mb-2">Which Winx fairy are you?</h2>
          <p className="text-slate-500 text-sm">Let's analyze your magical essence</p>
        </div>

        <WinxButton
          onClick={handleAnalyze}
          disabled={loading || !context?.user?.fid}
          variant="magic"
          className="w-full"
        >
          {loading ? "Analyzing..." : !context?.user?.fid ? "Connect Wallet" : "Discover Your Magic"}
        </WinxButton>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}

function ResultScreen({ result, onReset }: { result: AnalysisResult; onReset: () => void }) {
  const characterImages: Record<string, string> = {
    Bloom: "/bloom.png",
    Stella: "/stella.png",
    Flora: "/flora.png",
    Musa: "/musa.png",
    Tecna: "/tecna.png",
    Aisha: "/aisha.png",
  }

  const characterName = result.character.name

  return (
    <div className="w-full space-y-6">
      {/* Result header */}
      <div className="text-center">
        <h2 className="text-3xl font-light text-magic-gradient mb-2">You are {characterName}</h2>
        <p className="text-slate-500 text-sm">
          {result.character.power} • {result.character.trait}
        </p>
      </div>

      {/* Character image */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-pink-400/20 rounded-full blur-xl"></div>
          <div className="relative magic-bg-card magic-border rounded-full p-4 magic-glow">
            <Image
              src={characterImages[characterName] || "/placeholder.svg?width=150&height=150"}
              alt={characterName}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="magic-bg-card magic-border rounded-2xl p-6 text-center magic-glow">
        <p className="text-slate-700 leading-relaxed">{result.character.description}</p>
      </div>

      {/* Share button */}
      <ShareResultButton character={result.character} onReset={onReset} />
    </div>
  )
}
