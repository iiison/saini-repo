import { z } from "zod";

export const zInventoryItemBaseSchema = z.object({
  name: z.string(),
  rate: z.number(),
});

export const zInventoryItemSchema = zInventoryItemBaseSchema.merge(
  z.object({
    id: z.string().uuid(),
    lastModified: z.date().default(() => new Date()),
    createdAt: z.date().default(() => new Date()),
  }),
);

export type InventoryItem = z.infer<typeof zInventoryItemSchema>;
export type InventoryItemBase = z.infer<typeof zInventoryItemBaseSchema>;
