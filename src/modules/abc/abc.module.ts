import { Module } from "@nestjs/common";
import { AbcService } from "./abc.service";
import { CoingeckoModule } from "@ashrhmn/nest-modules";
import { AbcController } from "./abc.controller";

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
