import { ZodError, ZodSchema } from "zod";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import { 
  ServiceResponse,
  buildBadReqServiceResponse 
} from "../models/serviceResponse";
import { makeZodValidationErrorObj } from "./zodUtilities";

export const handleServiceResponse = (
  serviceResponse: ServiceResponse<any>,
  response: Response
) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse)
}

export const handleZodValidationErrors = (error: ZodError, res: Response) => {
  const errorMsg = makeZodValidationErrorObj(error)

  res
    .status(StatusCodes.BAD_REQUEST)
    .send(buildBadReqServiceResponse(errorMsg))
}

export const validateRequestData = (
  schema: ZodSchema
) => (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedBody = schema.parse(req.body)
    req.body = parsedBody

    next()
  } catch(error) {
    handleZodValidationErrors(error, res)
  }
}
