/* eslint-disable prefer-const */

// import { YOGESH_GLYPH_MAP } from './yogesh.glyph-map';
// import { Token } from './yogesh.tokens';
// import { reorderIndic } from './yogesh.reorder';
// import { clusterYogeshGlyphs } from './yogesh.cluster';
// import { repairYogeshStream } from './yogesh.stream-repair';


// const UNICODE_EMIT_MAP: Record<string, string> = {
//   // Independent vowels
//   U: 'उ',
//   A: 'अ',

//   // Base consonants (NO HALANT)
//   K: 'क',
//   N: 'न',
//   D: 'द',
//   H: 'ह',
//   Y: 'य',
//   SH: 'श',
//   V: 'व',
//   DA: 'ड',
//   GA: 'ग',
//   MA: 'म',
//   PA: 'प',
//   TA: 'त',
//   BA: 'ब',
//   LA: 'ल',
//   SA: 'स',
//   SHA: 'ष्',
//   CHA: 'च',
//   JA: 'ज',
//   RU: 'रु',
//   THA: 'थ',
//   DHA: 'ध',
//   NAA: 'ण',
//   NGA: 'ङ',
//   TH: 'ठ',
//   DH: 'ढ',
//   La: 'ळ',
//   R: 'र',

//   // Matras
//   AA: 'ा',
//   II: 'ी',
//   I: 'ि',
//   UU: 'ु',
//   E_MATRA: 'े',
//   AI: 'ै',
//   RH: 'ृ',
//   uU: 'ू',
//   EN: 'ें',
//   // Ra: 'र्',

//   // Diacritics
//   ANUSVARA: 'ं',
//   CANDRA_E: 'ॅ',

//   // Special
//   Ra: '्र',

//   // Conjuncts
//   KSSA: 'क्ष',
//   GYA: 'ज्ञ',
//   TTA: 'त्त',
//   TTHA: 'ट्ठ',
//   DRA: 'द्र',
//   TRA: 'त्र',
// };

// function tokenize(raw: string): Token[] {
//   const tokens: Token[] = [];
//   for (const ch of raw) {
//     const token = YOGESH_GLYPH_MAP[ch];
//     if (token) tokens.push(token);
//   }
//   return tokens;
// }

// function emitUnicode(tokens: Token[]): string {
//   let output = '';

//   // Tracks whether we are inside a consonant cluster
//   let canAcceptMatra = false;

//   for (const t of tokens) {
//     const u = UNICODE_EMIT_MAP[t.value];
//     if (!u) continue;

//     // Drop illegal standalone matras
//     if (t.type === 'MATRA' && !canAcceptMatra) {
//       continue;
//     }

//     output += u;

//     if (t.type === 'CONSONANT' || t.type === 'CONJUNCT') {
//       canAcceptMatra = true;
//     } else if (t.type === 'HALANT') {
//       // Still inside cluster → matra must be allowed
//       canAcceptMatra = true;
//     } else if (t.type === 'MATRA') {
//       // After matra, cluster is complete
//       canAcceptMatra = false;
//     } else {
//       canAcceptMatra = false;
//     }
//   }

//   return output;
// }



// export function decodeYogesh(raw: string): string {
//   // 🔥 STEP 0: Repair legacy stream (IndiaTyping-style)
//   const repaired = repairYogeshStream(raw);

//   // 🔥 STEP 1: Visual clustering
//   const clusters = clusterYogeshGlyphs(repaired);

//   let output = '';
//   for (const cluster of clusters) {
//     const tokens = tokenize(cluster);
//     const reordered = reorderIndic(tokens);
//     output += emitUnicode(reordered);
//   }

//   return output;
// }






// src/font-decoder/yogesh/yogesh.decoder.ts
// src/font-decoder/yogesh/yogesh.decoder.ts

// src/font-decoder/yogesh/yogesh.decoder.ts

import { YOGESH_GLYPH_MAP } from './yogesh.glyph-map';
import { Token } from './yogesh.tokens';
import { reorderIndic } from './yogesh.reorder';

