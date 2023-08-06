import { All, Body, Controller } from "@nestjs/common";
import { AbcService } from "./abc.service";
import { ConvertPriceDto } from "./dto/convert-price.dto";

@Controller("abc")
export class AbcController {
  constructor(private readonly abcService: AbcService) {}

  @All("convert-price")
  convertPrice(@Body() dto: ConvertPriceDto) {
    return this.abcService.convertPrice(dto);
  }
}
