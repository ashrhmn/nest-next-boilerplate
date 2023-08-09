import { UserFactory } from "@/server/database/factories/user.factory";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as argon from "argon2";
import { Seeder } from "nestjs-seeder";
import { Repository } from "typeorm";

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(UserFactory)
    private readonly repo: Repository<UserFactory>,
  ) {}

  async seed(): Promise<any> {
    const count = await this.repo.count();
    if (count !== 0) return;

    const users = await Promise.all(
      Array(500)
        .fill(0)
        .map(async (_, i) => ({
          name: `Admin${i + 1}`,
          email: `admin${i + 1}@admin.com`,
          password: await argon.hash("password"),
        })),
    );

    await this.repo.save(this.repo.create(users));
  }

  async drop(): Promise<any> {
    await this.repo.delete({});
  }
}
