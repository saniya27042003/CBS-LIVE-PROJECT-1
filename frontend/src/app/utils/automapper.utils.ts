export class AutoMapperUtil {

  static getAutoMapPosition(serverColName: string, clientRows: any[]): string {
    if (!serverColName || !clientRows || clientRows.length === 0) return '';

    const cleanServer = this.normalize(serverColName);

    const matchIndex = clientRows.findIndex((clientRow) => {
      const cName = clientRow.name || clientRow.id || clientRow.COLUMN_NAME;
      if (!cName) return false;
      return this.normalize(cName) === cleanServer;
    });

    return matchIndex !== -1 ? (matchIndex + 1).toString() : '';
  }

  static matchTableNames(table1: string, table2: string): boolean {
    if (!table1 || !table2) return false;
    return this.normalize(table1) === this.normalize(table2);
  }

  public static normalize(str: string): string {
    return str.toLowerCase().replace(/[\s_\-]/g, '');
  }
}
