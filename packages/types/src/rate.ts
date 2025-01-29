import { z } from 'zod'

export const zRateSchema = z.object({
  formula: z.string(),
  createdAt: z.date().default(() => new Date()),
  modifiedAt: z.date().default(() => new Date())
})

export type RateSchema = z.infer<typeof zRateSchema>
