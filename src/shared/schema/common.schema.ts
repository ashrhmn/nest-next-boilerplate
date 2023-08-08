import z from "zod";

export const paginationMetaSchema = z.object({
  total: z.number(),
  currentPage: z.number().min(1),
  lastPage: z.number().min(1),
  prevPage: z.number().min(1).nullable(),
  nextPage: z.number().min(1).nullable(),
  from: z.number(),
  to: z.number(),
});
