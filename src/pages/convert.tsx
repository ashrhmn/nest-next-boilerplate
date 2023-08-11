import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.any();

type IForm = z.infer<typeof formSchema>;
// const client = initQueryClient(abcContract, {
//   baseUrl: "/api/abc",
//   baseHeaders: {},
// });

export default function ConvertPrice() {
  const handlePost = async (_data: IForm) => {
    // const res = await client.convertPrice.mutation({ body: data });
    // console.log(res);
    // if (res.status === 200) {
    //   toast.success(res.body.result);
    // }
    // if (res.status === 400) {
    //   toast.error(res.body.message);
    // }
  };

  const { register, handleSubmit } = useForm<IForm>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(handlePost)}>
      <input
        type="text"
        {...register("fromCurrencySymbol")}
        placeholder="From Symbol"
      />
      <input
        type="text"
        {...register("toCurrencySymbol")}
        placeholder="To Symbol"
      />
      <input
        type="text"
        {...register("fromAmount")}
        placeholder="From Amount"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
