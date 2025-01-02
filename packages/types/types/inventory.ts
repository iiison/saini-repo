import { z } from 'zod'

export const zInventoryItemBaseSchema = z.object({
  metalType: z.enum(['gold', 'silver', 'copper']),
  weight: z.number(),
  unit: z.enum(['g']),
  itemName: z.string(),
  purity: z.number().min(0).max(100),
})

export const zInventoryItemSchema = zInventoryItemBaseSchema.merge(
  z.object({
  id: z.string().uuid(),
  lastModified: z.date().default(() => new Date()),
  createdAt: z.date().default(() => new Date())
 })
)

export type InventoryItem = z.infer<typeof zInventoryItemSchema>
export type InventoryItemBase = z.infer<typeof zInventoryItemBaseSchema>
