import { z } from "zod"
import { v4 as uuidV4 } from "uuid"

import { 
  getInventory,
  updateInventory,
  getInventoryById,
  createInventoryInDB,
} from "./inventoryModel"
import { 
  ServiceResponse,
  buildSuccessServiceResponse,
  buildNotFoundServiceResponse,
  buildInternalErrorServiceResponse,
} from "../../common/models/serviceResponse"

import { 
  zInventoryItemSchema,
  type InventoryItem,
  InventoryItemBase 
} from "types"

export const inventoryService = {
  findAll: async (): Promise<ServiceResponse<InventoryItem[] | null>> => {
    try {
      const inventoryData = await getInventory()

      if (!inventoryData) {
        return buildNotFoundServiceResponse('No Inventory Found')
      }

      const parsedData = z.array(zInventoryItemSchema).parse(inventoryData)
      console.log(parsedData)

      return buildSuccessServiceResponse('Found Inventory', inventoryData)
    } catch(error) {
      // TODO: Log internal Server error
      const errorMsg = `Error finding inventory: $${(error as Error).message}`

      return buildInternalErrorServiceResponse(errorMsg)
    }
  },

  findById: async (
    id: InventoryItem['id']
  ): Promise<ServiceResponse<InventoryItem[] | null>> => {
    try {
      const inventoryItem = await getInventoryById(id)

      if (!inventoryItem) {
        return buildNotFoundServiceResponse(`No Inventory With id: [${id}]`)
      }

      return buildSuccessServiceResponse('Found Inventory', inventoryItem)
    } catch(error) {
      const errorMsg = `Error finding inventory: $${(error as Error).message}`

      return buildInternalErrorServiceResponse(errorMsg)
    }
  },

  updateById: async (
    id: InventoryItem['id'],
    update: Partial<InventoryItem>
  ): Promise<ServiceResponse<InventoryItem | null>> => {
    try {
      const updateResult = await updateInventory(id, update)

      if (!updateResult) {
        return buildNotFoundServiceResponse(`No Inventory Item Found ID: [${id}]`)
      }

      return buildSuccessServiceResponse('Updated Inventory', updateResult)
    } catch (error) {
      const errorMsg = `Error while updating inventory: ${(error as Error).message}`
      return buildInternalErrorServiceResponse(errorMsg)
    }
  },

  createInventory: async (
    item: InventoryItemBase
  ): Promise<ServiceResponse<InventoryItem | null>> => {
    try {
      const invItem: InventoryItem = { 
        ...item,
        id: uuidV4(),
        createdAt: new Date(),
        lastModified: new Date()
      }

      const dbItem = await createInventoryInDB(invItem)

      return buildSuccessServiceResponse('Created new inventory item', dbItem)
    } catch (error) {
      const errorMsg = `Error creating inventory: ${(error as Error).message}`

      return buildInternalErrorServiceResponse(errorMsg)
    }
  }
}
