import { IsNotEmpty } from "class-validator";

export class ConvertPriceDto {
  @IsNotEmpty()
  fromCurrencySymbol!: string;
  @IsNotEmpty()
  toCurrencySymbol!: string;
  @IsNotEmpty()
  fromAmount!: number;
}
