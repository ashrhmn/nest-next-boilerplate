import { MyComp } from "@/client/components/MyComp";
import { userService } from "@/client/service/user.service";
import { apiConfig } from "@/shared/api-config";
import { defaultServiceArgs } from "@deepchain-labs/z-rest-client";
import { InferOutputs } from "@deepchain-labs/z-rest-common";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id =
    typeof context.params?.id === "string" ? context.params.id : "invalid_id";
  const data = await userService.getUserById(
    {
      ...defaultServiceArgs,
      param: { id },
    },
    { context },
  );
  return { props: { data } };
};

function SingleUserServerSide({
  data,
}: {
  data: InferOutputs<typeof apiConfig.user.getById>;
}) {
  return (
    <div>
      <h1>Single User</h1>
      <p>{data?.email}</p>
      <MyComp />
    </div>
  );
}

export default SingleUserServerSide;
