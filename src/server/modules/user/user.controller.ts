import { Context, InferMethod } from "@/server/decorators";
import { createAsyncController } from "@/server/factories";
import { UserService } from "@/server/modules/user/user.service";
import { apiConfig } from "@/shared/api-config";
import type { IContext } from "@/shared/interfaces";
import { Controller } from "@nestjs/common";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @InferMethod(apiConfig.user.getAll)
  getAll(@Context() ctx: IContext) {
    return createAsyncController(
      apiConfig.user.getAll,
      ctx,
      this.userService.getAll,
    );
  }

  @InferMethod(apiConfig.user.getById)
  getById(@Context() ctx: IContext) {
    return createAsyncController(
      apiConfig.user.getById,
      ctx,
      this.userService.getById,
    );
  }
}
