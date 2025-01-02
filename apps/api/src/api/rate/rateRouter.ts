import { Router, Request, Response } from "express";
import { RateSchema, zRateSchema } from "types";
import { handleServiceResponse, validateRequestData } from "../../common/utils/httpHandlers";
import { RateService } from "./rateService";

export const rateRouter: Router = (() => {
  const router = Router()

  router.post(
    '/set-formula', 
    validateRequestData(zRateSchema.pick({ formula: true })),
    async (req: Request, res: Response) => {
      const { body } = req
      const data: RateSchema = {
        ...body,
        createdAt: new Date(),
        modifiedAt: new Date()
      }

      const formula = await RateService.createFormula(data)

      handleServiceResponse(formula, res)
    }
  )

  return router
})()
