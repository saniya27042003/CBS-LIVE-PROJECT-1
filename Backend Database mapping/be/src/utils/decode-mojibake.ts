/* eslint-disable prettier/prettier */
export function decodeMojibake(str: string): string {
  if (!str) return str;
  try {
    return Buffer.from(str, "latin1").toString("utf8");
  } catch {
    return str;
  }
}
