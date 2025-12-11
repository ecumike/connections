export interface Category {
  name: string;
  words: string[];
  difficulty: 'yellow' | 'green' | 'blue' | 'purple';
}

export interface Puzzle {
  id: number;
  categories: Category[];
}

export const puzzles: Puzzle[] = [
  {
    id: 1,
    categories: [
      { name: "KINDS OF BEANS", words: ["KIDNEY", "LIMA", "PINTO", "STRING"], difficulty: "yellow" },
      { name: "TV SHOWS WITH FOOD IN THE TITLE", words: ["BREAKING", "BONES", "FRIENDS", "SUITS"], difficulty: "green" },
      { name: "WORDS BEFORE 'HOUSE'", words: ["FULL", "OPEN", "POWER", "WHITE"], difficulty: "blue" },
      { name: "POKER TERMS", words: ["CALL", "CHECK", "FOLD", "RAISE"], difficulty: "purple" },
    ],
  },
  {
    id: 2,
    categories: [
      { name: "TYPES OF COFFEE", words: ["ESPRESSO", "LATTE", "MOCHA", "AMERICANO"], difficulty: "yellow" },
      { name: "CARD GAMES", words: ["BRIDGE", "POKER", "HEARTS", "SPADES"], difficulty: "green" },
      { name: "WORDS BEFORE 'BALL'", words: ["BASKET", "FOOT", "BASE", "SNOW"], difficulty: "blue" },
      { name: "PLANETS", words: ["MARS", "VENUS", "SATURN", "MERCURY"], difficulty: "purple" },
    ],
  },
  {
    id: 3,
    categories: [
      { name: "FRUITS", words: ["APPLE", "GRAPE", "MANGO", "PEACH"], difficulty: "yellow" },
      { name: "MUSIC GENRES", words: ["JAZZ", "ROCK", "BLUES", "SOUL"], difficulty: "green" },
      { name: "PRECIOUS STONES", words: ["RUBY", "PEARL", "JADE", "AMBER"], difficulty: "blue" },
      { name: "FAMOUS PAINTERS", words: ["MONET", "PICASSO", "DALI", "WARHOL"], difficulty: "purple" },
    ],
  },
];

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
