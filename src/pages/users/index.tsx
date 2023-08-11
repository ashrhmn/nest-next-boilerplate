import usePageNumber from "@/client/hooks/usePageNumber";
import useUpdatePageQuery from "@/client/hooks/useUpdatePageQuery";
import { userService } from "@/client/service/user.service";
import { handleError } from "@/client/utils/error.utils";
import { promiseToast } from "@/client/utils/toast.utils";
import {
  ConfirmationModal,
  useConfirmationModalData,
} from "@ashrhmn/react-module";
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
          <UserCard key={user.id} user={user} refetchUsers={refetch} />
        ))}
      </div>
    </div>
  );
}

const UserCard = ({
  user,
  refetchUsers,
}: {
  user: Awaited<ReturnType<typeof userService.getAllUsers>>["data"][number];
  refetchUsers: () => void;
}) => {
  const handleDelete = () =>
    promiseToast(
      userService.deleteUser({ ...defaultServiceArgs, param: { id: user.id } }),
      { loading: "Deleting...", success: "Deleted" },
    )
      .then(() => refetchUsers())
      .catch(handleError);

  const deleteModalData = useConfirmationModalData({
    onConfirm: handleDelete,
    titleText: `Confirm delete ${user.name || user.email}?`,
    confirmButtonText: "Delete",
  });

  return (
    <div className="bg-gray-400/40 p-3 rounded m-2 w-80" key={user.id}>
      <ConfirmationModal
        modalConfig={deleteModalData}
        renderModal={({
          cancelButtonText,
          closeModal,
          confirmButtonText,
          handleConfirmClick,
          isInProgress,
          titleText,
        }) => (
          <div className="h-screen flex justify-center items-center w-full bg-gray-600/40">
            <div className="bg-gray-700 text-white p-4 text-2xl">
              <h1>{titleText}</h1>
              <div className="flex w-full justify-between gap-5 mt-10">
                <button
                  className="bg-blue-700 rounded p-1 w-40"
                  disabled={isInProgress}
                  onClick={closeModal}
                >
                  {cancelButtonText}
                </button>
                <button
                  className="bg-red-700 rounded p-1 w-40"
                  disabled={isInProgress}
                  onClick={handleConfirmClick}
                >
                  {confirmButtonText}
                </button>
              </div>
            </div>
          </div>
        )}
      />
      <p>ID : {user.id}</p>
      <p>Email : {user.email}</p>
      <p>Name : {user.name}</p>
      <a
        onClick={deleteModalData.showModal}
        className="bg-red-600 p-1 rounded text-white inline-block w-20 mx-4 text-center cursor-pointer"
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
  );
};
