import { AlpacaService } from "@deepchain-labs/nest-alpaca-module";
import { CacheService } from "@deepchain-labs/nest-cache-module";
import { CoingeckoService } from "@deepchain-labs/nest-coingecko-module";
import { ERC20Service } from "@deepchain-labs/nest-erc20-module";
import { EtherscanService } from "@deepchain-labs/nest-etherscan-module";
import { SwapService } from "@deepchain-labs/nest-swap-module";

import { Injectable } from "@nestjs/common";

@Injectable()
export class AbcService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly coingeckoService: CoingeckoService,
    private readonly erc20Service: ERC20Service,
    private readonly alpacaService: AlpacaService,
    private readonly etherscanService: EtherscanService,
    private readonly swapService: SwapService,
  ) {}
}
