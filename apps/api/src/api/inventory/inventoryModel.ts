import { z } from 'zod'
import { model } from 'mongoose'
import zodSchema from '@zodyac/zod-mongoose'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { InventoryItem, zInventoryItemSchema } from 'types'

extendZodWithOpenApi(z)

export const inventorySchema = zodSchema(zInventoryItemSchema)
export const Inventory = model<InventoryItem>('inventory', inventorySchema)

export const getInventory = async (): Promise<InventoryItem[] | null> => {
  const result = await Inventory.find()

  return result
}

export const getInventoryById = async (id: InventoryItem['id']): Promise<InventoryItem[] | null> => {
  const result = await Inventory.find({ id })

  return result
}

export const updateInventory = async (
  id: InventoryItem['id'],
  update: Partial<InventoryItem>
): Promise<InventoryItem | null> => {
  const result = await Inventory.findOneAndUpdate(
    { id },
    { ...update },
    { new: true }
  )

  return result
}

export const createInventoryInDB = async (
  item: InventoryItem
): Promise<InventoryItem> => {
  const result = await Inventory.create(item)

  return result
}
