import { AbcController } from "@/server/modules/abc/abc.controller";
import { AbcService } from "@/server/modules/abc/abc.service";
import { CoingeckoModule } from "@ashrhmn/nest-modules";
import { Module } from "@nestjs/common";

@Module({
  providers: [AbcService],
  controllers: [AbcController],
  exports: [AbcService],
  imports: [
    CoingeckoModule.register({
      exposeController: false,
    }),
    // CacheModule.register({ REDIS_URL: "redis://localhost:6370" }),
  ],
})
export class AbcModule {}
