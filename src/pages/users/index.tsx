import { defaultServiceArgs } from "@/client/service";
import { userService } from "@/client/service/user.service";
import { useQuery } from "@tanstack/react-query";

export default function Users() {
  const { data } = useQuery({
    queryKey: ["all-users"],
    queryFn: () => userService.getAllUsers(defaultServiceArgs),
  });

  console.log(data);

  return (
    <div>
      <h1>Users</h1>
      {data?.data.map((user) => (
        <div key={user.id}>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
