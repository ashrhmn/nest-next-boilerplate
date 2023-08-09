import { User } from "@/server/modules/user/entities/user.entity";
import { UserController } from "@/server/modules/user/user.controller";
import { UserService } from "@/server/modules/user/user.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
