import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { characters } from "@/lib/characters"

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const fid = body.fid

    if (!fid) {
      throw new Error("FID not provided in the request body")
    }

    console.log(`Backend: Received request to analyze FID: ${fid}`)

    if (!process.env.NEYNAR_API_KEY) {
      throw new Error("Neynar API key not configured")
    }
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured")
    }

    console.log(`Backend: Querying Neynar API for FID: ${fid}`)

    const neynarResponse = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/popular?fid=${fid}&limit=10`, {
      method: "GET",
      headers: {
        accept: "application/json",
        api_key: process.env.NEYNAR_API_KEY,
      },
    })

    if (!neynarResponse.ok) {
      const errorText = await neynarResponse.text()
      console.error(`Backend: Neynar API error for FID ${fid}: ${errorText}`)
      throw new Error(`Neynar API error: ${neynarResponse.status} - ${errorText}`)
    }

    const neynarData = await neynarResponse.json()
    const castTexts = neynarData.casts?.map((cast: any) => cast.text).filter(Boolean) || []

    if (castTexts.length === 0) {
      console.log(`Backend: No casts found for FID ${fid}. Defaulting to Bloom.`)
      return NextResponse.json({ character: characters.bloom })
    }

    const allPosts = castTexts.join("\n---\n")
    console.log(`Backend: Sending ${castTexts.length} cast(s) to OpenAI for FID ${fid}.`)

    const { text: characterName } = await generateText({
      model: openai("gpt-4o-mini"),
      system: `You are a personality analyzer for Winx Club characters. Analyze the user's posts and determine which character they match best. Be specific and look for distinct patterns:

BLOOM - The Dragon Flame Leader:
- Uses decisive language, takes initiative
- Posts about protecting friends, justice, fighting for what's right
- Shows leadership qualities, inspires others
- Not afraid of conflicts for the right cause
- Language: "fight", "protect", "justice", "forward", "team", "lead", "strong"

STELLA - The Shining Princess:
- Lots of positivity, emojis, bright descriptions
- Posts about fashion, beauty, style, entertainment
- Optimistic posts, lifts others' spirits
- Loves attention, shares photos and experiences
- Language: "beautiful", "stylish", "brilliant", "amazing", "love", "gorgeous", "fabulous"

FLORA - The Nature Fairy:
- Gentle, caring tone in communication
- Posts about nature, animals, helping others
- Supports and comforts in comments
- Avoids conflicts, seeks compromises
- Language: "care", "help", "nature", "harmony", "support", "gentle", "peaceful"

MUSA - The Music Fairy:
- Emotional, deep posts
- Posts about music, art, feelings
- Can be melancholic or passionate
- Expresses complex emotions and experiences
- Language: "feel", "music", "art", "soul", "emotions", "rhythm", "melody"

TECNA - The Technology Fairy:
- Logical, structured posts
- Posts about technology, science, facts
- Uses precise data and arguments
- Analytical approach to problems
- Language: "analyze", "data", "logic", "technology", "efficiency", "system", "calculate"

AISHA - The Morphix Fairy:
- Active posts about sports and adventures
- Independent, not afraid to voice opinions
- Posts about travel, extreme sports, achievements
- Straightforward, honest in communication
- Language: "action", "sport", "adventure", "freedom", "achievement", "active", "move"

Respond with ONLY the character name that best matches the overall pattern. Consider the dominant themes, not just individual posts.`,
      prompt: `Analyze these social media posts and determine which Winx Club fairy this person is most like:\n\n${allPosts}`,
      maxTokens: 15,
      temperature: 0.4,
    })

    console.log(`Backend: OpenAI response for FID ${fid}: ${characterName}`)

    const normalizedCharacterName = characterName.trim().toLowerCase()
    const matchedCharacter = characters[normalizedCharacterName]

    if (!matchedCharacter) {
      console.error(
        `Backend: OpenAI returned an unknown character for FID ${fid}: '${characterName}'. Defaulting to Bloom.`,
      )
      return NextResponse.json({ character: characters.bloom })
    }

    console.log(`Backend: Matched character for FID ${fid}: ${matchedCharacter.name}`)
    return NextResponse.json({
      character: matchedCharacter,
    })
  } catch (error) {
    console.error("Backend: Error in analyze-user route:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to analyze user data",
      },
      { status: 500 },
    )
  }
}
