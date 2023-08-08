import { AbcModule } from "@/server/modules/abc/abc.module";
import { AuthModule } from "@/server/modules/auth/auth.module";
import { NextModule } from "@/server/modules/next/next.module";
import {
  AlpacaModule,
  CacheModule,
  ERC20Module,
  EtherscanModule,
  IERC20ModuleConfig,
  IEtherscanModuleConfig,
  ISwapModuleConfig,
  SwapModule,
} from "@ashrhmn/nest-modules";
import { Module } from "@nestjs/common";

export const networkConfig: IERC20ModuleConfig["networkConfig"] &
  ISwapModuleConfig["networkConfig"] &
  IEtherscanModuleConfig["networkConfig"] = {
  5: {
    nativeTokenDecimals: 18,
    nativeTokenName: "GoerliETH",
    nativeTokenSymbol: "gETH",
    rpcUrl: "https://goerli.infura.io/v3/3b85ec3ca06a42fca92058a126019eab",
    explorerBaseUrl: "https://api-goerli.etherscan.io/api",
    explorerApiKey: "6XRM59S622K5TJUCB5SMAQKSWFFJ4Q96G6",
    swapRouterContractAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    quoterContractAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
    nonfungiblePositionManagerContractAddress:
      "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    uniswapV3FactoryContractAddress:
      "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  },
  137: {
    nativeTokenDecimals: 18,
    nativeTokenName: "MATIC",
    nativeTokenSymbol: "MATIC",
    rpcUrl:
      "https://polygon-mainnet.infura.io/v3/3b85ec3ca06a42fca92058a126019eab",
    explorerBaseUrl: "https://api.polygonscan.com/api",
    explorerApiKey: "8TYY4WC6KDG9Y6HQDM4R6PBXS9S2SAKF1I",
    swapRouterContractAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    quoterContractAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
    nonfungiblePositionManagerContractAddress:
      "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    uniswapV3FactoryContractAddress:
      "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  },
};

@Module({
  imports: [
    ERC20Module.register({
      exposeController: false,
      networkConfig,
      // REDIS_URL: "redis://localhost:6370",
    }),
    SwapModule.register({
      exposeController: true,
      networkConfig,
      poolPositionFetchCacheTimeout: 10,
      // REDIS_URL: "redis://localhost:6370",
    }),
    AlpacaModule.register({
      exposeController: false,
      apiKeys: {
        ALPACA_KEY: "AKL580RLFB99T48D6FOH",
        ALPACA_SECRET: "jBGf3I4OIwct0HNbQWIJIrIRaEcjT7KfqMteoymX",
        ALPACA_PAPER_KEY: "",
        ALPACA_PAPER_SECRET: "",
      },
    }),
    EtherscanModule.register({
      exposeController: false,
      networkConfig,
      // REDIS_URL: "redis://localhost:6370",
    }),

    CacheModule.register({
      REDIS_URL: process.env.REDIS_URL,
      global: true,
    }),
    AbcModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, "client"),
    // }),
    NextModule,
    AuthModule,
  ],
})
export class AppModule {}
