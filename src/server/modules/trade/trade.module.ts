import { StockTokenEntity } from "@/server/modules/trade/entities/StockToken.entity";
import { TradeSupportedTokenEntity } from "@/server/modules/trade/entities/TradeSupportedToken.entity";
import { ITradeModuleConfig } from "@deepchain-labs/nest-modules-config";
import { TradeModule as TradeModuleCore } from "@deepchain-labs/nest-trade-module";
import { DynamicModule, Module } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";

const networkConfig: ITradeModuleConfig["networkConfig"] = {
  5: {
    nativeTokenDecimals: 18,
    nativeTokenName: "GoerliETH",
    nativeTokenSymbol: "gETH",
    rpcUrl: process.env.GOERLI_RPC_URL || "",
    explorerBaseUrl: "https://api-goerli.etherscan.io/api",
    explorerApiKey: process.env.ETHERSCAN_API_KEY || "",
    alpacaEnv: "PAPER",
    signerPrivateKey: "",
    tradeContractAddress: "",
    commissionPercentage: 10,
    ignoreMarketClosed: true,
  },
  137: {
    nativeTokenDecimals: 18,
    nativeTokenName: "MATIC",
    nativeTokenSymbol: "MATIC",
    rpcUrl: process.env.POLYGON_RPC_URL || "abc",
    explorerBaseUrl: "https://api.polygonscan.com/api",
    explorerApiKey: process.env.POLYGONSCAN_API_KEY || "",
    alpacaEnv: "PAPER",
    signerPrivateKey: "",
    tradeContractAddress: "",
    commissionPercentage: 10,
    ignoreMarketClosed: true,
  },
};

@Module({
  imports: [
    TypeOrmModule.forFeature([StockTokenEntity, TradeSupportedTokenEntity]),
  ],
})
export class TradeModule {
  @InjectRepository(StockTokenEntity)
  private static readonly stockTokenRepo: Repository<StockTokenEntity>;
  @InjectRepository(TradeSupportedTokenEntity)
  private static readonly tradeSupportedTokenEntityRepo: Repository<TradeSupportedTokenEntity>;
  static forRoot(): DynamicModule {
    return {
      module: TradeModule,
      imports: [
        TradeModuleCore.register({
          alpacaConfig: {
            apiKeys: { ALPACA_PAPER_KEY: "", ALPACA_PAPER_SECRET: "" },
          },
          networkConfig,
          exposeController: true,
          global: true,
          getTradeSupportedToken: ({ address, chain_id }) =>
            this.tradeSupportedTokenEntityRepo.findOneOrFail({
              where: { address, chain_id },
            }),
          upsertStockToken: ({ entity, conflictPaths }) =>
            this.stockTokenRepo.upsert(entity, {
              conflictPaths,
            }),
        }),
      ],
    };
  }
}