const INDEPENDENT_VOWEL_MAP: Record<string, string> = {
  A: 'अ',
  U: 'उ',
};

const BASE_CONSONANT_MAP: Record<string, string> = {
  K: 'क', N: 'न', D: 'द', GA: 'ग', M: 'म',
  PA: 'प', BA: 'ब', LA: 'ल', R: 'र',
  Y: 'य', V: 'व',
  SA: 'स', SH: 'श', SHA: 'ष', CHA: 'च',
  JA: 'ज',
  THA: 'थ', DHA: 'ध', NAA: 'ण', BHA: 'भ',
  TH: 'ठ', DH: 'ढ',
  H: 'ह', La: 'ळ',
  DA: 'ड', TA: 'त', KHA: 'ख', T: 'ट',
  RU: 'रु',
};

const MATRA_MAP: Record<string, string> = {
  AA: 'ा',
  I: 'ि',
  II: 'ी',
  UU: 'ु',
  uU: 'ू',
  E_MATRA: 'े',
  AI: 'ै',
  O: 'ो',      // ✅ ADD THIS
  AU: 'ौ',
  RH: 'ृ',
  EN: 'ें',
 // Ra: '्र',
};

const DIACRITIC_MAP: Record<string, string> = {
  ANUSVARA: 'ं',
  CANDRA_E: 'ॅ',
};

const CONJUNCT_MAP: Record<string, string> = {
  KSSA: 'क्ष',
  TTA: 'त्त',
  TTHA: 'ट्ठ',
  DRA: 'द्र',
  TRA: 'त्र',
  SHRA: 'श्र',
};

// =========================
// 1️⃣ Tokenizer
// =========================
function tokenize(raw: string): Token[] {
  const out: Token[] = [];
  for (const ch of raw) {
    const t = YOGESH_GLYPH_MAP[ch];
    if (t) out.push(t);
  }
  return out;
}

// =========================
// 2️⃣ Composite vowels (ORTHOGRAPHY ONLY)
// =========================
function resolveCompositeVowels(tokens: Token[]): Token[] {
  let out: Token[] = [];
  let i = 0;

  while (i < tokens.length) {
    const t = tokens[i];
    const next = tokens[i + 1];

    // े + ा → ो
    if (
      t.type === 'MATRA' &&
      t.value === 'E_MATRA' &&
      next?.type === 'MATRA' &&
      next.value === 'AA'
    ) {
      out.push({ type: 'MATRA', value: 'O' });
      i += 2;
      continue;
    }

  


    // े + ै → ौ
    if (
      t.type === 'MATRA' &&
      t.value === 'E_MATRA' &&
      next?.type === 'MATRA' &&
      next.value === 'AI'
    ) {
      out.push({ type: 'MATRA', value: 'AU' });
      i += 2;
      continue;
    }

    // ै + (ु | ू) → ौ
    if (
      t.type === 'MATRA' &&
      t.value === 'AI' &&
      next?.type === 'MATRA' &&
      (next.value === 'uU' || next.value === 'UU')
    ) {
      out.push({ type: 'MATRA', value: 'AU' });
      i += 2;
      continue;
    }

    out.push(t);
    i++;
  }

  return out;
}





// =========================
// 3️⃣ Akshar-level matra anchoring
// =========================
function anchorMatras(tokens: Token[]): Token[] {
  const out: Token[] = [];

  for (const t of tokens) {
    // Never move pre-base short-i
    if (t.type === 'MATRA' && t.value === 'I') {
      out.push(t);
      continue;
    }

    if (t.type !== 'MATRA') {
      out.push(t);
      continue;
    }

    for (let i = out.length - 1; i >= 0; i--) {
      if (out[i].type === 'CONSONANT' || out[i].type === 'CONJUNCT') {
        out.splice(i + 1, 0, t);
        break;
      }
    }
  }

  return out;
}

