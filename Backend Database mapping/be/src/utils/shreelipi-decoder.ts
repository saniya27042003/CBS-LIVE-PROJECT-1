import { SHREELIPI_MAP } from "./shreelipi-map";

export class ShreeLipiDecoder {

  static decode(text: string): string {
    if (!text) return "";

    let output = text;

    for (const [sl, uni] of SHREELIPI_MAP) {
      const regex = new RegExp(sl, "g");
      output = output.replace(regex, uni);
    }

    return output;
  }

}
