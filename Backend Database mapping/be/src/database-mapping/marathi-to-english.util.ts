// Simple English Transliteration for Marathi Unicode
// Option A – readable English words (no accents)

export function transliterate(input: string): string {
  if (!input) return "";

  let text = input;

  // ==============
  // 1. Basic Map
  // ==============
  const map: Record<string, string> = {
    "अ": "a", "आ": "aa", "इ": "i", "ई": "ee", "उ": "u", "ऊ": "oo",
    "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au",

    "ा": "a", "ि": "i", "ी": "ee", "ु": "u", "ू": "oo",
    "े": "e", "ै": "ai", "ो": "o", "ौ": "au",

    "क": "k", "ख": "kh", "ग": "g", "घ": "gh",
    "च": "ch", "छ": "chh", "ज": "j", "झ": "jh",
    "ट": "t", "ठ": "th", "ड": "d", "ढ": "dh",
    "ण": "n", "त": "t", "थ": "th", "द": "d", "ध": "dh",
    "न": "n", "प": "p", "फ": "ph", "ब": "b", "भ": "bh",
    "म": "m", "य": "y", "र": "r", "ल": "l",
    "व": "v", "श": "sh", "ष": "sh", "स": "s", "ह": "h",

    "ळ": "l", "क्ष": "ksh", "त्र": "tra", "ज्ञ": "gy",

    "ं": "n", "ः": "h", "ँ": "n",

    "्": "", // halant
  };

  // ==============
  // 2. Replace composite sequences first
  // ==============
  const composites: Record<string, string> = {
    "क्ष": "ksh",
    "ज्ञ": "gy",
    "त्र": "tra",
  };

  for (const c in composites) {
    text = text.replaceAll(c, composites[c]);
  }

  // ==============
  // 3. Replace each character
  // ==============
  let result = "";
  for (const char of text) {
    result += map[char] ?? char;
  }

  // Capitalize first letter (Optional)
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}
