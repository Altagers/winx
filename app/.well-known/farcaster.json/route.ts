function withValidProperties(properties: Record<string, undefined | string | string[]>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return !!value
    }),
  )
}

export async function GET() {
  // Используем правильный URL с fallback
  const URL = process.env.NEXT_PUBLIC_URL || "https://winx-nine.vercel.app"

  console.log("NEXT_PUBLIC_URL from env:", process.env.NEXT_PUBLIC_URL)
  console.log("Using URL:", URL)

  const manifest = {
    // Временно убираем ассоциацию аккаунта до создания новой
    // accountAssociation: {
    //   header: process.env.FARCASTER_HEADER,
    //   payload: process.env.FARCASTER_PAYLOAD,
    //   signature: process.env.FARCASTER_SIGNATURE,
    // },
    frame: withValidProperties({
      version: "1",
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Winx Analyzer",
      subtitle: "Discover your magical essence", // Убрали эмодзи, сократили до 30 символов
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Find out which Winx fairy you are!",
      iconUrl: `${URL}/winx_icon.png`,
      splashImageUrl: `${URL}/winx_splash.png`,
      splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#8B5CF6",
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY || "entertainment",
      heroImageUrl: `${URL}/winx_banner.png`,
      tagline: "Discover your magical essence", // Убрали эмодзи, сократили до 30 символов
      ogTitle: "Winx Analyzer", // Сократили до 30 символов
      ogDescription: "Analyze your Farcaster posts to find out which Winx fairy you are most like.", // Сократили до 100 символов
      ogImageUrl: `${URL}/winx_banner.png`,
    }),
  }

  console.log("Farcaster Manifest:", JSON.stringify(manifest, null, 2))

  return Response.json(manifest, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  })
}
