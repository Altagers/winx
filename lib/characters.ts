// Personality analysis for Winx Club characters
export interface WinxCharacter {
  name: string
  emoji: string
  color: string
  trait: string
  description: string
  power: string
}

export const characters: Record<string, WinxCharacter> = {
  bloom: {
    name: "Bloom",
    emoji: "🔥",
    color: "orange",
    trait: "Leader & Brave",
    power: "Dragon Flame",
    description:
      "You're a natural leader with a fiery heart! Your posts show strength, determination, and readiness to protect your friends!",
  },
  stella: {
    name: "Stella",
    emoji: "☀️",
    color: "yellow",
    trait: "Fashionista & Optimist",
    power: "Sun & Moon",
    description:
      "You're bright and stylish! Your posts are full of positivity, beauty, and inspiration. You light up others' lives!",
  },
  flora: {
    name: "Flora",
    emoji: "🌸",
    color: "pink",
    trait: "Kind & Caring",
    power: "Nature",
    description: "You have a gentle heart and care for others! Your posts are full of love, support, and harmony!",
  },
  musa: {
    name: "Musa",
    emoji: "🎵",
    color: "red",
    trait: "Creative & Emotional",
    power: "Music",
    description: "You're a creative soul with deep emotions! Your posts reflect artistry and passion for the arts!",
  },
  tecna: {
    name: "Tecna",
    emoji: "💜",
    color: "purple",
    trait: "Smart & Logical",
    power: "Technology",
    description:
      "You're an analytical mind and tech genius! Your posts show logic, knowledge, and innovative thinking!",
  },
  aisha: {
    name: "Aisha",
    emoji: "🌊",
    color: "blue",
    trait: "Athletic & Independent",
    power: "Morphix",
    description: "You're strong and independent! Your posts show activity, sports, and a thirst for adventure!",
  },
}
