// Personality analysis for Winx Club characters
export interface WinxCharacter {
  name: string
  emoji: string
  color: string
  trait: string
  description: string
  power: string
  funPhrases: string[]
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
    funPhrases: [
      "Ready to ignite some magic! 🔥",
      "Leading the squad with dragon power! 🐉",
      "Burning bright like a true fairy! ✨",
      "Fire up the friendship! 🔥💫",
      "Dragon flame activated! 🐲",
      "Blazing through challenges like a boss! 🔥",
      "Sparking joy wherever I go! ⚡",
      "Hot takes and hotter magic! 🌋",
    ],
  },
  stella: {
    name: "Stella",
    emoji: "☀️",
    color: "yellow",
    trait: "Fashionista & Optimist",
    power: "Sun & Moon",
    description:
      "You're bright and stylish! Your posts are full of positivity, beauty, and inspiration. You light up others' lives!",
    funPhrases: [
      "Shining brighter than my highlighter! ✨",
      "Sun's out, magic's out! ☀️",
      "Serving looks and lunar vibes! 🌙",
      "Glowing up with celestial energy! 🌟",
      "Fashion fairy reporting for duty! 👗",
      "Radiating main character energy! 💫",
      "Moonwalking through Monday! 🌙",
      "Solar-powered and fabulous! ☀️✨",
    ],
  },
  flora: {
    name: "Flora",
    emoji: "🌸",
    color: "pink",
    trait: "Kind & Caring",
    power: "Nature",
    description: "You have a gentle heart and care for others! Your posts are full of love, support, and harmony!",
    funPhrases: [
      "Blooming with good vibes! 🌸",
      "Spreading seeds of kindness! 🌱",
      "Nature's favorite child! 🌿",
      "Growing magic everywhere I go! 🌺",
      "Photosynthesizing positivity! 🌞",
      "Rooting for everyone! 🌳",
      "Petal power activated! 🌹",
      "Branching out with love! 🌿💚",
    ],
  },
  musa: {
    name: "Musa",
    emoji: "🎵",
    color: "red",
    trait: "Creative & Emotional",
    power: "Music",
    description: "You're a creative soul with deep emotions! Your posts reflect artistry and passion for the arts!",
    funPhrases: [
      "Dropping beats and magic spells! 🎶",
      "My life's a symphony! 🎼",
      "Vibing on a different frequency! 🎵",
      "Music is my love language! 💕",
      "Composing chaos into harmony! 🎹",
      "Dancing to my own soundtrack! 💃",
      "Turning feelings into melodies! 🎤",
      "Bass-ically magical! 🎸✨",
    ],
  },
  tecna: {
    name: "Tecna",
    emoji: "💜",
    color: "purple",
    trait: "Smart & Logical",
    power: "Technology",
    description:
      "You're an analytical mind and tech genius! Your posts show logic, knowledge, and innovative thinking!",
    funPhrases: [
      "Computing magic at light speed! 💻",
      "Error 404: Boring not found! 🤖",
      "Debugging reality one spell at a time! 🔧",
      "My brain runs on fairy code! 💜",
      "Upgrading the universe! ⚡",
      "Ctrl+Alt+Magic! ⌨️",
      "Processing... 100% fabulous! 📊",
      "Binary and brilliant! 01001000 ✨",
    ],
  },
  aisha: {
    name: "Aisha",
    emoji: "🌊",
    color: "blue",
    trait: "Athletic & Independent",
    power: "Morphix",
    description: "You're strong and independent! Your posts show activity, sports, and a thirst for adventure!",
    funPhrases: [
      "Making waves wherever I go! 🌊",
      "Fluid like water, fierce like a storm! ⛈️",
      "Morphing challenges into victories! 💪",
      "Riding the tide of adventure! 🏄‍♀️",
      "Ocean vibes, unstoppable energy! 🌊",
      "Flowing with the current of life! 💙",
      "Splash zone: activated! 💦",
      "Liquid courage in fairy form! 🌊✨",
    ],
  },
}

// Функция для получения случайной фразы
export function getRandomPhrase(character: WinxCharacter): string {
  const randomIndex = Math.floor(Math.random() * character.funPhrases.length)
  return character.funPhrases[randomIndex]
}
