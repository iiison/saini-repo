import { RateSchema } from "types";
import { ServiceResponse, buildInternalErrorServiceResponse, buildSuccessServiceResponse } from "../../common/models/serviceResponse";
import { CreateRateFormula } from "./rateModel";

export const RateService = {
  createFormula: async (
    data: RateSchema
  ): Promise<ServiceResponse<RateSchema | null>> => {
    try {
      const formula = await CreateRateFormula(data)
      
      return buildSuccessServiceResponse('Created formula', formula)
    } catch(error) {
      const errorMsg = `Error creating inventory: ${(error as Error).message}`

      return buildInternalErrorServiceResponse(errorMsg)
    }
  }
}
