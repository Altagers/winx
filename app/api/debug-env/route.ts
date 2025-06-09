export async function GET() {
  const envVars = {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || "NOT SET",
    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "NOT SET",
    FARCASTER_HEADER: process.env.FARCASTER_HEADER ? "SET" : "NOT SET",
    FARCASTER_PAYLOAD: process.env.FARCASTER_PAYLOAD ? "SET" : "NOT SET",
    FARCASTER_SIGNATURE: process.env.FARCASTER_SIGNATURE ? "SET" : "NOT SET",
    NEXT_PUBLIC_APP_SUBTITLE: process.env.NEXT_PUBLIC_APP_SUBTITLE || "NOT SET",
    NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "NOT SET",
    NEXT_PUBLIC_APP_ICON: process.env.NEXT_PUBLIC_APP_ICON || "NOT SET",
    NEXT_PUBLIC_APP_SPLASH_IMAGE: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE || "NOT SET",
    NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "NOT SET",
    NEXT_PUBLIC_APP_PRIMARY_CATEGORY: process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY || "NOT SET",
    NEXT_PUBLIC_APP_HERO_IMAGE: process.env.NEXT_PUBLIC_APP_HERO_IMAGE || "NOT SET",
    NEXT_PUBLIC_APP_TAGLINE: process.env.NEXT_PUBLIC_APP_TAGLINE || "NOT SET",
    NEXT_PUBLIC_APP_OG_TITLE: process.env.NEXT_PUBLIC_APP_OG_TITLE || "NOT SET",
    NEXT_PUBLIC_APP_OG_DESCRIPTION: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION || "NOT SET",
    NEXT_PUBLIC_APP_OG_IMAGE: process.env.NEXT_PUBLIC_APP_OG_IMAGE || "NOT SET",
  }

  // Показываем какой URL будет использоваться
  const finalUrl = process.env.NEXT_PUBLIC_URL || "https://winx-nine.vercel.app"

  return Response.json(
    {
      message: "Environment variables check",
      finalUrl: finalUrl,
      variables: envVars,
      timestamp: new Date().toISOString(),
      manifestUrl: `${finalUrl}/.well-known/farcaster.json`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}
