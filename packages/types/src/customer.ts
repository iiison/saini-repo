import { z } from "zod";

const isValidPhoneNumber = (n: string) => /^[0-9]{10}$/.test(n)

export const zCustomerSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  contact: z.string().min(10).max(10).refine((n) => isValidPhoneNumber(n)),
  orders: z.array(z.string()), // TODO: Make it more specific, can't be just str
  balance: z.number(),
  address: z.string().optional()
})

export type Customer = z.infer<typeof zCustomerSchema>
