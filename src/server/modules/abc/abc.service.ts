import { CacheService } from "@deepchain-labs/nest-modules";

import { Injectable } from "@nestjs/common";

@Injectable()
export class AbcService {
  constructor(
    private readonly cacheService: CacheService,
  ) // private readonly erc20Service: ERC20Service,
  {}
}
