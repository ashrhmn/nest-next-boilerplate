import { apiConfig } from "@/shared/api-config";
import service, { MockData } from ".";

const getAllUsers = service(apiConfig.user.getAll, {
  meta: {
    from: 1,
    to: 1,
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
});

const getUserById = service(apiConfig.user.getById, ({ param: { id } }) => ({
  email: `mockUserById-${id}@email.com`,
  id,
  password: "",
}));

export const userService = {
  getAllUsers,
  getUserById,
};

//=================================================

const _getAllUsersMockData: MockData<typeof apiConfig.user.getAll> = {
  data: [{ email: "", id: "", password: "" }],
  meta: {
    from: 1,
    to: 1,
    total: 1,
    currentPage: 1,
    lastPage: 1,
    nextPage: null,
    prevPage: null,
  },
};

const _getByIdMockData: MockData<typeof apiConfig.user.getById> = {
  email: "",
  id: "",
  password: "",
};

const _getByIdMockData2: MockData<typeof apiConfig.user.getById> = ({
  param: { id },
}) => {
  return {
    email: "",
    id: id,
    password: "",
  };
};
