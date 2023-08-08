import { NextService } from "@/server/modules/next/next.service";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  providers: [NextService],
  exports: [NextService],
})
export class NextModule {}
