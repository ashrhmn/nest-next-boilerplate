import { AuthController } from "@/server/modules/auth/auth.controller";
import { AuthService } from "@/server/modules/auth/auth.service";
import { UserModule } from "@/server/modules/user/user.module";
import { Module } from "@nestjs/common";

@Module({
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
  imports: [UserModule],
})
export class AuthModule {}
