import { CoingeckoService } from "@ashrhmn/nest-modules";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConvertPriceDto } from "./dto/convert-price.dto";

@Injectable()
export class AbcService {
  constructor(private readonly coingeckoService: CoingeckoService) {}

  async convertPrice({
    fromAmount,
    fromCurrencySymbol,
    toCurrencySymbol,
  }: ConvertPriceDto) {
    const {
      [fromCurrencySymbol]: fromCurrencyPrice,
      [toCurrencySymbol]: toCurrencyPrice,
    } = await this.coingeckoService.getCoingeckoPrice([
      fromCurrencySymbol,
      toCurrencySymbol,
    ]);

    if (!fromCurrencyPrice?.usd)
      throw new BadRequestException(
        `Invalid from currency symbol: ${fromCurrencySymbol}`,
      );
    if (!toCurrencyPrice?.usd)
      throw new BadRequestException(
        `Invalid to currency symbol: ${toCurrencySymbol}`,
      );

    return `${fromAmount} ${fromCurrencySymbol} = ${
      (fromAmount * fromCurrencyPrice.usd) / toCurrencyPrice.usd
    } ${toCurrencySymbol}`;

    // return await this.coingeckoService.getCoingeckoPrice([
    //   fromCurrencySymbol,
    //   toCurrencySymbol,
    // ]);
  }
}
