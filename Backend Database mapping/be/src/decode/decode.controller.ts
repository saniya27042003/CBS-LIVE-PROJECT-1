/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { DecodeService } from "./decode.service";

@Controller("decode")
export class DecodeController {
  constructor(private readonly decodeService: DecodeService) {}

  @Post("one")
  decodeOne(@Body("text") text: string) {
    return this.decodeService.decodeOne(text);
  }

  @Post("many")
  decodeMany(@Body("texts") texts: string[]) {
    return this.decodeService.decodeMany(texts);  // ✅ now exists
  }

  @Post("table")
  decodeTable(@Body() body: any) {
    const { tableName, columns } = body;
    return this.decodeService.decodeTable(tableName, columns);
  }
}