// =========================
// 4️⃣ Resolve short-i conflicts
// =========================
function resolveIMatraConflicts(tokens: Token[]): Token[] {
  const out: Token[] = [];
  let hasI = false;

  for (const t of tokens) {
    if (t.type === 'CONSONANT' || t.type === 'CONJUNCT') {
      hasI = false;
      out.push(t);
      continue;
    }

    if (t.type === 'MATRA' && t.value === 'I') {
      hasI = true;
      out.push(t);
      continue;
    }

    if (t.type === 'MATRA' && t.value === 'AA' && hasI) {
      continue;
    }

    out.push(t);
  }

  return out;
}

// =========================
// 5️⃣ Drop illegal matras
// =========================
function normalizeVowels(tokens: Token[]): Token[] {
  const out: Token[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    const prev = out[out.length - 1];
    const next = tokens[i + 1];

    if (t.type === 'MATRA' && t.value === 'I') {
      out.push(t);
      continue;
    }

    if (t.type === 'MATRA' && prev?.type === 'VOWEL') continue;
    if (t.type === 'MATRA' && prev?.type === 'MATRA') continue;

    if (
      t.type === 'MATRA' &&
      t.value === 'AA' &&
      prev?.type === 'CONSONANT' &&
      prev.dead === false &&
      (!next || next.type !== 'MATRA')
    ) {
      continue;
    }

    out.push(t);
  }

  return out;
}

// =========================
// 6️⃣ Emit Unicode
// =========================
function emitUnicode(tokens: Token[]): string {
  let out = '';

  for (const t of tokens) {
    if (t.type === 'VOWEL') {
      out += INDEPENDENT_VOWEL_MAP[t.value] ?? '';
      continue;
    }

    if (t.type === 'CONJUNCT') {
      out += CONJUNCT_MAP[t.value] ?? '';
      continue;
    }

    if (t.type === 'MATRA' && t.value === 'I') {
      for (let j = out.length - 1; j >= 0; j--) {
        const ch = out[j];
        if ((ch >= 'क' && ch <= 'ह') || ch === 'ळ') {
          out = out.slice(0, j + 1) + MATRA_MAP.I + out.slice(j + 1);
          break;
        }
      }
      continue;
    }

    // Repha (Ra)
    if (t.type === 'MATRA' && t.value === 'Ra') {
      const match = out.match(/([क-हळ](्[क-हळ])*)$/u);
      if (match) {
        out =
          out.slice(0, out.length - match[0].length) +
          'र्' +
          match[0];
      }
      continue;
    }

    // if (t.type === 'CONSONANT') {
    //   out += BASE_CONSONANT_MAP[t.value] ?? '';
    //   continue;
    // }

    if (t.type === 'CONSONANT') {
  const base = BASE_CONSONANT_MAP[t.value] ?? '';
  out += base;
  if (t.dead) {
    out += '्'; // 🔥 HALANT
  }
  continue;
}



    if (t.type === 'MATRA') {
      out += MATRA_MAP[t.value] ?? '';
      continue;
    }

    if (t.type === 'DIACRITIC') {
      out += DIACRITIC_MAP[t.value] ?? '';
    }
  }

  return out;
}

// =========================
// 7️⃣ FINAL Marathi morphology fix
// =========================
// उदळो → उदाळे
// लगारो → लगारे
// function normalizeFinalO(word: string): string {
//   return word.replace(/([क-हळ])ो$/u, '$1े');
// }

// =========================
// 8️⃣ Public API
// =========================
export function decodeYogesh(raw: string): string {
  const tokens = tokenize(raw);

  const reordered = reorderIndic(tokens);
  const composite = resolveCompositeVowels(reordered);
  const anchored = anchorMatras(composite);
  const iCleaned = resolveIMatraConflicts(anchored);
  const normalized = normalizeVowels(iCleaned);

  const unicode = emitUnicode(normalized);

  // Apply Marathi-only final normalization
   return unicode;
  //   .split(/\s+/)
  //   .map(normalizeFinalO)
  //   .join(' ');
}


