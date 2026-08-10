import hades from "@/assets/game-hades.jpg";
import elden from "@/assets/game-elden.jpg";
import cocoon from "@/assets/game-cocoon.jpg";
import balatro from "@/assets/game-balatro.jpg";
import pacific from "@/assets/game-pacific.jpg";
import stellar from "@/assets/game-stellar.jpg";

export type Game = {
  id: string;
  title: string;
  studio: string;
  genre: string;
  tags: string[];
  platforms: string[];
  rating: number;
  reviews: string;
  released: string;
  hours: string;
  cover: string;
  blurb: string;
  long: string;
};

export const GAMES: Game[] = [
  {
    id: "hades-ii",
    title: "Hades II",
    studio: "Supergiant Games",
    genre: "Roguelike",
    tags: ["Roguelike", "Action", "Mythology"],
    platforms: ["PC", "Switch"],
    rating: 4.9,
    reviews: "18.4K",
    released: "May 2024",
    hours: "42h",
    cover: hades,
    blurb: "Every death teaches you something. Every run feels like a new story.",
    long:
      "A darker, wider underworld built on the loop you already love. Weapons re-learn themselves each run, the soundtrack refuses to leave your head, and the writing keeps pace with your losses.",
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    studio: "FromSoftware",
    genre: "Action RPG",
    tags: ["Action RPG", "Open World", "Souls-like"],
    platforms: ["PC", "PS5", "Xbox"],
    rating: 4.8,
    reviews: "42.1K",
    released: "Feb 2022",
    hours: "128h",
    cover: elden,
    blurb: "The Lands Between await. A world built entirely for the curious.",
    long:
      "Designed around discovery, experimentation, and the kind of moments you will want to talk about after the credits roll. There is no correct path — only the one you survive.",
  },
  {
    id: "cocoon",
    title: "Cocoon",
    studio: "Geometric Interactive",
    genre: "Puzzle",
    tags: ["Puzzle", "Atmospheric", "Sci-Fi"],
    platforms: ["PC", "Xbox", "Switch"],
    rating: 4.7,
    reviews: "9.8K",
    released: "Sep 2023",
    hours: "6h",
    cover: cocoon,
    blurb: "Worlds inside worlds. A puzzle box that never repeats itself.",
    long:
      "Carry entire worlds on your back and drop them inside one another. Perfectly paced, wordless, and quietly one of the most elegant puzzle designs in years.",
  },
  {
    id: "balatro",
    title: "Balatro",
    studio: "LocalThunk",
    genre: "Card Battler",
    tags: ["Card Battler", "Roguelike", "Deckbuilder"],
    platforms: ["Everywhere"],
    rating: 4.8,
    reviews: "22.7K",
    released: "Feb 2024",
    hours: "61h",
    cover: balatro,
    blurb: "Poker, but the rules bend until the numbers scream.",
    long:
      "A deckbuilder disguised as a card game. Jokers stack into absurd engines, and every failed run leaves you certain the next one is the one.",
  },
  {
    id: "pacific-drive",
    title: "Pacific Drive",
    studio: "Ironwood Studios",
    genre: "Survival",
    tags: ["Survival", "Driving", "Anomaly"],
    platforms: ["PC", "PS5"],
    rating: 4.4,
    reviews: "6.2K",
    released: "Feb 2024",
    hours: "24h",
    cover: pacific,
    blurb: "You, one station wagon, and a zone that keeps rewriting itself.",
    long:
      "Half road trip, half repair-bay ritual. Your car becomes a character with dents you remember and quirks you learn to live with.",
  },
  {
    id: "stellar-blade",
    title: "Stellar Blade",
    studio: "Shift Up",
    genre: "Action",
    tags: ["Action", "Sci-Fi", "Combat"],
    platforms: ["PS5"],
    rating: 4.5,
    reviews: "13.6K",
    released: "Apr 2024",
    hours: "33h",
    cover: stellar,
    blurb: "Parry-heavy combat with a ruined city as its stage.",
    long:
      "Precision combat that rewards patience over speed, wrapped in one of the sharpest art directions on the platform.",
  },
];

export const getGame = (id: string) => GAMES.find((g) => g.id === id);

export const GENRES = ["All", ...Array.from(new Set(GAMES.map((g) => g.genre)))];
export const PLATFORMS = ["All", "PC", "PS5", "Xbox", "Switch"];

export type ActivityItem = {
  id: string;
  user: string;
  initials: string;
  action: string;
  gameId: string;
  text: string;
  score?: number;
  time: string;
};

export const ACTIVITY: ActivityItem[] = [
  {
    id: "a1",
    user: "Maya Chen",
    initials: "MC",
    action: "rated",
    gameId: "hades-ii",
    text: "The soundtrack is unreal. Every escape feels like a tiny victory.",
    score: 5,
    time: "12 min ago",
  },
  {
    id: "a2",
    user: "Jordan Lee",
    initials: "JL",
    action: "finished",
    gameId: "cocoon",
    text: "A perfectly paced puzzle box. Quiet, strange, and impossible to put down.",
    score: 4.5,
    time: "2 hrs ago",
  },
  {
    id: "a3",
    user: "Sam Rivera",
    initials: "SR",
    action: "added to backlog",
    gameId: "pacific-drive",
    text: "The road trip survival game I did not know I needed.",
    time: "Yesterday",
  },
  {
    id: "a4",
    user: "Priya Nair",
    initials: "PN",
    action: "rated",
    gameId: "balatro",
    text: "I told myself one more run four hours ago.",
    score: 5,
    time: "Yesterday",
  },
  {
    id: "a5",
    user: "Diego Alvarez",
    initials: "DA",
    action: "reviewed",
    gameId: "elden-ring",
    text: "Still finding new caves 100 hours in. Nothing else does this.",
    score: 4.5,
    time: "2 days ago",
  },
];

export const TASTE_MAP = [
  { label: "Action RPG", value: 82 },
  { label: "Roguelike", value: 74 },
  { label: "Puzzle", value: 61 },
  { label: "Survival", value: 48 },
  { label: "Card Battler", value: 39 },
];

export const REVIEWS: Record<string, { user: string; initials: string; score: number; text: string; time: string }[]> = {
  "elden-ring": [
    { user: "Diego Alvarez", initials: "DA", score: 4.5, text: "Still finding new caves 100 hours in.", time: "2 days ago" },
    { user: "Maya Chen", initials: "MC", score: 5, text: "The first time you reach Altus, everything clicks.", time: "1 week ago" },
  ],
  "hades-ii": [
    { user: "Priya Nair", initials: "PN", score: 5, text: "Better than the first, which I did not think possible.", time: "3 days ago" },
  ],
};