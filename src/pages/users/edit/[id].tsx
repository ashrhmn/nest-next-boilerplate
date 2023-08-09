import { userService } from "@/client/service/user.service";
import { extractError, handleError } from "@/client/utils/error.utils";
import { promiseToast } from "@/client/utils/toast.utils";
import { apiConfig } from "@/shared/api-config";
import { defaultServiceArgs } from "@ashrhmn/z-rest-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import z from "zod";

const updateFormSchema = apiConfig.user.update.bodySchema;

type IForm = z.infer<typeof updateFormSchema>;

export default function EditUser() {
  const router = useRouter();

  const id = typeof router.query.id === "string" ? router.query.id : null;

  const { data, error, status } = useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      userService.getUserById({ ...defaultServiceArgs, param: { id: id! } }),
    enabled: !!id,
  });

  if (!id) return <h1>Page Not Found</h1>;
  if (status === "error") return <h1>{extractError(error)}</h1>;
  if (status === "loading") return <h1>Loading...</h1>;

  return <Form user={data} />;
}

const Form = ({
  user,
}: {
  user: Awaited<ReturnType<typeof userService.getUserById>>;
}) => {
  const router = useRouter();
  const handleUpdateUser = (data: IForm) => {
    promiseToast(
      userService.updateUser({
        ...defaultServiceArgs,
        param: { id: user.id },
        body: data,
      }),
      {
        loading: "Updating...",
        success: "Updated",
      },
    )
      .then(() => router.push("/users"))
      .catch(handleError);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: { ...user, name: user.name || undefined },
  });

  return (
    <div>
      <h1>Edit User</h1>
      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="flex flex-col gap-2 items-center"
      >
        <div className="flex gap-4">
          <label>Email : </label>
          <input
            className="border"
            type="text"
            {...register("email")}
            placeholder="email"
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div className="flex gap-4">
          <label>Name : </label>
          <input
            className="border"
            type="text"
            {...register("name")}
            placeholder="name"
          />
          {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
          )}
        </div>
        <div className="flex gap-4">
          <label>Password : </label>
          <input
            className="border"
            type="text"
            {...register("password")}
            placeholder="password"
          />
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
