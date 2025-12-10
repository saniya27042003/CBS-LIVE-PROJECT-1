/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { decodeMojibake } from "./decode-mojibake";

export function decodeObject(obj: any) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      result[key] = decodeMojibake(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
