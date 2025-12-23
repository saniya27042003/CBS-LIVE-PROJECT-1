// import { Token } from './yogesh.tokens';

// /**
//  * Reorders Indic tokens into logical Unicode order.
//  *
//  * Goals:
//  * - Correctly attach dependent matras to consonant clusters
//  * - Handle pre-base matra (ि) properly
//  * - Never emit standalone matras or illegal sequences
//  *
//  * Unicode model followed:
//  *   (C (HALANT C)*) + MATRA*
//  *
//  * NOTE:
//  * - This is LOGICAL order (not visual)
//  * - Rendering engines handle visual placement
//  */
// export function reorderIndic(tokens: Token[]): Token[] {
//   const result: Token[] = [];
//   let i = 0;

//   while (i < tokens.length) {
//     const t = tokens[i];

//     /**
//      * -------------------------------
//      * CASE 1: Pre-base matra (short-i)
//      * -------------------------------
//      * Unicode: DEVANAGARI VOWEL SIGN I (U+093F)
//      *
//      * In legacy fonts it appears BEFORE the consonant,
//      * but in Unicode logical order it must come AFTER
//      * the entire consonant cluster.
//      */
//     if (t.type === 'MATRA' && t.value === 'I') {
//       const cluster: Token[] = [];
//       let j = i + 1;

//       // Must start with a consonant
//       if (j < tokens.length && tokens[j].type === 'CONSONANT') {
//         // Base consonant
//         cluster.push(tokens[j]);
//         j++;

//         // Collect conjuncts: HALANT + CONSONANT
//         while (
//           j + 1 < tokens.length &&
//           tokens[j].type === 'HALANT' &&
//           tokens[j + 1].type === 'CONSONANT'
//         ) {
//           cluster.push(tokens[j], tokens[j + 1]);
//           j += 2;
//         }

//         // Collect post-base matras (ा ु ू ी etc.)
//         const postMatras: Token[] = [];
//         while (j < tokens.length && tokens[j].type === 'MATRA') {
//           postMatras.push(tokens[j]);
//           j++;
//         }

//         /**
//          * Emit in LOGICAL Unicode order:
//          *   cluster + pre-base matra + post-base matras
//          *
//          * Renderer will place 'ि' visually before consonant.
//          */
//         result.push(...cluster, t, ...postMatras);
//         i = j;
//         continue;
//       }

//       // Fallback safety (should not normally happen)
//       result.push(t);
//       i++;
//       continue;
//     }

//     /**
//      * -------------------------------
//      * CASE 2: Normal flow
//      * -------------------------------
//      */
//     result.push(t);
//     i++;
//   }

//   return result;
// }
 



// src/font-decoder/yogesh/yogesh.reorder.ts
// src/font-decoder/yogesh/yogesh.reorder.ts

import { Token } from './yogesh.tokens';

/**
 * Handles pre-base short-i (ि)
 */
export function reorderIndic(tokens: Token[]): Token[] {
  const out: Token[] = [];
  let pendingI: Token | null = null;

  for (const t of tokens) {
    if (t.type === 'MATRA' && t.value === 'I') {
      pendingI = t;
      continue;
    }

    if (pendingI && (t.type === 'CONSONANT' || t.type === 'CONJUNCT')) {
      out.push(t, pendingI);
      pendingI = null;
      continue;
    }

    out.push(t);
  }

  return out;
}

