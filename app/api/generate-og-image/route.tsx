import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { characters } from "@/lib/characters"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const characterName = searchParams.get("characterName")
    const characterImagePublicPath = searchParams.get("characterImage") // e.g., /bloom.png

    // Update this to your actual base URL
    const baseUrl = "https://v0-mini-open-ai.vercel.app"

    if (!characterName || !characterImagePublicPath) {
      return new Response("Missing character information", { status: 400 })
    }

    // Construct absolute URL for the character image
    const characterImageUrl = new URL(characterImagePublicPath, baseUrl).toString()

    const characterData = Object.values(characters).find((c) => c.name === characterName)
    if (!characterData) {
      return new Response("Character not found", { status: 404 })
    }

    const bgColor =
      characterData.name === "Bloom"
        ? "#FF6B35" // Bloom Orange
        : characterData.name === "Stella"
          ? "#FFD700" // Stella Gold
          : characterData.name === "Flora"
            ? "#FF69B4" // Flora Pink
            : characterData.name === "Musa"
              ? "#DC143C" // Musa Red
              : characterData.name === "Tecna"
                ? "#9370DB" // Tecna Purple
                : characterData.name === "Aisha"
                  ? "#00CED1" // Aisha Cyan
                  : "#FF6B9D" // Default Pink

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bgColor,
          padding: "40px",
          border: "10px solid white",
          borderRadius: "30px",
          backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%)",
        }}
      >
        <img
          src={characterImageUrl || "/placeholder.svg"}
          width={300}
          height={300}
          style={{ borderRadius: "50%", border: "8px solid white", marginBottom: "30px" }}
          alt={characterName}
        />
        <h1
          style={{
            fontSize: "82px",
            fontWeight: "bold",
            color: "white",
            textShadow:
              "4px 4px 0 rgba(0,0,0,0.5), -4px -4px 0 rgba(0,0,0,0.5), 4px -4px 0 rgba(0,0,0,0.5), -4px 4px 0 rgba(0,0,0,0.5)",
            margin: "0 0 20px 0",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          You are {characterName}! {characterData.emoji}
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.9)",
            padding: "15px 30px",
            borderRadius: "25px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: bgColor,
            }}
          >
            {characterData.power}
          </span>
        </div>
        <p
          style={{
            fontSize: "32px",
            color: "white",
            textAlign: "center",
            maxWidth: "90%",
            lineHeight: 1.3,
            textShadow: "2px 2px 0 rgba(0,0,0,0.3)",
          }}
        >
          {characterData.description}
        </p>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.error(`OG Image Error: Failed to generate ImageResponse:`, e.message)
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 })
  }
}
