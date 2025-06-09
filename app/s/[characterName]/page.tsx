import type { Metadata, ResolvingMetadata } from "next"
import { characters } from "@/lib/characters"
import { WinxButton } from "@/components/winx-button"

type Props = {
  params: { characterName: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const characterNameParam = decodeURIComponent(params.characterName)
  const character = Object.values(characters).find((c) => c.name.toLowerCase() === characterNameParam.toLowerCase())

  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://v0-powerpuff-girls-brown.vercel.app"
  const appName = process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Winx Analyzer"

  // Ensure icon and splash URLs are absolute and have defaults
  const appIcon = process.env.NEXT_PUBLIC_APP_ICON || "/winx_icon.png"
  const appIconUrl = appIcon.startsWith("http")
    ? appIcon
    : `${appBaseUrl}${appIcon.startsWith("/") ? "" : "/"}${appIcon}`

  const appSplashImage = process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE || "/winx_splash.png"
  const appSplashImageUrl = appSplashImage.startsWith("http")
    ? appSplashImage
    : `${appBaseUrl}${appSplashImage.startsWith("/") ? "" : "/"}${appSplashImage}`

  const appSplashBackgroundColor = process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#FF6B9D"
  const defaultFcFrameImage = process.env.NEXT_PUBLIC_APP_HERO_IMAGE || `${appBaseUrl}/winx_banner.png`

  // Define the frame structure
  let frameDefinition: any

  if (!character) {
    frameDefinition = {
      version: "next",
      imageUrl: defaultFcFrameImage,
      button: {
        title: "Open Winx Analyzer",
        action: {
          type: "launch_frame",
          name: appName,
          url: appBaseUrl,
          splashImageUrl: appSplashImageUrl,
          splashBackgroundColor: appSplashBackgroundColor,
        },
      },
    }
    return {
      title: "Winx Analyzer Result",
      description: "See which Winx fairy you are!",
      openGraph: {
        title: "Winx Analyzer",
        description: "Which Winx fairy are you? Find out!",
        images: [{ url: defaultFcFrameImage }],
      },
      other: {
        "fc:frame": JSON.stringify(frameDefinition),
      },
    }
  }

  const characterImageMap: Record<string, string> = {
    Bloom: "/bloom.png",
    Stella: "/stella.png",
    Flora: "/flora.png",
    Musa: "/musa.png",
    Tecna: "/tecna.png",
    Aisha: "/aisha.png",
  }
  const characterImagePublicPath = characterImageMap[character.name] || "/placeholder.svg"

  const dynamicImageUrl = new URL("/api/generate-og-image", appBaseUrl)
  dynamicImageUrl.searchParams.set("characterName", character.name)
  dynamicImageUrl.searchParams.set("characterImage", characterImagePublicPath)

  frameDefinition = {
    version: "next",
    imageUrl: dynamicImageUrl.toString(),
    button: {
      title: `I'm ${character.name}! Open Winx Analyzer`,
      action: {
        type: "launch_frame",
        name: appName,
        url: appBaseUrl,
        splashImageUrl: appSplashImageUrl,
        splashBackgroundColor: appSplashBackgroundColor,
      },
    },
  }

  return {
    title: `I'm ${character.name}! - Winx Analyzer Result`,
    description: `I found out I'm ${character.name} using the Winx Analyzer! ${character.description}`,
    openGraph: {
      title: `I'm ${character.name}! ${character.emoji}`,
      description: character.description,
      images: [{ url: dynamicImageUrl.toString(), width: 1200, height: 630, alt: `${character.name} Result` }],
    },
    other: {
      "fc:frame": JSON.stringify(frameDefinition),
    },
  }
}

// Fallback page content
export default function SharePage({ params }: Props) {
  const characterNameParam = decodeURIComponent(params.characterName)
  const character = Object.values(characters).find((c) => c.name.toLowerCase() === characterNameParam.toLowerCase())
  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://v0-powerpuff-girls-brown.vercel.app"

  if (!character) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-8 text-center">
        <h1 className="text-4xl font-heading text-white mb-6 drop-shadow-lg">Oops! Character Not Found</h1>
        <p className="font-body text-xl text-pink-100 mb-8">We couldn't find that Winx result.</p>
        <a href={appBaseUrl}>
          <WinxButton variant="magic" className="text-xl">
            Take the Quiz!
          </WinxButton>
        </a>
      </div>
    )
  }

  const characterImageMap: Record<string, string> = {
    Bloom: "/bloom.png",
    Stella: "/stella.png",
    Flora: "/flora.png",
    Musa: "/musa.png",
    Tecna: "/tecna.png",
    Aisha: "/aisha.png",
  }
  const characterImagePublicPath = characterImageMap[character.name] || "/placeholder.svg"
  const ogImageUrl = `${appBaseUrl}/api/generate-og-image?characterName=${encodeURIComponent(character.name)}&characterImage=${encodeURIComponent(characterImagePublicPath)}`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-8 text-center">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 border-white max-w-lg w-full">
        <h2 className="font-heading text-3xl text-purple-800 mb-4 drop-shadow-sm">✨ This result was shared: ✨</h2>
        <img
          src={ogImageUrl || "/placeholder.svg"}
          alt={`${character.name} Result`}
          width={400}
          height={210}
          className="rounded-lg shadow-xl border-2 border-purple-300 mx-auto mb-6"
        />
        <p className="font-body text-xl text-gray-800 mb-8">
          Someone shared their magical result: They're {character.name}! {character.emoji}
        </p>
        <a href={appBaseUrl}>
          <WinxButton variant="magic" className="text-xl">
            ✨ Find YOUR Magic! ✨
          </WinxButton>
        </a>
      </div>
      <p className="font-body text-sm text-pink-200 mt-8">
        You were viewing a shared result. Click above to discover your own Winx fairy! 🧚‍♀️
      </p>
    </div>
  )
}
