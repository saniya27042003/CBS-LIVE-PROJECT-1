/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { DatabaseMappingService } from "../database-mapping/database-mapping.service";
import { ShreeLipiDecoder } from "../utils/shreelipi-decoder";

@Injectable()
export class DecodeService {
  constructor(private readonly dbMap: DatabaseMappingService) {}

  // Decode one string
  decodeOne(text: string) {
    return {
      input: text,
      output: ShreeLipiDecoder.decode(text),
    };
  }

  // ✅ NEW — decode many strings (fixes your error)
  decodeMany(texts: string[]) {
    return texts.map(t => ({
      input: t,
      output: ShreeLipiDecoder.decode(t),
    }));
  }

  // Decode full table columns
  async decodeTable(tableName: string, columns: string[]) {
    const client = this.dbMap["clientDB"];

    if (!client?.isInitialized) {
      throw new Error("Client DB not connected");
    }

    const rows = await client.query(`SELECT * FROM "${tableName}"`);

    const decoded = rows.map(row => {
      columns.forEach(col => {
        if (row[col])
          row[col] = ShreeLipiDecoder.decode(row[col]);
      });
      return row;
    });

    return decoded;
  }
}
