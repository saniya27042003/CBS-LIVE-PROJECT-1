/* eslint-disable @typescript-eslint/no-unsafe-return */
/* SAFE decoder — does NOT corrupt UTF-8 */

export function decodeMojibake(str: any): any {
  return str; // No decoding needed for MSSQL → NodeJS
}

export function decodeRow(row: any) {
  return row; // Return as-is
}

export function decodeRows(rows: any[]) {
  return rows; // Return as-is
}
