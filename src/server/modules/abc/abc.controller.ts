import { AbcService } from "@/server/modules/abc/abc.service";
import { NextService } from "@/server/modules/next/next.service";
import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";

import type { Request, Response } from "express";
import { parse } from "url";

@Controller("abc")
export class AbcController {
  constructor(
    private readonly abcService: AbcService,
    private readonly nextService: NextService,
  ) {}

  @Post("convert-price")
  convertPrice(@Body() body: any) {
    return this.abcService.convertPrice(body);
  }

  @Get("render")
  async render(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    return await this.nextService
      .getServer()
      ?.render(req, res, "/", parsedUrl.query, parsedUrl);
  }

  @Get("render-smth")
  async renderSmth(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    const html = await this.nextService
      .getServer()
      ?.renderToHTML(req, res, "/", parsedUrl.query);
    return res
      .header({
        "Content-Type": "text/html",
      })
      .send(html);
  }
}
