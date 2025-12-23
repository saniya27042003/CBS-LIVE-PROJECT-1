// import { Token } from './yogesh.tokens';

// export const YOGESH_GLYPH_MAP: Record<string, Token> = {
//   // --------------------
//   // Independent vowels
//   // --------------------
//   // 'Æ': { type: 'VOWEL', value: 'E' },
//   'ˆ': { type: 'VOWEL', value: 'U' },
//     '†': { type: 'VOWEL', value: 'A' },


//   // --------------------
//   // Base consonants (FIXED – NOT HALANT)
//   // --------------------
//   'Û': { type: 'CONSONANT', value: 'K' },
//   // 'n': { type: 'CONSONANT', value: 'N' },
//   '¤': { type: 'CONSONANT', value: 'D' },
//   'Æ': { type: 'CONSONANT', value: 'H' },
//   'µ': { type: 'CONSONANT', value: 'Y' },
//   '¿': { type: 'CONSONANT', value: 'SH' },
//   '¾': { type: 'CONSONANT', value: 'V' },

//   // 🔥 THESE WERE WRONG BEFORE (HALANT → CONSONANT)
//   'Ã': { type: 'CONSONANT', value: 'SA' },
//   'Â': { type: 'CONSONANT', value: 'SHA' },
//   '“': { type: 'CONSONANT', value: 'CHA' },
//   'Ÿ': { type: 'CONSONANT', value: 'TA' },
//   '•': { type: 'CONSONANT', value: 'JA' },
//   '´': { type: 'CONSONANT', value: 'MA' },
//   '¯': { type: 'CONSONANT', value: 'PA' },
//   '²': { type: 'CONSONANT', value: 'BA' },
//   'Ý': { type: 'CONSONANT', value: 'GA' },
//   'š': { type: 'CONSONANT', value: 'TH' },
//   '£': { type: 'CONSONANT', value: 'THA' },
//   '¬': { type: 'CONSONANT', value: 'DHA' },
//   'Þ': { type: 'CONSONANT', value: 'NAA' },
//   '®': { type: 'CONSONANT', value: 'N' },
//   '»': { type: 'CONSONANT', value: 'LA' },
//     '¸': { type: 'CONSONANT', value: 'R' },
//         '›': { type: 'CONSONANT', value: 'DA' },




//   // --------------------
//   // True HALANT cases (VERY FEW)
//   // --------------------
//   '¹': { type: 'HALANT', value: 'RU' }, // repha helper
//   'ô': { type: 'HALANT', value: 'La' }, // conjunct helper

//   // --------------------
//   // Matras
//   // --------------------
//   'Ö': { type: 'MATRA', value: 'AA' },
//   'ß': { type: 'MATRA', value: 'II' },
//   '×': { type: 'MATRA', value: 'I' },
//   'ã': { type: 'MATRA', value: 'UU' },
//   'ê': { type: 'MATRA', value: 'E_MATRA' },
//   'î': { type: 'MATRA', value: 'AI' },
//   'é': { type: 'MATRA', value: 'RH' },
//   'ë': { type: 'MATRA', value: 'EN' },
//   'æ': { type: 'MATRA', value: 'uU' },
//   'Ï': { type: 'MATRA', value: 'Ra' },

//   // --------------------
//   // Diacritics
//   // --------------------
//   'Ó': { type: 'DIACRITIC', value: 'ANUSVARA' },
//   'ò': { type: 'DIACRITIC', value: 'CANDRA_E' },

//   // --------------------
//   // Conjuncts (FULL FORMS)
//   // --------------------
//   'õ': { type: 'CONJUNCT', value: 'KSSA' },
//   '¢': { type: 'CONJUNCT', value: 'TTA' },
//   // '†': { type: 'CONJUNCT', value: 'GYA' },
//   '÷': { type: 'CONJUNCT', value: 'TTHA' },
//   '¦': { type: 'CONJUNCT', value: 'DRA' },
//   '¡': { type: 'CONJUNCT', value: 'TRA' },

