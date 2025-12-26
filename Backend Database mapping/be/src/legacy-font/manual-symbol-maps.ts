export class ManualSymbolMapper {
  private static readonly SYMBOL_MAP: Record<string, string> = {
    '×': 'ि',    // legacy short-i
    'ø': 'िं',   // short-i + anusvara (REAL Unicode)
     'Ò': '्र',   // rakar / repha
  };

  private static applySymbolMap(text: string): string {
    let out = text;
    for (const [legacy, uni] of Object.entries(this.SYMBOL_MAP)) {
      out = out.split(legacy).join(uni);
    }
    return out;
  }

  private static normalizeShortI(text: string): string {
    return text.replace(
      /ि([क-ह](?:्[क-ह])*)/g,
      '$1ि'
    );
  }

  private static normalizeFinalRakar(text: string): string {
  return text.replace(/्र$/g, '्रअ');
}

  static normalize(text: string): string {
    let out = this.applySymbolMap(text);
    out = this.normalizeShortI(out);
    out = this.normalizeFinalRakar(out);
    return out.normalize('NFC');
  }
}