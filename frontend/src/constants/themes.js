export const THEMES = {
  pink: { name: "Pink", primary: "#F2A6D1", secondary: "#FFF5B8", accent: "#A8E6E6" },
  blue: { name: "Blue", primary: "#A8D8EA", secondary: "#FFF7B2", accent: "#C7CEEA" },
  green: { name: "Green", primary: "#9AD7C0", secondary: "#FFF6B7", accent: "#F6A6C1" },
  purple: { name: "Purple", primary: "#C9B6E4", secondary: "#F7D6E0", accent: "#A8E6E6" },
  red: { name: "Red", primary: "#E88989", secondary: "#FFF2A6", accent: "#F2A6D1" },
  yellow: { name: "Yellow", primary: "#FFE38F", secondary: "#F7A8C8", accent: "#A8E6E6" },
  cream: { name: "Cream", primary: "#F4E8D1", secondary: "#E7B5A0", accent: "#A8C7B5" },
};

export const SYMBOLS = ["★", "♥", "☻", "☁", "✦", "☾", "☀", "♠", "♡", "🐾"];

export const DECORATIONS = ["none", "minimal", "playful", "extra"];

export const PHOTO_FRAMES = ["square", "rounded", "circle", "polaroid", "sticker"];

export const SPECIES_OPTIONS = ["Human", "Cat", "Dog", "Alien", "Ghost", "Fairy", "Robot", "Monster", "Custom"];

export const PRONOUN_OPTIONS = ["She / Her", "He / Him", "They / Them", "Custom"];

export const FAVORITE_OPTIONS = ["Reading", "Music", "Sleep", "Matcha", "Cats", "Books", "Films", "Custom"];

export const DEFAULT_CARD = {
  given_name: "",
  nickname: "",
  age: "",
  pronouns: "",
  species: "",
  birthday: "",
  favorite_things: "",
  short_bio: "",
  image_url: "",
  theme: "pink",
  primary_color: THEMES.pink.primary,
  secondary_color: THEMES.pink.secondary,
  accent_color: THEMES.pink.accent,
  decoration: "minimal",
  personal_symbol: "★",
  photo_frame: "square",
};
