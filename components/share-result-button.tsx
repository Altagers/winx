"use client"

import { useState } from "react"
import { sdk } from "@farcaster/frame-sdk"
import { WinxButton } from "./winx-button"
import type { WinxCharacter } from "@/lib/characters"
import { getRandomPhrase } from "@/lib/characters"

interface ShareResultButtonProps {
  character: WinxCharacter
  onReset: () => void
}

export function ShareResultButton({ character, onReset }: ShareResultButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const appBaseUrl = "https://v0-powerpuff-girls-brown.vercel.app"

  const handleShare = async () => {
    setStatus("loading")
    setErrorMessage(null)

    // Construct the URL for the shareable page
    const sharePageUrl = new URL(`/s/${encodeURIComponent(character.name)}`, appBaseUrl).toString()

    // Получаем случайную забавную фразу для персонажа
    const randomPhrase = getRandomPhrase(character)

    const castText = `I'm ${character.name}! ${character.emoji} ${randomPhrase}

Which Winx fairy are you? Discover your magical power with Winx Analyzer! ✨🧚‍♀️

Built by @altagers.eth with support from @sohey`

    try {
      await sdk.actions.composeCast({
        text: castText,
        embeds: [sharePageUrl],
      })
      setStatus("idle")
    } catch (error) {
      console.error("❌ Failed to share cast:", error)
      setStatus("error")
      setErrorMessage("Failed to open Farcaster composer.")
    }
  }

  const characterColors: Record<string, "bloom" | "stella" | "flora" | "musa" | "tecna" | "aisha"> = {
    Bloom: "bloom",
    Stella: "stella",
    Flora: "flora",
    Musa: "musa",
    Tecna: "tecna",
    Aisha: "aisha",
  }
  const buttonVariant = characterColors[character.name] || "magic"

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <WinxButton
        onClick={handleShare}
        disabled={status === "loading"}
        variant={buttonVariant}
        className="w-full text-xl"
      >
        {status === "loading" ? "Preparing Magic..." : `✨ Share Your Magic! ✨`}
      </WinxButton>
      {status === "error" && <p className="text-red-500 font-body mt-2">{errorMessage}</p>}
    </div>
  )
}
