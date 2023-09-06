import dotenv from "dotenv";
dotenv.config();

import { NextModule } from "@/server/modules/next/next.module";

import { AbcModule } from "@/server/modules/abc/abc.module";
import { CodegenModule } from "@/server/modules/codegen.module";
import { StockTokenEntity } from "@/server/modules/trade/entities/StockToken.entity";
import { TradeSupportedTokenEntity } from "@/server/modules/trade/entities/TradeSupportedToken.entity";
import { TradeModule } from "@/server/modules/trade/trade.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    AbcModule,
    NextModule,
    CodegenModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./db.sqlite",
      entities: [StockTokenEntity, TradeSupportedTokenEntity],
      synchronize: true,
    }),
    TradeModule.forRoot(),
  ],
})
export class AppModule {}
