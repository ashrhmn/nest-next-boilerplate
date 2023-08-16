import { AbcService } from "@/server/modules/abc/abc.service";

import { Module } from "@nestjs/common";

@Module({
  providers: [AbcService],
  exports: [AbcService],
  imports: [],
})
export class AbcModule {}
