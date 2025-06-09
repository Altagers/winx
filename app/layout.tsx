import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { MiniKitContextProvider } from "@/provider/minikit-provider"

export const metadata: Metadata = {
  title: "Winx Analyzer - Which Winx Fairy Are You?",
  description:
    "Discover your magical essence! Analyze your Farcaster posts to find out which Winx fairy you are most like.",
  generator: "v0.dev",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://v0-powerpuff-girls-brown.vercel.app/winx_banner.png",
      button: {
        title: "Discover Your Magic ✨",
        action: {
          type: "launch_frame",
          name: "Winx Analyzer",
          url: "https://v0-powerpuff-girls-brown.vercel.app",
          splashImageUrl: "https://v0-powerpuff-girls-brown.vercel.app/winx_splash.png",
          splashBackgroundColor: "#8B5CF6",
        },
      },
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <MiniKitContextProvider>{children}</MiniKitContextProvider>
      </body>
    </html>
  )
}
