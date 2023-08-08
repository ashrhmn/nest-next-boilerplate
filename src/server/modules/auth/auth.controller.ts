import { AuthService } from "@/server/modules/auth/auth.service";
import { Body, Controller, Post, Res } from "@nestjs/common";

import type { Response } from "express";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("auth/login")
  async login(@Body() { email, password }: any, @Res() res: Response) {
    try {
      const body = await this.authService.login({ email, password }, res);
      console.log({ body });
      res.json({ body, status: 200 });
      return { body, status: 200 };
    } catch (error) {
      // if (error instanceof HttpException)
      //   return { status: error.getStatus() as any, body: error.getResponse() };
      // throw error;
      return { status: 500, body: error };
    }
  }
}
