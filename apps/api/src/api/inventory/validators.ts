import { ZodError } from 'zod'
import { StatusCodes } from 'http-status-codes'
import { NextFunction, Response } from 'express'
import { zInventoryItemSchema } from "types"

import { buildBadReqServiceResponse } from '../../common/models/serviceResponse'
import { CustomUpdateReq, PartialInventoryItem } from './types'
import { handleZodValidationErrors } from '../../common/utils/httpHandlers'

export const validateUpdateInventoryReq = (
  req: CustomUpdateReq,
  res: Response,
  next: NextFunction
) => {
  const { body } = req

  if (!body.id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(buildBadReqServiceResponse('Please pass inventory ID.'))
  }

  const partialInventorySchema = zInventoryItemSchema.partial()

  try {
    const parsedBody: PartialInventoryItem = partialInventorySchema.parse(body)

    req.parsedBody = parsedBody
    next()
  } catch(error) {
    handleZodValidationErrors(error as ZodError, res)
  }
}
