// src/app/utils/auto-mapper.util.ts

export class AutoMapperUtil {
  /**
   * Tries to find a matching column in the client list for a given server column.
   * Returns the 1-based index (as a string) if found, or empty string if not.
   */
  static getAutoMapPosition(serverColName: string, clientRows: any[]): string {





    if (!serverColName || !clientRows || clientRows.length === 0) return '';

    const cleanServer = this.normalize(serverColName);


    if (cleanServer === 'id') {
  return '1'; // force _id mapping
}


    // 1. Try finding an Exact Match (Index retrieval)
    const matchIndex = clientRows.findIndex((clientRow) => {
      const cName = clientRow.name || clientRow.id || clientRow.COLUMN_NAME;
      if (!cName) return false;
      return this.normalize(cName) === cleanServer;
    });

    // Return 1-based index (e.g., "1", "5") to fill the input box
    return matchIndex !== -1 ? (matchIndex + 1).toString() : '';
  }

  /**
   * Normalizes strings for comparison:
   * - Lowercase
   * - Removes underscores, spaces, and hyphens
   * - Example: "First_Name" -> "firstname" matches "firstName"
   */
  private static normalize(str: string): string {
    return str.toLowerCase().replace(/[\s_\-]/g, '');
  }
}
