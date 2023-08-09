import { apiConfig } from "@/shared/api-config";
import { createAsyncService } from "@ashrhmn/z-rest";

import { User } from "@/server/modules/user/entities/user.entity";
import { createPaginationMetaFromFindManyOption } from "@ashrhmn/nest-modules";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getAll = createAsyncService<typeof apiConfig.user.getAll>(
    async ({ query: { skip, take } }) => {
      const [data, total] = await this.userRepository.findAndCount({
        skip,
        take,
      });
      const meta = createPaginationMetaFromFindManyOption(
        { skip, take },
        total,
      );
      return { data, meta };
    },
  );

  getById = createAsyncService<typeof apiConfig.user.getById>(
    async ({ param: { id } }) => {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException("User not found");
      return user;
    },
  );

  create = createAsyncService<typeof apiConfig.user.create>(
    async ({ body }) => {
      const user = await this.userRepository.save(
        this.userRepository.create(body),
      );
      return user;
    },
  );

  delete = createAsyncService<typeof apiConfig.user.delete>(
    async ({ param: { id } }) => {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException("User not found");
      await this.userRepository.delete({ id });
      return user;
    },
  );

  update = createAsyncService<typeof apiConfig.user.update>(
    async ({ param: { id }, body }) => {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException("User not found");
      await this.userRepository.update({ id }, body);
      return "success";
    },
  );
}
