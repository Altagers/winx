export async function GET() {
  const envVars = {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    FARCASTER_HEADER: process.env.FARCASTER_HEADER ? "SET" : "NOT SET",
    FARCASTER_PAYLOAD: process.env.FARCASTER_PAYLOAD ? "SET" : "NOT SET",
    FARCASTER_SIGNATURE: process.env.FARCASTER_SIGNATURE ? "SET" : "NOT SET",
    NEXT_PUBLIC_APP_SUBTITLE: process.env.NEXT_PUBLIC_APP_SUBTITLE,
    NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    NEXT_PUBLIC_APP_ICON: process.env.NEXT_PUBLIC_APP_ICON,
    NEXT_PUBLIC_APP_SPLASH_IMAGE: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE,
    NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
    NEXT_PUBLIC_APP_PRIMARY_CATEGORY: process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY,
    NEXT_PUBLIC_APP_HERO_IMAGE: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
    NEXT_PUBLIC_APP_TAGLINE: process.env.NEXT_PUBLIC_APP_TAGLINE,
    NEXT_PUBLIC_APP_OG_TITLE: process.env.NEXT_PUBLIC_APP_OG_TITLE,
    NEXT_PUBLIC_APP_OG_DESCRIPTION: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION,
    NEXT_PUBLIC_APP_OG_IMAGE: process.env.NEXT_PUBLIC_APP_OG_IMAGE,
  }

  return Response.json(
    {
      message: "Environment variables check",
      variables: envVars,
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}
