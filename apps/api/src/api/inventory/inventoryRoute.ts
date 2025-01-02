import express, { Request, Response, Router } from 'express';

import { inventoryService } from './inventoryService';
import { validateUpdateInventoryReq } from './validators';
import { CustomUpdateReq, PartialInventoryItem } from './types';
import {
  buildInternalErrorServiceResponse
} from '../../common/models/serviceResponse';
import { 
  validateRequestData,
  handleServiceResponse,
} from '../../common/utils/httpHandlers'
import { zInventoryItemBaseSchema } from 'types';

export const inventoryRouter: Router = (() => {
  const router = express.Router()

  // inventoryRegistry.registerPath({
  //   method: 'get',
  //   path: '/inventory',
  //   tags: ['Inventory'],
  //   responses: createApiResponse(z.unknown(), 'test')
  // })

  router.get('/find-all', async (_req: Request, res: Response) => {
    const inventory = await inventoryService.findAll()

    handleServiceResponse(inventory, res)
  })

  router.get('/:id', async (req: Request, res: Response) => {
    const { params: { id } } = req
    const inventory = await inventoryService.findById(id)

    handleServiceResponse(inventory, res)
  })

  router.post(
    '/update',
    validateUpdateInventoryReq,
    async (req: CustomUpdateReq, res: Response) => {
      const { parsedBody: body } = req

      if (!body) {
        handleServiceResponse(
          buildInternalErrorServiceResponse('Something is not right'),
          res
        )
        return
      }

      const { id, ...update }: PartialInventoryItem = body

      update.lastModified = new Date()

      // TODO: Must be a better way to define type
      // there should not be check for id here & above this for body.
      if (!id) {
        return
      }

      const updatedItem = await inventoryService.updateById(id, update)

      handleServiceResponse(updatedItem, res)
    }
  )

  router.post(
    '/add', 
    validateRequestData(zInventoryItemBaseSchema), 
    async (req: Request, res: Response, ) => {
      const { body } = req
      const item = await inventoryService.createInventory({...body})

      handleServiceResponse(item, res)
    }
  )

  return router
})()
