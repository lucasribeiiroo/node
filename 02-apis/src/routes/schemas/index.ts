import { z } from "zod";

export const postTransactionsSquema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(["credit", "debit"]),
});

export const getTransactionsSquema = z.object({
  id: z.string().uuid(),
});
