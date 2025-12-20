export function transliterateMarathiToEnglish(text: string): string {
  const consonantMap: Record<string, string> = {
    'क': 'k','ख': 'kh','ग': 'g','घ': 'gh',
    'च': 'ch','छ': 'chh','ज': 'j','झ': 'jh',
    'ट': 't','ठ': 'th','ड': 'd','ढ': 'dh',
    'त': 't','थ': 'th','द': 'd','ध': 'dh',
    'प': 'p','फ': 'ph','ब': 'b','भ': 'bh',
    'म': 'm','न': 'n','ण': 'n',
    'य': 'y','र': 'r','ल': 'l','व': 'v',
    'श': 'sh','ष': 'sh','स': 's',
    'ह': 'h','ळ': 'l','द्र': 'dra','त्र': 'tra','श्र': 'shra',
  };

  const independentVowels: Record<string, string> = {
    'अ': 'a','आ': 'aa',
    'इ': 'i','ई': 'i',
    'उ': 'u','ऊ': 'u',
    'ए': 'e','ऐ': 'ai',
    'ओ': 'o','औ': 'au',
  };

  const matraMap: Record<string, string> = {
    'ा': 'a',
    'ि': 'i',
    'ी': 'i',
    'ु': 'u',
    'ू': 'u',
    'े': 'e',
    'ै': 'ai',
    'ो': 'o',
    'ौ': 'au',
    'ृ': 'ru',
  };

  let out = '';

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    // Independent vowels
    if (independentVowels[ch]) {
      out += independentVowels[ch];
      continue;
    }

    // Consonants
    if (consonantMap[ch]) {
      const base = consonantMap[ch];

      // Halant
      if (next === '्') {
        out += base;
        i++;
        continue;
      }

      // Consonant + matra
      if (next && matraMap[next]) {
        out += base + matraMap[next];
        i++;
        continue;
      }

      // Inherent schwa
      out += base + 'a';
      continue;
    }

    // Anusvara
    if (ch === 'ं') {
      out += 'n';
      continue;
    }
  }

  // =========================
  // 🔥 SCHWA DELETION (FINAL)
  // =========================
  return out
    // remove trailing 'a'
    .replace(/a$/g, '')
    // remove 'a' before another vowel
    .replace(/a([aeiou])/g, '$1')
    // cleanup
    .toLowerCase();
}
