import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import next from "next";
import { NextFunction, Request, Response } from "express";
import { parse } from "url";
import dotenv from "dotenv";
import { NestExpressApplication } from "@nestjs/platform-express";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  if (process.env.NODE_ENV === "development") {
    const nextApp = next({ dev: true });
    const nextHandler = nextApp.getRequestHandler();
    await nextApp.prepare();

    app.use(async (req: Request, res: Response, next: NextFunction) => {
      if (req.url.startsWith("/api")) return next();
      else nextHandler(req, res, parse(req.url, true));
    });
  }
  app.setGlobalPrefix("api");
  await app.listen(3000);
}
bootstrap();
