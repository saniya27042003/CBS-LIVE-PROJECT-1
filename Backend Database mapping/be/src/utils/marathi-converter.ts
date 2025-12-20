/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-control-regex */

// UNIVERSAL MARATHI LEGACY → UNICODE DECODER

// CLEAN MAP (NO DUPLICATE KEYS)
const legacyMap: Record<string, string> = {
  // Basic corrupted symbols
  '¡': 'ा',
  '¯': 'न',
  '´': 'र',
  '¸': 'ा',
  '¿': 'ि',
  '“': 'ं',
  '”': 'ः',
  'Ó': 'थ',
  'Ö': 'ो',
  'î': 'ा',
  'Ý': 'य',
  'ê': 'द',
  'ü': '्',
  'ã': 'अ',
  'ñ': 'ञ',
  'ª': 'ा',
  'á': 'ा',
  'À': 'ा',
  'Â': 'ा',
  'Ã': 'ा',
  'å': 'ा',
  'Æ': 'ा',
  'Ð': 'ढ',
  'š': 'श',
  'ß': 'ष',
  'Þ': 'ठ',
  'ò': 'ो',
  'ô': 'ौ',
  'õ': 'ौ',
  'Ø': 'ो',
  'Œ': 'क्ष',
  'Ï': 'र्',
  'ì': 'ी',
  'Ÿ': 'ळ',
  '™': '',
  '…': '…',

  // Combined sequences
  'ÃÖ': 'सु',
  'ã¸': 'रे',
  'êü': 'श',
  '¯Ö': 'ना',
  'Ï×': 'र्य',
  '×¾Ö': 'यान',
  '²Ö': 'गो',
  'ôû': 'विं',
  'Öê': 'राव',
  '•Ö': 'पा',
  '¬Ö': 'टी',

  // Additional possible mappings
  'à': 'ा',
  'â': 'ा',
  'ä': 'ा',
  'ç': 'क',
  'é': 'े',
  'ë': 'ै'
};

// ---------------- KEY SORTING ----------------
const orderedKeys = Object.keys(legacyMap).sort((a, b) => b.length - a.length);

function normalizeUnicode(s: string) {
  try {
    return s.normalize('NFC');
  } catch {
    return s;
  }
}

// ---------------- MATRA FIX FUNCTION ----------------
function fixMatraOrder(text: string): string {
  let out = text;

  // Fix "ि" before consonant → move after
  out = out.replace(/ि([क-ह])/g, '$1ि');

  // Clean halants
  out = out.replace(/्[ ]+/g, '्');

  // Remove unwanted control chars
  out = out.replace(/[\u0000-\u001F]/g, '');

  return out;
}

// ---------------- MAIN STRING DECODER ----------------
export function convertLegacyMarathi(input: any): any {
  if (!input || typeof input !== 'string') return input;

  let text = input;

  // Apply longest → shortest replacements
  for (const key of orderedKeys) {
    if (text.includes(key)) {
      text = text.split(key).join(legacyMap[key]);
    }
  }

  text = fixMatraOrder(text);
  text = normalizeUnicode(text);

  return text;
}

// ---------------- OBJECT DECODER ----------------
export function convertRowStrings(row: Record<string, any>) {
  if (!row || typeof row !== 'object') return row;

  for (const key of Object.keys(row)) {
    const val = row[key];

    if (typeof val === 'string') {
      row[key] = convertLegacyMarathi(val);
    } else if (Array.isArray(val)) {
      row[key] = val.map(v => (typeof v === 'string' ? convertLegacyMarathi(v) : v));
    } else if (val && typeof val === 'object') {
      row[key] = convertRowStrings(val);
    }
  }
  return row;
}

// ---------------- ARRAY DECODER ----------------
export function convertRows(rows: any[]) {
  return rows.map(r => convertRowStrings({ ...r }));
}

export default { convertLegacyMarathi, convertRows, convertRowStrings };
