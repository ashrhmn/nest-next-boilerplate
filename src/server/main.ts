import { AppModule } from "@/server/modules/app.module";
import { NextService } from "@/server/modules/next/next.service";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { parse } from "url";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  const nextService = app.get(NextService);
  await nextService.getServer().prepare();
  const nextHandler = nextService.getHandler();

  const baseApiUrl = (
    (process.env.NEXT_PUBLIC_BASE_URL || "") + "/api"
  ).replace("//api", "/api");

  app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (req.url.startsWith(baseApiUrl)) return next();
    else nextHandler(req, res, parse(req.url, true));
  });
  app.setGlobalPrefix(baseApiUrl);
  await app.listen(3000);
}
bootstrap();
