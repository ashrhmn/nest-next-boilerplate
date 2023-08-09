import { Injectable } from "@nestjs/common";
import next from "next";
import { NextServer } from "next/dist/server/next";

@Injectable()
export class NextService {
  private readonly nextServer: NextServer;

  constructor() {
    this.nextServer = next({
      dev: process.env.NODE_ENV === "development",
      customServer: true,
    });
  }

  getServer() {
    return this.nextServer;
  }

  getHandler() {
    return this.nextServer.getRequestHandler();
  }
}
