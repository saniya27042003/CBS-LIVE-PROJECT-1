// export type TokenType =
//   | 'VOWEL'
//   | 'CONSONANT'
//   | 'HALANT'
//   | 'MATRA'
//   | 'CONJUNCT'
//   | 'DIACRITIC'
//   | 'SPECIAL';  // Add this line

// export interface Token {
//   type: TokenType;
//   value: string;
// }

// src/font-decoder/yogesh/yogesh.tokens.ts

export type TokenType =
  | 'VOWEL'
  | 'CONSONANT'
  | 'MATRA'
  | 'HALANT'
  | 'CONJUNCT'
  | 'DIACRITIC';

export interface Token {
  type: TokenType;
  value: string;
  dead?: boolean; // only for CONSONANT
}


