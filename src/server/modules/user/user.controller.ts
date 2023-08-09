import { UserService } from "@/server/modules/user/user.service";
import { apiConfig } from "@/shared/api-config";
import type { IContext } from "@ashrhmn/z-rest";
import { Context, InferMethod, createAsyncController } from "@ashrhmn/z-rest";

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

  @InferMethod(apiConfig.user.create)
  create(@Context() ctx: IContext) {
    return createAsyncController(
      apiConfig.user.create,
      ctx,
      this.userService.create,
    );
  }

  @InferMethod(apiConfig.user.delete)
  delete(@Context() ctx: IContext) {
    return createAsyncController(
      apiConfig.user.delete,
      ctx,
      this.userService.delete,
    );
  }

  @InferMethod(apiConfig.user.update)
  update(@Context() ctx: IContext) {
    return createAsyncController(
      apiConfig.user.update,
      ctx,
      this.userService.update,
    );
  }
}
