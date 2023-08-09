import usePageNumber from "@/client/hooks/usePageNumber";
import useUpdatePageQuery from "@/client/hooks/useUpdatePageQuery";
import { userService } from "@/client/service/user.service";
import { handleError } from "@/client/utils/error.utils";
import { promiseToast } from "@/client/utils/toast.utils";
import { defaultServiceArgs } from "@ashrhmn/z-rest-client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Users() {
  const updateQuery = useUpdatePageQuery();
  const { take, skip } = usePageNumber(15);
  const { data, refetch } = useQuery({
    queryKey: ["all-users", skip, take],
    queryFn: () =>
      userService.getAllUsers({ ...defaultServiceArgs, query: { skip, take } }),
  });

  const handleDelete = (id: string) => {
    promiseToast(
      userService.deleteUser({ ...defaultServiceArgs, param: { id } }),
      { loading: "Deleting...", success: "Deleted" },
    )
      .then(() => refetch())
      .catch(handleError);
  };

  const nextPage = data?.meta.nextPage?.toString();
  const prevPage = data?.meta.prevPage?.toString();

  return (
    <div>
      <h1>Users</h1>
      <Link
        className="bg-blue-600 p-1 rounded text-white inline-block w-20 mx-4 text-center"
        href="/users/create"
      >
        Create
      </Link>

      {!!prevPage && (
        <button
          className="bg-blue-600 p-1 rounded text-white inline-block w-20 mx-4 text-center"
          onClick={() => updateQuery("page", prevPage)}
        >
          Prev
        </button>
      )}

      {!!nextPage && (
        <button
          className="bg-blue-600 p-1 rounded text-white inline-block w-20 mx-4 text-center"
          onClick={() => updateQuery("page", nextPage)}
        >
          Next
        </button>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        {data?.data.map((user) => (
          <div className="bg-gray-400/40 p-3 rounded m-2 w-80" key={user.id}>
            <p>ID : {user.id}</p>
            <p>Email : {user.email}</p>
            <p>Name : {user.name}</p>
            <a
              onClick={() => handleDelete(user.id)}
              className="bg-red-600 p-1 rounded text-white inline-block w-20 mx-4 text-center"
            >
              Delete
            </a>
            <Link
              className="bg-green-600 p-1 rounded text-white inline-block w-20 mx-4 text-center"
              href={`/users/edit/${user.id}`}
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
