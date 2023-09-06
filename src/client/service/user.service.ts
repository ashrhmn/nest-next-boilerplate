import { apiConfig } from "@/shared/api-config";
import { MockData } from "@deepchain-labs/z-rest-client";
import service from ".";

const _mockAllUsers: MockData<typeof apiConfig.user.getAll> = {
  meta: {
    from: 1,
    to: 2,
    total: 1,
    currentPage: 1,
    lastPage: 1,
    nextPage: null,
    prevPage: null,
  },
  data: [
    { email: "mockUser@email.com", id: "1", password: "" },
    { email: "mockUser2@email.com", id: "2", password: "" },
  ],
};

const getAllUsers = service(apiConfig.user.getAll);

const getUserById = service(apiConfig.user.getById);

const createUser = service(apiConfig.user.create);

const deleteUser = service(apiConfig.user.delete);

const updateUser = service(apiConfig.user.update);

export const userService = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
