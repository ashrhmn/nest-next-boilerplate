import dotenv from "dotenv";
dotenv.config();

import { NextModule } from "@/server/modules/next/next.module";
// import { CacheModule } from "@deepchain-labs/nest-cache-module";
import {
  CacheModule,
  ERC20Module,
  IERC20ModuleConfig,
  IEtherscanModuleConfig,
  ISwapModuleConfig,
  SwapModule,
} from "@deepchain-labs/nest-modules";

// import {
//   ERC20Module,
//   IERC20ModuleConfig,
// } from "@deepchain-labs/nest-erc20-module";

// import { SwapModule } from "@deepchain-labs/nest-swap-module";

import { AbcModule } from "@/server/modules/abc/abc.module";
import { Module } from "@nestjs/common";

const networkConfig: IERC20ModuleConfig["networkConfig"] &
  ISwapModuleConfig["networkConfig"] &
  IEtherscanModuleConfig["networkConfig"] = {
  5: {
    nativeTokenDecimals: 18,
    nativeTokenName: "GoerliETH",
    nativeTokenSymbol: "gETH",
    rpcUrl: process.env.GOERLI_RPC_URL || "",
    explorerBaseUrl: "https://api-goerli.etherscan.io/api",
    explorerApiKey: process.env.ETHERSCAN_API_KEY || "",
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
    rpcUrl: process.env.POLYGON_RPC_URL || "",
    explorerBaseUrl: "https://api.polygonscan.com/api",
    explorerApiKey: process.env.POLYGONSCAN_API_KEY || "",
    swapRouterContractAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    quoterContractAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
    nonfungiblePositionManagerContractAddress:
      "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    uniswapV3FactoryContractAddress:
      "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  },
};

// console.log({ networkConfig });

@Module({
  imports: [
    ERC20Module.register({
      exposeController: true,
      networkConfig,
      // REDIS_URL: "redis://localhost:6379",
      // global: true,
    }),
    SwapModule.register({
      exposeController: true,
      networkConfig,
      poolPositionFetchCacheTimeout: 10,
      // REDIS_URL: "redis://localhost:6379",
      // global: true,
    }),
    // AlpacaModule.register({
    //   exposeController: true,
    //   apiKeys: {},
    // }),
    // EtherscanModule.register({
    //   exposeController: false,
    //   networkConfig,
    //   // REDIS_URL: "redis://localhost:6370",
    // }),

    CacheModule.register({
      REDIS_URL: "redis://localhost:6379",
      global: true,
    }),
    AbcModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, "client"),
    // }),
    NextModule,
    // AuthModule,
    // PostgresDatabaseProviderModule,
  ],
})
export class AppModule {}
