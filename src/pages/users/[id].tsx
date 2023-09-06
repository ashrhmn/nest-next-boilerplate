import { MyComp } from "@/client/components/MyComp";
import { userService } from "@/client/service/user.service";
import { defaultServiceArgs } from "@deepchain-labs/z-rest-client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

function singleUser() {
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? router.query.id : "invalid_id";
  const { data } = useQuery({
    queryKey: [`users-${id}`],
    queryFn: () =>
      userService.getUserById({ ...defaultServiceArgs, param: { id } }),
  });

  return (
    <div>
      <h1>Single User</h1>
      <p>{data?.email}</p>
      <MyComp />
    </div>
  );
}

export default singleUser;
