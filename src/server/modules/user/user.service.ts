import { createAsyncService } from "@/server/factories";
import { apiConfig } from "@/shared/api-config";
import { Injectable, NotFoundException } from "@nestjs/common";

export type User = {
  id: string;
  email: string;
  password: string;
};

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: "weqinpoiwjpeiov",
      email: "ashik@deepchainlabs.com",
      password: "password",
    },
    {
      id: "wekfnpwiepewipe",
      email: "admin@deepchainlabs.com",
      password: "password",
    },
  ];

  async getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email) || null;
  }

  getAll = createAsyncService<typeof apiConfig.user.getAll>(async () => {
    return {
      data: this.users,
      meta: {
        currentPage: 1,
        from: 1,
        lastPage: 1,
        nextPage: null,
        prevPage: null,
        to: 1,
        total: 2,
      },
    };
  });

  getById = createAsyncService<typeof apiConfig.user.getById>(
    async ({ param: { id } }) => {
      const user = this.users.find((user) => user.id === id);
      if (!user) throw new NotFoundException("User not found");
      return user;
    },
  );
}
