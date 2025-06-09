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
  const URL = process.env.NEXT_PUBLIC_URL

  const manifest = {
    accountAssociation: {
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD,
      signature: process.env.FARCASTER_SIGNATURE,
    },
    frame: withValidProperties({
      version: "1",
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Winx Analyzer",
      subtitle: process.env.NEXT_PUBLIC_APP_SUBTITLE || "Discover your magical essence",
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Find out which Winx fairy you are!",
      iconUrl: process.env.NEXT_PUBLIC_APP_ICON || `${URL}/winx_icon.png`,
      splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE || `${URL}/winx_splash.png`,
      splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#8B5CF6",
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY || "entertainment",
      heroImageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE || `${URL}/winx_banner.png`,
      tagline: process.env.NEXT_PUBLIC_APP_TAGLINE || "Discover your magical essence",
      ogTitle: process.env.NEXT_PUBLIC_APP_OG_TITLE || "Winx Analyzer",
      ogDescription: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION || "Which Winx fairy are you?",
      ogImageUrl: process.env.NEXT_PUBLIC_APP_OG_IMAGE || `${URL}/winx_banner.png`,
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
