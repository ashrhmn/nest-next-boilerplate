import { CoingeckoService } from "@ashrhmn/nest-modules";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AbcService {
  constructor(private readonly coingeckoService: CoingeckoService) {}

  async convertPrice({
    fromAmount,
    fromCurrencySymbol,
    toCurrencySymbol,
  }: any) {
    const {
      [fromCurrencySymbol]: fromCurrencyPrice,
      [toCurrencySymbol]: toCurrencyPrice,
    } = await this.coingeckoService.getCoingeckoPrice([
      fromCurrencySymbol,
      toCurrencySymbol,
    ]);

    if (!fromCurrencyPrice?.usd)
      return {
        status: 400,
        body: { message: `Invalid from currency symbol: ${toCurrencySymbol}` },
      };

    if (!toCurrencyPrice?.usd)
      return {
        status: 400,
        body: { message: `Invalid to currency symbol: ${toCurrencySymbol}` },
      };

    return {
      status: 200,
      body: {
        result: `${fromAmount} ${fromCurrencySymbol} = ${
          (fromAmount * fromCurrencyPrice.usd) / toCurrencyPrice.usd
        } ${toCurrencySymbol}`,
      },
    };
  }
}
