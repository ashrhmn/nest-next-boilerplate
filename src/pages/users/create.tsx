import { userService } from "@/client/service/user.service";
import { handleError } from "@/client/utils/error.utils";
import { promiseToast } from "@/client/utils/toast.utils";
import { apiConfig } from "@/shared/api-config";
import { defaultServiceArgs } from "@ashrhmn/z-rest-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = apiConfig.user.create.bodySchema;

type IForm = z.infer<typeof formSchema>;

export default function CreateUser() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: zodResolver(formSchema),
  });
  const handleCreateUser = (data: IForm) => {
    promiseToast(
      userService.createUser({ ...defaultServiceArgs, body: data }),
      { loading: "Creating...", success: "Created" },
    )
      .then(() => router.push("/users"))
      .catch(handleError);
  };

  return (
    <div>
      <h1>Create User</h1>
      <form
        onSubmit={handleSubmit(handleCreateUser)}
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
            <span className="text-red-600">
              {errors.email.message?.toString()}
            </span>
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
            <span className="text-red-600">
              {errors.name.message?.toString()}
            </span>
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
            <span className="text-red-600">
              {errors.password.message?.toString()}
            </span>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