// };





// src/font-decoder/yogesh/yogesh.glyph-map.ts
import { Token } from './yogesh.tokens';

export const YOGESH_GLYPH_MAP: Record<string, Token> = {
  // ====================
  // Independent vowels
  // ====================
  'ˆ': { type: 'VOWEL', value: 'U' }, // उ
  '†': { type: 'VOWEL', value: 'A' }, // अ

  // ====================
  // Consonants (Yogesh glyphs are LIVE by default)
  // ====================
  'Û': { type: 'CONSONANT', value: 'K', dead: false },
  '¤': { type: 'CONSONANT', value: 'D', dead: false },
  '¸': { type: 'CONSONANT', value: 'R', dead: false },
  'š': { type: 'CONSONANT', value: 'TH', dead: false },
  'Ÿ': { type: 'CONSONANT', value: 'TA', dead: false },
  '›': { type: 'CONSONANT', value: 'DA', dead: false },
  'Æ': { type: 'CONSONANT', value: 'H', dead: false },
  'ô': { type: 'CONSONANT', value: 'La', dead: false }, // ळ helper
  '™': { type: 'CONSONANT', value: 'T', dead: false },
  '¹': { type: 'CONSONANT', value: 'RU', dead: false },



  'Ã': { type: 'CONSONANT', value: 'SA', dead: true },
  '¿': { type: 'CONSONANT', value: 'SH', dead: false },
  'Â': { type: 'CONSONANT', value: 'SHA', dead: false },
  '£': { type: 'CONSONANT', value: 'THA', dead: false },
  '¬': { type: 'CONSONANT', value: 'DHA', dead: false },
  'Þ': { type: 'CONSONANT', value: 'NAA', dead: false },
  '³': { type: 'CONSONANT', value: 'BHA', dead: false },
  '´': { type: 'CONSONANT', value: 'M', dead: false },
  'Ý': { type: 'CONSONANT', value: 'GA', dead: false },
  '¯': { type: 'CONSONANT', value: 'PA', dead: false },
  '²': { type: 'CONSONANT', value: 'BA', dead: false },
  '»': { type: 'CONSONANT', value: 'LA', dead: false },
  '®': { type: 'CONSONANT', value: 'N', dead: false },
  'µ': { type: 'CONSONANT', value: 'Y', dead: false },
  '¾': { type: 'CONSONANT', value: 'V', dead: false },
  '•': { type: 'CONSONANT', value: 'JA', dead: false },
  '“': { type: 'CONSONANT', value: 'CHA', dead: false },
  'Ü': { type: 'CONSONANT', value: 'KHA', dead: false },

  // ====================
  // Matras
  // ====================
  'Ö': { type: 'MATRA', value: 'AA' },
  '×': { type: 'MATRA', value: 'I' },
  'ß': { type: 'MATRA', value: 'II' },
  'ã': { type: 'MATRA', value: 'UU' },
  'æ': { type: 'MATRA', value: 'uU' },
  'ê': { type: 'MATRA', value: 'E_MATRA' },
  'î': { type: 'MATRA', value: 'AI' },
  'é': { type: 'MATRA', value: 'RH' },
  'ë': { type: 'MATRA', value: 'EN' },
  'Ï': { type: 'MATRA', value: 'Ra' },


  // ====================
  // Diacritics
  // ====================
  'Ó': { type: 'DIACRITIC', value: 'ANUSVARA' },
  'ò': { type: 'DIACRITIC', value: 'CANDRA_E' },

  // ====================
  // Conjuncts
  // ====================
  'õ': { type: 'CONJUNCT', value: 'KSSA' },
  '¢': { type: 'CONJUNCT', value: 'TTA' },
  '÷': { type: 'CONJUNCT', value: 'TTHA' },
  '¦': { type: 'CONJUNCT', value: 'DRA' },
  '¡': { type: 'CONJUNCT', value: 'TRA' },
  'Á': { type: 'CONJUNCT', value: 'SHRA' },

};

