import { seeder } from "nestjs-seeder";

import { dataSourceOptions } from "@/server/config";
import { UserFactory } from "@/server/database/factories/user.factory";
import { UserSeeder } from "@/server/database/seeders/user.seeder";
import { TypeOrmModule } from "@nestjs/typeorm";

seeder({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [__dirname + "/database/factories/*.factory.{ts,js}"],
    }),
    TypeOrmModule.forFeature([UserFactory]),
  ],
}).run([UserSeeder]);
