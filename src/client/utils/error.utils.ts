import { ZodUtils } from "@/client/utils/zod.utils";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";
import toast from "react-hot-toast";
import { z } from "zod";

const badRequestExceptionMessageSchema = z.object({
  response: z.object({ data: z.object({ message: z.string() }) }),
});

const errorSchema = z.object({ message: z.string() });

export const hasBadRequestExceptionMessage = (
  error: any,
): error is z.infer<typeof badRequestExceptionMessageSchema> => {
  return ZodUtils.followsSchema(error, badRequestExceptionMessageSchema);
};

export const hasErrorMessage = (
  error: any,
): error is z.infer<typeof errorSchema> => {
  return ZodUtils.followsSchema(error, errorSchema);
};

const mapError = (error: string): string => {
  error = error.replace("execution reverted: ", "");
  console.log("Parsed Error : ", error);
  if (
    error.includes("User denied transaction") ||
    error.includes("user rejected transaction")
  )
    return "You rejected the transaction";
  if (error === "Ownable: caller is not the owner")
    return "You are not authorized to perform this action";
  if (error === "Only admin or manager")
    return "You must be an admin or a manager to perform this action";
  if (error === "Only admin")
    return "You must be an admin to perform this action";
  if (error === "Only manager")
    return "You must be a manager to perform this action";
  return error;
};

export const extractError = (error: unknown) => {
  console.log("Raw Error : ", error);
  const parsedError = getParsedEthersError(error as any).context;
  if (hasBadRequestExceptionMessage(error))
    return mapError(error.response.data.message);
  else if (typeof parsedError === "string") return mapError(parsedError);
  else if (hasErrorMessage(error)) return mapError(error.message);
  else if (typeof error === "string") return mapError(error);
  else return "An unknown error occurred";
};

export const handleError = (error: unknown) => toast.error(extractError(error));
