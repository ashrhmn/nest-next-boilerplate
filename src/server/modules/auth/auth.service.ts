import { User } from "@/server/modules/user/entities/user.entity";
import { UserService } from "@/server/modules/user/user.service";
import { HttpException, Injectable } from "@nestjs/common";
import { Response } from "express";
import { sign } from "jsonwebtoken";

const REFRESH_TOKEN_SECRET = "fpeqwifnpoqeinvpeijnv";
const ACCESS_TOKEN_SECRET = "iuehioqwubnvkrejvnlerjnv";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  private generateTokens(user: User) {
    const accessToken = sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = sign({ userId: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  }

  async login({ email, password }, res: Response) {
    // const user = await this.userService.getUserByEmail(email);
    const user = {} as any;
    if (!user) throw new HttpException("Invalid email or password", 400);

    if (user.password !== password)
      throw new HttpException("Invalid email or password", 400);
    const { accessToken, refreshToken } = this.generateTokens(user);
    res.cookie("refreshToken", refreshToken);
    res.cookie("accessToken", accessToken);

    return { accessToken, refreshToken };
  }
}
