import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { characters } from "@/lib/characters"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const characterName = searchParams.get("characterName")
    const characterImagePublicPath = searchParams.get("characterImage") // e.g., /stella.png

    // Обновленный базовый URL
    const baseUrl = "https://winx-nine.vercel.app"

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

    // Создаем более качественное изображение
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
          position: "relative",
        }}
      >
        {/* Фоновые элементы для Стеллы - солнце и луна */}
        {characterData.name === "Stella" && (
          <>
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "60px",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "white",
                boxShadow: "0 0 40px rgba(255, 255, 255, 0.8)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "60px",
                left: "60px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.6)",
              }}
            />
          </>
        )}

        {/* Фоновые элементы для Блум - огонь */}
        {characterData.name === "Bloom" && (
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              width: "80%",
              height: "120px",
              background: "linear-gradient(to top, rgba(255, 100, 0, 0.7), transparent)",
              borderRadius: "50%",
              filter: "blur(20px)",
            }}
          />
        )}

        {/* Фоновые элементы для Флоры - цветы */}
        {characterData.name === "Flora" && (
          <>
            <div
              style={{
                position: "absolute",
                top: "60px",
                left: "60px",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 182, 193, 0.7)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "80px",
                right: "80px",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 182, 193, 0.7)",
              }}
            />
          </>
        )}

        {/* Изображение персонажа в круглой рамке */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
            marginBottom: "30px",
            overflow: "hidden",
            border: "8px solid white",
          }}
        >
          <img
            src={characterImageUrl || "/placeholder.svg"}
            width={300}
            height={300}
            style={{
              objectFit: "cover",
              borderRadius: "50%",
            }}
            alt={characterName}
          />
        </div>

        {/* Заголовок с именем персонажа */}
        <h1
          style={{
            fontSize: "82px",
            fontWeight: "bold",
            color: "white",
            textShadow:
              "4px 4px 0 rgba(0,0,0,0.3), -4px -4px 0 rgba(0,0,0,0.3), 4px -4px 0 rgba(0,0,0,0.3), -4px 4px 0 rgba(0,0,0,0.3)",
            margin: "0 0 20px 0",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          You are {characterName}! {characterData.emoji}
        </h1>

        {/* Плашка с силой персонажа */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.9)",
            padding: "15px 30px",
            borderRadius: "25px",
            marginBottom: "20px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
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

        {/* Описание персонажа */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            padding: "20px 30px",
            borderRadius: "20px",
            maxWidth: "80%",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            style={{
              fontSize: "28px",
              color: "#333",
              textAlign: "center",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {characterData.description}
          </p>
        </div>

        {/* Плашка с авторами */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            backgroundColor: "rgba(255,255,255,0.9)",
            padding: "8px 15px",
            borderRadius: "15px",
            fontSize: "16px",
            color: "#333",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          Built by @altagers.eth with @sohey
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Type": "image/png",
        },
      },
    )
  } catch (e: any) {
    console.error(`OG Image Error: Failed to generate ImageResponse:`, e.message)
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 })
  }
}
