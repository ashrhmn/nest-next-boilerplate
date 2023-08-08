import { UserController } from "@/server/modules/user/user.controller";
import { UserService } from "@/server/modules/user/user.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
