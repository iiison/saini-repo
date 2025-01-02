import { Router, Request, Response } from "express";
import { handleServiceResponse, validateRequestData } from "../../common/utils/httpHandlers";
import { customerService } from "./customerService";
import { zCustomerSchema } from "types";

export const customerRouter: Router = (() => {
  const router = Router()

  router.get('/name/:name', async (req: Request, res: Response) => {
    const { params: { name } } = req

    const customers = await customerService.findCustomer(name)

    handleServiceResponse(customers, res)
  })

  router.post(
    '/add', 
    validateRequestData(zCustomerSchema),
    async (req: Request, res: Response) => {
      const { body } = req
      // Send body to customer service
      // Send response to client
    }
  )

  return router
})()
